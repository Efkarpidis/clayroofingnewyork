import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Button: highlight-only hover (no motion)
 * - Color/ring transitions only (no transition-all)
 * - Stable 1px border (no layout shift)
 * - Transform locked to none (prevents rogue hover:scale/translate)
 * - NEW: width variant → width="full" to span the container (w-full)
 * - Works with <Button> and <Button asChild>
 */

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium " +
  "select-none border border-transparent " +                          // stable border width
  "transition-colors duration-200 ease-out " +                        // color-only transitions
  "disabled:pointer-events-none disabled:opacity-50 " +
  "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 " +
  "outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] " +
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"

const buttonVariants = cva(base, {
  variants: {
    variant: {
      default:
        "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 hover:ring-2 hover:ring-orange-500/25",
      destructive:
        "bg-destructive text-white shadow-xs hover:bg-destructive/90 hover:ring-2 hover:ring-red-500/25 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
      outline:
        "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground hover:ring-2 hover:ring-neutral-400/30 dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
      secondary:
        "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 hover:ring-2 hover:ring-neutral-500/25",
      ghost:
        "hover:bg-accent hover:text-accent-foreground hover:ring-2 hover:ring-neutral-400/30",
      link: "text-primary underline-offset-4 hover:underline border-transparent",
    },
    size: {
      default: "h-9 px-6 py-3 has-[>svg]:px-3",
      sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
      lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
      icon: "size-9",
    },
    // NEW: control width without custom className everywhere
    width: {
      auto: "",
      full: "w-full",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    width: "auto",
  },
})

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

function Button({
  className,
  variant,
  size,
  width,               // ← new prop
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      // Hard-stop any transform coming from parents/asChild elements.
      style={{ transform: "none" }}
      className={cn(
        buttonVariants({ variant, size, width }),
        // Guards (class-level) in case utilities sneak in
        "hover:translate-x-0 hover:translate-y-0 hover:scale-100 active:scale-100 text-white bg-[rgba(223,220,220,1)]",
        className
      )}
      {...props}
    />
  )
}

export { Button, buttonVariants }
