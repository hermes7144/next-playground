import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive align-middle",
  {
    variants: {
      variant: {
        default:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        "red-text":
          "border bg-background shadow-xs hover:bg-red-500/10 text-red-500",
        "yellow-text":
          "border bg-background shadow-xs hover:bg-yellow-500/10 text-yellow-500",
        "green-text":
          "border bg-background shadow-xs hover:bg-green-700/10 text-green-700",
        "blue-text":
          "border bg-background shadow-xs hover:bg-blue-700/10 text-blue-700",
        green:
          "border bg-green-700 text-white shadow-xs hover:bg-green-800",
        black:
          "border bg-black text-white shadow-xs hover:bg-gray-800", 
      },
      size: {
        default: "h-10 rounded-md px-6 has-[>svg]:px-4",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        md: "h-9 px-4 py-2 has-[>svg]:px-3",
        icon: "size-9",
      },
      fontWeight: {
        default: "font-bold",
        normal: "font-normal",
        semi: "font-semibold",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fontWeight: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  fontWeight,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, fontWeight, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
