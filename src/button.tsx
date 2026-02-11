import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from './lib/utils'
import { Loader2 } from 'lucide-react'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer',
  {
    variants: {
      variant: {
        solid: 'bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90',
        outline: 'border border-[var(--border)] bg-transparent hover:bg-[var(--muted)] text-[var(--foreground)]',
        subtle: 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--muted)]/80',
        plain: 'text-[var(--foreground)] hover:bg-[var(--muted)] bg-transparent',
        surface: 'border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--muted)]',
      },
      size: {
        xs: 'h-7 rounded-md px-2 text-xs',
        sm: 'h-8 rounded-md px-3 text-sm',
        md: 'h-9 px-4 text-sm',
        lg: 'h-10 rounded-md px-6 text-base',
      },
      colorPalette: {
        blue: '',
        red: '',
      },
    },
    compoundVariants: [
      { variant: 'solid', colorPalette: 'blue', className: 'bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90' },
      { variant: 'solid', colorPalette: 'red', className: 'bg-[var(--destructive)] text-[var(--destructive-foreground)] hover:bg-[var(--destructive)]/90' },
      { variant: 'outline', colorPalette: 'red', className: 'border-[var(--destructive)] text-[var(--destructive)] hover:bg-[var(--destructive)]/10' },
    ],
    defaultVariants: {
      variant: 'solid',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  agentRef?: string
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, colorPalette, agentRef, loading, disabled, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, colorPalette, className }))}
        ref={ref}
        disabled={disabled || loading}
        data-agent-ref={agentRef}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
