import { cn } from "@/lib/utils";

export function CxsmoMark({ className, inverse = false, spin = false }: { className?: string; inverse?: boolean; spin?: boolean }) {
  return <span className={cn("cxsmo-mark", inverse && "cxsmo-mark--inverse", spin && "is-spinning", className)} aria-label="C✦SMO"><span className="cxsmo-mark__letter">C</span><i className="cxsmo-mark__star" aria-hidden="true" /><span className="cxsmo-mark__letter">SMO</span></span>;
}
