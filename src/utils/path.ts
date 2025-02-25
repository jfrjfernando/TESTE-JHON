export function appendUrlPath(path: string) {
  return appendURL(import.meta.env.BASE_URL, path);
}

export function appendAssetsAPIPath(path: string) {
  const base = import.meta.env.VITE_ASSETS_API;

  if (!base) {
    console.error("Internal Error: Assets API not found.");
  }

  return appendURL(base, path);
}

/**
 * Main append function to URLs
 * 
 * @param base left part
 * @param append right part
 * @returns concatenated URL
 */
function appendURL(base: string, append: string) {
  if (!base || !append) return base || append;

  const separator = "/";
  const needsLeading =
    !append.startsWith(separator) && !base.endsWith(separator);
  const needsTrimming =
    base.endsWith(separator) && append.startsWith(separator);

  if (needsTrimming) {
    return base + append.slice(1);
  } else if (needsLeading) {
    return base + separator + append;
  } else {
    return base + append;
  }
}
