import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { cn } from './lib/utils'
import { Check } from 'lucide-react'

export interface CheckboxProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  size?: 'sm' | 'md'
  agentRef?: string
  className?: string
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ checked = false, onCheckedChange, size = 'md', agentRef, className }, ref) => {
  const sizeClasses = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'
  const iconSize = size === 'sm' ? 12 : 14

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      checked={checked}
      onCheckedChange={(value) => {
        // Filter out 'indeterminate' state, only pass boolean to consumer
        if (typeof value === 'boolean') {
          onCheckedChange?.(value)
        }
      }}
      data-agent-ref={agentRef}
      className={cn(
        'peer shrink-0 rounded-sm border border-[var(--border)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)] disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center cursor-pointer',
        checked && 'bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]',
        !checked && 'bg-transparent',
        sizeClasses,
        className,
      )}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center">
        <Check size={iconSize} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})
Checkbox.displayName = 'Checkbox'

export { Checkbox }
