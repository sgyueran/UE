const deploymentBasePath = "/UE";
const canonicalHost = "https://sgyueran.github.io/UE";

export const deploymentConfig = {
  platform: "GitHub Pages",
  siteUrl: "https://sgyueran.github.io/UE/",
  canonicalHost,
  basePath: `${deploymentBasePath}/`,
  spaFallback: "GitHub Pages 404.html fallback",
  indexingEnabled: false,
  customDomain: null,
} as const;

export const safeMissingSeoFields = [
  "site title",
  "author public display name",
  "public professional title",
  "default Open Graph image",
  "public contact method",
  "public resume path",
  "final search indexing approval",
] as const;

function normalizeAppPath(path: string) {
  const pathname = path.split(/[?#]/, 1)[0] || "/";
  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const withoutTrailingSlash =
    withLeadingSlash.length > 1 && withLeadingSlash.endsWith("/") ? withLeadingSlash.slice(0, -1) : withLeadingSlash;

  return withoutTrailingSlash || "/";
}

export function stripDeploymentBasePath(pathname: string) {
  const normalizedPath = normalizeAppPath(pathname);

  if (normalizedPath === deploymentBasePath) {
    return "/";
  }

  if (normalizedPath.startsWith(`${deploymentBasePath}/`)) {
    return normalizedPath.slice(deploymentBasePath.length) || "/";
  }

  return normalizedPath;
}

export function toDeploymentPath(appPath: string) {
  const normalizedPath = stripDeploymentBasePath(appPath);

  if (normalizedPath === "/") {
    return deploymentConfig.basePath;
  }

  return `${deploymentBasePath}${normalizedPath}`;
}

export function toCanonicalUrl(appPath: string) {
  const normalizedPath = stripDeploymentBasePath(appPath);

  if (normalizedPath === "/") {
    return `${deploymentConfig.canonicalHost}/`;
  }

  return `${deploymentConfig.canonicalHost}${normalizedPath}`;
}

export function toPublicAssetPath(assetPath: string) {
  const normalizedAsset = assetPath.replace(/^\/+/, "");

  return `${deploymentConfig.basePath}${normalizedAsset}`;
}
