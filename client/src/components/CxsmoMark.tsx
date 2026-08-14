import { cn } from "@/lib/utils";

export function CxsmoMark({ className, inverse = false, spin = false }: { className?: string; inverse?: boolean; spin?: boolean }) {
  return <span className={cn("cxsmo-mark", inverse && "cxsmo-mark--inverse", spin && "is-spinning", className)} aria-label="C✦SMO"><span>C</span><i aria-hidden="true">✦</i><span>SMO</span></span>;
}
