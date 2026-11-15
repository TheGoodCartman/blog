import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  buildLftpScript,
  createManifest,
  diffManifests,
  formatManifest,
  openCommand,
  parentDirectory,
  parseManifest,
  quoteLftp,
} from "../scripts/site-manifest.mjs";

const sha256 = (value) => createHash("sha256").update(value).digest("hex");

test("formats a manifest sorted by path", () => {
  const manifest = new Map([
    ["./b.html", sha256("b")],
    ["./a.html", sha256("a")],
  ]);

  assert.equal(
    formatManifest(manifest),
    `${sha256("a")}  ./a.html\n${sha256("b")}  ./b.html\n`
  );
});

test("parses paths containing spaces and windows line endings", () => {
  const hash = sha256("content");
  const manifest = parseManifest(`${hash}  ./a b/index.html\r\n${hash}  ./index.html\r\n`);

  assert.equal(manifest.get("./a b/index.html"), hash);
  assert.equal(manifest.get("./index.html"), hash);
});

test("rejects invalid manifest lines", () => {
  assert.throws(() => parseManifest("not a checksum line"), /Invalid manifest line/);
});

test("computes parent directories", () => {
  assert.equal(parentDirectory("./index.html"), ".");
  assert.equal(parentDirectory("./2026/01/post/index.html"), "./2026/01/post");
});

test("uploads new files and creates only missing directories", () => {
  const local = new Map([
    ["./index.html", sha256("index")],
    ["./2026/01/post/index.html", sha256("post")],
  ]);
  const remote = new Map([
    ["./index.html", sha256("index")],
    ["./old/index.html", sha256("old")],
  ]);

  assert.deepEqual(diffManifests({ local, remote }), {
    uploads: ["./2026/01/post/index.html"],
    deletes: ["./old/index.html"],
    mkdirs: ["./2026/01/post"],
  });
});

test("uploads changed files without deleting them", () => {
  const local = new Map([["./index.html", sha256("new")]]);
  const remote = new Map([["./index.html", sha256("old")]]);

  assert.deepEqual(diffManifests({ local, remote }), {
    uploads: ["./index.html"],
    deletes: [],
    mkdirs: [],
  });
});

test("uploads every file when the remote manifest is empty", () => {
  const local = new Map([
    ["./a.html", sha256("a")],
    ["./nested/b.html", sha256("b")],
  ]);

  assert.deepEqual(diffManifests({ local, remote: new Map() }), {
    uploads: ["./a.html", "./nested/b.html"],
    deletes: [],
    mkdirs: ["./nested"],
  });
});

test("does not create the destination directory itself", () => {
  const local = new Map([["./index.html", sha256("index")]]);

  assert.deepEqual(diffManifests({ local, remote: new Map() }), {
    uploads: ["./index.html"],
    deletes: [],
    mkdirs: [],
  });
});

test("includes the FTP port when configured", () => {
  assert.equal(
    openCommand({ host: "ftp.example.com", user: "user", port: "2121" }),
    'open -u "user" --env-password -p "2121" "ftp.example.com"'
  );
  assert.equal(
    openCommand({ host: "ftp.example.com", user: "user" }),
    'open -u "user" --env-password "ftp.example.com"'
  );
});

test("builds an lftp script with only the required mkdir commands", () => {
  const script = buildLftpScript({
    siteDir: "/site",
    uploads: ["./2026/01/index.html"],
    deletes: ["./old/index.html"],
    mkdirs: ["./2026/01"],
    manifestPath: "/tmp/hashes.sha256",
    manifestName: "hashes.sha256",
    destination: ".",
    host: "ftp.example.com",
    user: "user",
    useTls: false,
  });

  assert.match(script, /^mkdir -p "\.\/2026\/01"$/m);
  assert.match(script, /^put "\/site\/2026\/01\/index\.html" -o "\.\/2026\/01\/index\.html"$/m);
  assert.match(script, /^rm -f "\.\/old\/index\.html"$/m);
  assert.match(script, /^put "\/tmp\/hashes\.sha256" -o "hashes\.sha256\.tmp"$/m);
  assert.equal(script.trim().split("\n").at(-1), 'mv "hashes.sha256.tmp" "hashes.sha256"');
  assert.equal(script.match(/^mkdir -p /gm)?.length, 1);
});

test("adds TLS settings when requested", () => {
  const script = buildLftpScript({
    siteDir: "/site",
    uploads: [],
    deletes: [],
    mkdirs: [],
    manifestPath: "/tmp/hashes.sha256",
    manifestName: "hashes.sha256",
    destination: ".",
    host: "ftp.example.com",
    user: "user",
    useTls: true,
  });

  assert.match(script, /^set ftp:ssl-force yes$/m);
  assert.match(script, /^set ftp:ssl-protect-data yes$/m);
  assert.match(script, /^set ssl:verify-certificate yes$/m);
});

test("escapes quotes and backslashes in lftp paths", () => {
  assert.equal(quoteLftp('a"b\\c'), '"a\\"b\\\\c"');
  assert.throws(() => quoteLftp("a\nb"), /Unsupported newline/);
});

test("creates a manifest without the manifest file itself", async () => {
  const root = await mkdtemp(join(tmpdir(), "site-manifest-"));
  try {
    await writeFile(join(root, "index.html"), "hello");
    await mkdir(join(root, "nested"));
    await writeFile(join(root, "nested", "page.html"), "world");
    await writeFile(join(root, "hashes.sha256"), "ignored");

    const manifest = await createManifest(root);

    assert.equal(manifest.get("./index.html"), sha256("hello"));
    assert.equal(manifest.get("./nested/page.html"), sha256("world"));
    assert.equal(manifest.has("./hashes.sha256"), false);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
