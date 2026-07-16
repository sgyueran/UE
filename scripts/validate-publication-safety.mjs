/* global console, process */

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const publicDir = path.join(rootDir, "public");

const textExtensions = new Set([".css", ".html", ".js", ".json", ".svg", ".txt", ".webmanifest", ".xml"]);
const invalidPublicUrlPattern = /\b(?:href|src|poster|content)=["'][^"']*(?:example\.com|localhost|127\.0\.0\.1|file:\/\/|[A-Za-z]:\\)[^"']*["']/gi;
const secretPatterns = [
  { name: "private key", pattern: /-----BEGIN [A-Z ]*PRIVATE KEY-----/g },
  { name: "env access token", pattern: /\b(?:VITE_|REACT_APP_|PUBLIC_)?(?:ACCESS|SECRET|API)[_-]?TOKEN\s*[:=]/g },
  { name: "env api key", pattern: /\b(?:VITE_|REACT_APP_|PUBLIC_)?API[_-]?KEY\s*[:=]/g },
  { name: "password assignment", pattern: /\b(?:VITE_|REACT_APP_|PUBLIC_)?PASSWORD\s*[:=]/g },
];

function walkFiles(directory) {
  if (!existsSync(directory)) {
    return [];
  }

  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return walkFiles(absolutePath);
    }

    return [absolutePath];
  });
}

function readTextFiles(directory) {
  return walkFiles(directory)
    .filter((filePath) => textExtensions.has(path.extname(filePath)))
    .map((filePath) => ({
      filePath,
      relativePath: path.relative(rootDir, filePath).replaceAll("\\", "/"),
      text: readFileSync(filePath, "utf8"),
    }));
}

function countPattern(files, pattern) {
  return files.reduce((total, file) => total + Array.from(file.text.matchAll(pattern)).length, 0);
}

function collectPatternMatches(files, checks) {
  return checks.flatMap((check) => {
    const count = countPattern(files, check.pattern);

    return count > 0 ? [{ name: check.name, count }] : [];
  });
}

function fail(message, details = []) {
  console.error(`Publication safety validation failed: ${message}`);

  details.forEach((detail) => {
    console.error(`- ${detail}`);
  });

  process.exitCode = 1;
}

const distFiles = readTextFiles(distDir);
const publicFiles = readTextFiles(publicDir);
const scannedFiles = [...distFiles, ...publicFiles];
const distIndex = path.join(distDir, "index.html");
const dist404 = path.join(distDir, "404.html");
const distIndexText = existsSync(distIndex) ? readFileSync(distIndex, "utf8") : "";
const dist404Text = existsSync(dist404) ? readFileSync(dist404, "utf8") : "";
const publicRobotsText = existsSync(path.join(publicDir, "robots.txt"))
  ? readFileSync(path.join(publicDir, "robots.txt"), "utf8")
  : "";
const publicSitemapText = existsSync(path.join(publicDir, "sitemap.xml"))
  ? readFileSync(path.join(publicDir, "sitemap.xml"), "utf8")
  : "";
const distSizeBytes = existsSync(distDir) ? walkFiles(distDir).reduce((total, filePath) => total + statSync(filePath).size, 0) : 0;

const metrics = {
  scannedFiles: scannedFiles.length,
  distSizeBytes,
  publicTodoUserInput: countPattern(scannedFiles, /TODO\(USER_INPUT\)/g),
  invalidPublicUrls: countPattern(scannedFiles, invalidPublicUrlPattern),
  rootAssetsReferences: countPattern(scannedFiles, /(?:src|href)=["']\/assets\//g),
  githubPagesAssetReferences: countPattern(scannedFiles, /\/UE\/assets\//g),
  duplicateBasePathReferences: countPattern(scannedFiles, /\/UE\/UE\//g),
  privateContentLeaks: countPattern(distFiles, /TODO\(USER_INPUT\)|private code|NDA material|permission evidence/gi),
  secretsExposed: collectPatternMatches(scannedFiles, secretPatterns).reduce((total, match) => total + match.count, 0),
};

const failures = [];

if (!existsSync(distIndex)) {
  failures.push("dist/index.html is missing. Run npm run build before publication validation.");
}

if (!distIndexText.includes("/UE/assets/")) {
  failures.push("dist/index.html does not reference /UE/assets/.");
}

if (metrics.publicTodoUserInput > 0) {
  failures.push(`public TODO(USER_INPUT) count is ${metrics.publicTodoUserInput}.`);
}

if (metrics.invalidPublicUrls > 0) {
  failures.push(`invalid public URL count is ${metrics.invalidPublicUrls}.`);
}

if (metrics.rootAssetsReferences > 0) {
  failures.push(`root /assets/ reference count is ${metrics.rootAssetsReferences}.`);
}

if (metrics.duplicateBasePathReferences > 0) {
  failures.push(`duplicate /UE/UE/ reference count is ${metrics.duplicateBasePathReferences}.`);
}

if (metrics.privateContentLeaks > 0) {
  failures.push(`private or unverified content leak count is ${metrics.privateContentLeaks}.`);
}

if (metrics.secretsExposed > 0) {
  failures.push(`secret-like pattern count is ${metrics.secretsExposed}.`);
}

if (dist404Text.includes("/assets/")) {
  failures.push("dist/404.html contains a root /assets/ reference.");
}

if (!publicRobotsText.includes("Disallow: /")) {
  failures.push("public/robots.txt does not keep the current noindex-safe Disallow state.");
}

if (!publicSitemapText.includes("https://sgyueran.github.io/UE/")) {
  failures.push("public/sitemap.xml does not use the confirmed GitHub Pages canonical base.");
}

if (/https:\/\/sgyueran\.github\.io\/(projects|about)\b/.test(publicSitemapText)) {
  failures.push("public/sitemap.xml contains a root-path canonical URL without /UE/.");
}

if (failures.length > 0) {
  fail("release artifacts are not safe to publish.", failures);
} else {
  console.log("Publication safety validation passed.");
}

console.log(JSON.stringify(metrics, null, 2));
