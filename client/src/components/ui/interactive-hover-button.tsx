import { ArrowRight } from "lucide-react";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InteractiveHoverButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { text?: string };

const InteractiveHoverButton = forwardRef<HTMLButtonElement, InteractiveHoverButtonProps>(({ text = "Explore", className, ...props }, ref) => (
  <button ref={ref} className={cn("kinform-hover-button", className)} {...props}>
    <span className="kinform-hover-button__primary">{text}</span>
    <span className="kinform-hover-button__reveal" aria-hidden="true">{text}<ArrowRight size={15} /></span>
    <i aria-hidden="true" />
  </button>
));

InteractiveHoverButton.displayName = "InteractiveHoverButton";
export { InteractiveHoverButton };

