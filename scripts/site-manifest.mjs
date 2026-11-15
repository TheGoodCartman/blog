import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { readdir } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const checksumPattern = /^([a-f0-9]{64})  (.+)$/;

export async function listFiles(root, current = root) {
  const entries = await readdir(current, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = join(current, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await listFiles(root, absolutePath)));
    } else if (entry.isFile()) {
      const relativePath = relative(root, absolutePath).split(sep).join("/");
      files.push(`./${relativePath}`);
    }
  }

  return files.sort();
}

export async function hashFile(path) {
  const hash = createHash("sha256");

  for await (const chunk of createReadStream(path)) {
    hash.update(chunk);
  }

  return hash.digest("hex");
}

export async function createManifest(root, { manifestName = "hashes.sha256" } = {}) {
  const files = await listFiles(root);
  const manifest = new Map();

  for (const path of files) {
    if (path === `./${manifestName}`) {
      continue;
    }

    if (/[\r\n]/.test(path)) {
      throw new Error(`Unsupported newline in file name: ${path}`);
    }

    manifest.set(path, await hashFile(join(root, path)));
  }

  return manifest;
}

export function formatManifest(manifest) {
  return [...manifest.entries()]
    .sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0))
    .map(([path, hash]) => `${hash}  ${path}`)
    .join("\n")
    .concat("\n");
}

export function parseManifest(text) {
  const manifest = new Map();

  for (const rawLine of text.split("\n")) {
    const line = rawLine.replace(/\r$/, "");

    if (line === "") {
      continue;
    }

    const match = checksumPattern.exec(line);

    if (match === null) {
      throw new Error(`Invalid manifest line: ${line}`);
    }

    manifest.set(match[2], match[1]);
  }

  return manifest;
}

export function parentDirectory(path) {
  const separatorIndex = path.lastIndexOf("/");

  return separatorIndex === -1 ? "." : path.slice(0, separatorIndex);
}

export function diffManifests({ local, remote }) {
  const remoteDirectories = new Set([...remote.keys()].map(parentDirectory));
  const uploads = [...local.entries()]
    .filter(([path, hash]) => remote.get(path) !== hash)
    .map(([path]) => path)
    .sort();
  const deletes = [...remote.keys()].filter((path) => !local.has(path)).sort();
  const mkdirs = [...new Set(uploads.map(parentDirectory))]
    .filter((directory) => directory !== "." && !remoteDirectories.has(directory))
    .sort();

  return { uploads, deletes, mkdirs };
}

export function quoteLftp(value) {
  if (/[\r\n]/.test(value)) {
    throw new Error(`Unsupported newline in value: ${value}`);
  }

  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

export function openCommand({ host, user, port }) {
  const portOption = port ? ` -p ${quoteLftp(port)}` : "";

  return `open -u ${quoteLftp(user)} --env-password${portOption} ${quoteLftp(host)}`;
}

export function tlsSettings(useTls) {
  return useTls
    ? [
        "set ftp:ssl-force yes",
        "set ftp:ssl-protect-data yes",
        "set ssl:verify-certificate yes",
      ]
    : [];
}

export function buildLftpScript({
  siteDir,
  uploads,
  deletes,
  mkdirs,
  manifestPath,
  manifestName,
  destination,
  host,
  user,
  port,
  useTls,
}) {
  const lines = [
    "set cmd:fail-exit yes",
    "set ftp:passive-mode yes",
    "set net:max-retries 3",
    "set net:timeout 30",
    ...tlsSettings(useTls),
    openCommand({ host, user, port }),
    `cd ${quoteLftp(destination)}`,
  ];

  for (const directory of mkdirs) {
    lines.push(`mkdir -p ${quoteLftp(directory)}`);
  }

  for (const path of uploads) {
    lines.push(`put ${quoteLftp(join(siteDir, path))} -o ${quoteLftp(path)}`);
  }

  for (const path of deletes) {
    lines.push(`rm -f ${quoteLftp(path)}`);
  }

  lines.push(`put ${quoteLftp(manifestPath)} -o ${quoteLftp(`${manifestName}.tmp`)}`);
  lines.push(`mv ${quoteLftp(`${manifestName}.tmp`)} ${quoteLftp(manifestName)}`);

  return `${lines.join("\n")}\n`;
}
