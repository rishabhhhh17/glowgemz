import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "btn-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-100",
  {
    variants: {
      variant: {
        primary:
          "bg-ink text-cream-100 hover:bg-ink-700 active:bg-black",
        secondary:
          "bg-cream-200 text-ink hover:bg-cream-300 active:bg-cream-400",
        ghost:
          "bg-transparent text-ink hover:bg-cream-200 active:bg-cream-300",
        outline:
          "border border-ink text-ink bg-transparent hover:bg-ink hover:text-cream-100",
        link:
          "min-h-0 px-0 underline-offset-4 hover:underline text-ink",
        gold:
          "bg-gold-400 text-ink hover:bg-gold-500 active:bg-gold-600",
        destructive:
          "bg-destructive text-cream-100 hover:bg-red-900",
      },
      size: {
        sm: "px-4 text-xs h-10",
        md: "px-6 text-sm h-11",
        lg: "px-8 text-base h-12",
        xl: "px-10 text-base h-14",
        icon: "h-11 w-11 p-0",
      },
      shape: {
        rounded: "rounded-full",
        sharp: "rounded-none",
        soft: "rounded-md",
      },
    },
    defaultVariants: { variant: "primary", size: "md", shape: "rounded" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, shape }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
