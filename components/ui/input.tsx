import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      "flex h-12 w-full rounded-md border border-border bg-white px-4 text-sm text-ink",
      "placeholder:text-ink-300 transition-colors",
      "focus:border-ink focus:outline-none focus:ring-2 focus:ring-gold-400/40",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";
