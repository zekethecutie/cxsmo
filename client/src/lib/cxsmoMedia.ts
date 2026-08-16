import { cxsmoPublicMediaBasenames } from "@/lib/cxsmoPublicMedia.generated";

const managedPrefix = "/manus-storage/";
const publicPrefix = "/images/";
const publicMediaBasenames = new Set<string>(cxsmoPublicMediaBasenames);
const usePublicMedia = import.meta.env.VITE_CXSMO_USE_MANAGED_MEDIA !== "true";

function mediaFilename(source: string) {
  return source.slice(managedPrefix.length).split("/").at(-1);
}

export function isCxsmoManagedMedia(source: string) {
  return source.startsWith(managedPrefix);
}

export function cxsmoPublicMediaUrl(source: string) {
  if (!isCxsmoManagedMedia(source)) return source;
  const filename = mediaFilename(source);
  return filename ? `${publicPrefix}${filename}` : source;
}

export function hasCxsmoPublicMedia(source: string) {
  const filename = isCxsmoManagedMedia(source) ? mediaFilename(source) : source.startsWith(publicPrefix) ? source.slice(publicPrefix.length).split("/").at(-1) : null;
  return Boolean(filename && publicMediaBasenames.has(filename));
}

export function cxsmoManagedMediaUrl(source: string) {
  if (isCxsmoManagedMedia(source)) return source;
  const filename = source.startsWith(publicPrefix) ? source.slice(publicPrefix.length).split("/").at(-1) : null;
  return filename ? `${managedPrefix}${filename}` : source;
}

/**
 * C✦SMO's committed public bundle mirrors managed basenames. Git and external
 * hosts use `/images` automatically; managed storage is only an explicit
 * fallback or an opt-in development override.
 */
export function preferCxsmoPublicMedia(source: string) {
  return usePublicMedia && hasCxsmoPublicMedia(source) ? cxsmoPublicMediaUrl(source) : source;
}
