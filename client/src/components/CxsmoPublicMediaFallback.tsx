import { useEffect } from "react";
import { cxsmoManagedMediaUrl, isCxsmoManagedMedia, preferCxsmoPublicMedia } from "@/lib/cxsmoMedia";

function bindImageFallback(image: HTMLImageElement) {
  const declaredSource = image.getAttribute("src");
  if (!declaredSource) return;

  if (isCxsmoManagedMedia(declaredSource)) {
    const publicSource = preferCxsmoPublicMedia(declaredSource);
    if (publicSource !== declaredSource) image.setAttribute("src", publicSource);
    return;
  }

  if (!declaredSource.startsWith("/images/") || image.dataset.cxsmoMediaBound === declaredSource) return;
  image.dataset.cxsmoMediaBound = declaredSource;
  const managedSource = cxsmoManagedMediaUrl(declaredSource);
  image.addEventListener("error", () => {
    if (image.getAttribute("src") === declaredSource) image.setAttribute("src", managedSource);
  }, { once: true });
}

export function CxsmoPublicMediaFallback() {
  useEffect(() => {
    const apply = (root: ParentNode) => root.querySelectorAll<HTMLImageElement>("img[src]").forEach(bindImageFallback);
    apply(document);
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.target instanceof HTMLImageElement) bindImageFallback(mutation.target);
        mutation.addedNodes.forEach((node) => { if (node instanceof Element) apply(node); });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["src"] });
    return () => observer.disconnect();
  }, []);
  return null;
}
