import { cn } from "@/lib/utils";

export function CxsmoMark({ className, inverse = false }: { className?: string; inverse?: boolean }) {
  return <span className={cn("cxsmo-mark", inverse && "cxsmo-mark--inverse", className)} aria-label="C✦SMO"><span>C</span><i aria-hidden="true">✦</i><span>SMO</span></span>;
}
