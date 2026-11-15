#!/usr/bin/env node
import { spawn } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  buildLftpScript,
  createManifest,
  diffManifests,
  formatManifest,
  openCommand,
  parseManifest,
  quoteLftp,
  tlsSettings,
} from "./site-manifest.mjs";

const siteDir = process.argv[2] ?? "docs";
const manifestName = process.env.FTP_MANIFEST ?? "hashes.sha256";
const destination = process.env.FTP_DESTINATION ?? ".";
const port = process.env.FTP_PORT;
const useTls = process.env.FTP_USE_TLS !== "false";
const allowMassDelete = process.env.ALLOW_MASS_DELETE === "true";

async function main() {
  const host = requiredEnv("FTP_HOST");
  const user = requiredEnv("FTP_USER");
  process.env.LFTP_PASSWORD = process.env.FTP_PASSWORD ?? "anonymous";

  const local = await createManifest(siteDir, { manifestName });
  const remoteText = await readRemoteManifest({ host, user, port });
  const remote = parseRemoteManifest(remoteText);
  const { uploads, deletes, mkdirs } = diffManifests({ local, remote });

  if (deletes.length > Math.max(50, local.size / 2) && !allowMassDelete) {
    throw new Error(
      `Refusing to delete ${deletes.length} files. Set ALLOW_MASS_DELETE=true to override.`
    );
  }

  const localManifestText = formatManifest(local);
  const tempDir = await mkdtemp(join(tmpdir(), "site-sync-"));

  try {
    const localManifestPath = join(tempDir, manifestName);
    await writeFile(localManifestPath, localManifestText);

    const script = buildLftpScript({
      siteDir,
      uploads,
      deletes,
      mkdirs,
      manifestPath: localManifestPath,
      manifestName,
      destination,
      host,
      user,
      port,
      useTls,
    });

    console.log(
      `local=${local.size} remote=${remote.size} upload=${uploads.length} delete=${deletes.length} mkdir=${mkdirs.length}`
    );

    if (uploads.length === 0 && deletes.length === 0 && localManifestText === remoteText) {
      console.log("Nothing to sync.");
      return;
    }

    await runLftp(script);
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}

function requiredEnv(name) {
  const value = process.env[name];

  if (value === undefined || value === "") {
    throw new Error(`${name} is required`);
  }

  return value;
}

function parseRemoteManifest(text) {
  try {
    return parseManifest(text);
  } catch (error) {
    console.warn(`Remote manifest is invalid (${error.message}); assuming a first sync.`);
    return new Map();
  }
}

async function readRemoteManifest({ host, user, port }) {
  if (process.env.REMOTE_MANIFEST_FILE) {
    return await readFile(process.env.REMOTE_MANIFEST_FILE, "utf8");
  }

  const tempDir = await mkdtemp(join(tmpdir(), "site-sync-"));
  const target = join(tempDir, "remote.sha256");
  const script = [
    "set cmd:fail-exit yes",
    "set ftp:passive-mode yes",
    "set net:max-retries 3",
    "set net:timeout 30",
    ...tlsSettings(useTls),
    openCommand({ host, user, port }),
    `cd ${quoteLftp(destination)}`,
    `get ${quoteLftp(manifestName)} -o ${quoteLftp(target)}`,
    "",
  ].join("\n");

  try {
    await runLftp(script);
    return await readFile(target, "utf8");
  } catch (error) {
    console.warn(`Remote manifest not available (${error.message}); assuming a first sync.`);
    return "";
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}

async function runLftp(script) {
  const tempDir = await mkdtemp(join(tmpdir(), "site-sync-"));
  const scriptPath = join(tempDir, "sync.lftp");
  await writeFile(scriptPath, script);

  try {
    await new Promise((resolve, reject) => {
      const child = spawn("lftp", ["-f", scriptPath], {
        stdio: "inherit",
        env: process.env,
      });

      child.on("error", (error) => {
        reject(new Error(`Could not start lftp: ${error.message}`));
      });
      child.on("exit", (code, signal) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`lftp exited with ${code ?? signal}`));
        }
      });
    });
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(`::error::${error.message}`);
  process.exitCode = 1;
});
