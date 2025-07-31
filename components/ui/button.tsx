import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        "primary-s": [
          "h-[40px] px-6 gap-[125px] flex-shrink-0",
          "bg-gradient-blue-primary text-primary-foreground shadow-blue-s rounded-s",
          "hover:opacity-90 hover:shadow-blue-m",
          "onclick:opacity-100 onclick:scale-95 onclick:shadow-none", // Updated for onclick state
          "disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none disabled:opacity-50",
        ],
        "primary-m": [
          "h-[52px] px-12 gap-2 flex-shrink-0",
          "bg-gradient-blue-primary text-primary-foreground shadow-blue-m rounded-s",
          "hover:opacity-90 hover:shadow-blue-m",
          "onclick:opacity-100 onclick:scale-95 onclick:shadow-none", // Updated for onclick state
          "disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none disabled:opacity-50",
        ],
        "primary-l-bottom": [
          "h-12 px-6 py-3 text-base",
          "bg-gradient-blue-primary text-white shadow-blue-m rounded-m",
          "hover:opacity-90 hover:shadow-blue-m",
          "onclick:opacity-100 onclick:scale-95 onclick:shadow-none", // Updated for onclick state
          "disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none disabled:opacity-50",
        ],
        "secondary-s": [
          "h-8 px-3 text-xs",
          "bg-secondary text-secondary-foreground border border-border rounded-s",
          "hover:bg-secondary/80 hover:border-gray-300",
          "onclick:bg-secondary/70 onclick:scale-95 onclick:shadow-none", // Updated for onclick state
          "disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200",
        ],
        "secondary-s-top": [
          "h-8 px-3 text-xs",
          "bg-white text-secondary-700 border border-secondary-300 rounded-s shadow-normal-s",
          "hover:bg-secondary-50 hover:border-secondary-500",
          "onclick:bg-secondary-100 onclick:scale-95 onclick:shadow-none", // Updated for onclick state
          "disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200",
        ],
        "secondary-m": [
          "h-10 px-4 py-2",
          "bg-secondary text-secondary-foreground border border-border rounded-s",
          "hover:bg-secondary/80 hover:border-gray-300",
          "onclick:bg-secondary/70 onclick:scale-95 onclick:shadow-none", // Updated for onclick state
          "disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200",
        ],
        "gray-m": [
          "h-10 px-4 py-2",
          "bg-gray-100 text-gray-700 border border-gray-200 rounded-s",
          "hover:bg-gray-200 hover:text-gray-800",
          "onclick:bg-gray-300 onclick:scale-95 onclick:shadow-none", // Updated for onclick state
          "disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-100",
        ],
        "red-m": [
          "h-10 px-4 py-2",
          "bg-destructive text-destructive-foreground rounded-s shadow-normal-s",
          "hover:bg-destructive/90 hover:shadow-normal-m",
          "onclick:bg-destructive/80 onclick:scale-95 onclick:shadow-none", // Updated for onclick state
          "disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none",
        ],
        "red-l-bottom": [
          "h-12 px-6 py-3 text-base",
          "bg-gradient-red text-white shadow-normal-m rounded-m",
          "hover:opacity-90 hover:shadow-normal-l",
          "onclick:opacity-80 onclick:scale-95 onclick:shadow-none", // Updated for onclick state
          "disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none disabled:opacity-50",
        ],
        "orange-m": [
          "h-10 px-4 py-2",
          "bg-gradient-orange-primary text-white rounded-s shadow-normal-s",
          "hover:opacity-90 hover:shadow-normal-m",
          "onclick:opacity-80 onclick:scale-95 onclick:shadow-none", // Updated for onclick state
          "disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none disabled:opacity-50",
        ],
        "pick-m": [
          "h-[3.25rem] pl-12 pr-[3.375rem] py-0 gap-1 flex-shrink-0",
          "bg-gradient-blue-primary text-white rounded-m shadow-blue-m",
          "btn-with-icon btn-icon-pick",
          "hover:opacity-90 hover:shadow-blue-m",
          "onclick:opacity-80 onclick:scale-95 onclick:shadow-none", // Updated for onclick state
          "disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none disabled:opacity-50",
        ],
        "pick-l": [
          "h-[3.25rem] pl-12 pr-[3.375rem] py-0 gap-1 flex-shrink-0",
          "bg-gradient-blue-primary text-white rounded-m shadow-blue-m",
          "btn-with-icon btn-icon-pick",
          "hover:opacity-90 hover:shadow-blue-m",
          "onclick:opacity-80 onclick:scale-95 onclick:shadow-none", // Updated for onclick state
          "disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none disabled:opacity-50",
        ],
        textbutton: [
          "inline-flex h-[52px] px-[48px] py-0 justify-center items-center gap-2 flex-shrink-0",
          "text-primary underline-offset-4 bg-transparent",
          "hover:underline hover:text-primary/80",
          "onclick:text-primary/70", // No shadow to remove here
          "disabled:text-gray-400 disabled:no-underline",
        ],
      },
      size: {
        default: "",
        sm: "",
        lg: "",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary-m",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {children}
      </Comp>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
