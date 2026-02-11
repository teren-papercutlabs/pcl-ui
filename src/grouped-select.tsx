/**
 * GroupedSelect — Radix UI select with optgroup support.
 * Replaces the native select/Chakra GroupedSelect component.
 */
import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from './lib/utils'

interface SelectOption {
  value: string
  label: string
}

interface SelectGroup {
  label: string
  options: SelectOption[]
}

export interface GroupedSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  agentRef?: string
  placeholder?: string
  groups: SelectGroup[]
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const GroupedSelect = React.forwardRef<HTMLButtonElement, GroupedSelectProps>(
  ({ className, agentRef, placeholder, groups, value, onChange, disabled, ...props }, ref) => {
    const handleValueChange = (newValue: string) => {
      if (onChange) {
        // Bridge Radix's onValueChange to the existing onChange API
        onChange({ target: { value: newValue } } as React.ChangeEvent<HTMLSelectElement>)
      }
    }

    return (
      <SelectPrimitive.Root value={value as string} onValueChange={handleValueChange} disabled={disabled}>
        <SelectPrimitive.Trigger
          ref={ref}
          className={cn(
            'flex h-9 w-full items-center justify-between rounded-md border border-[var(--input)] bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)] disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          data-agent-ref={agentRef}
          {...(props as any)}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon asChild>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className="relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-[var(--input)] bg-[var(--popover)] text-[var(--popover-foreground)] shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
            position="popper"
            sideOffset={5}
          >
            <SelectPrimitive.Viewport className="p-1">
              {groups.map((group) => (
                <SelectPrimitive.Group key={group.label}>
                  <SelectPrimitive.Label className="px-3 py-1.5 text-xs font-semibold text-[var(--muted-foreground)]">
                    {group.label}
                  </SelectPrimitive.Label>
                  {group.options.map((option) => (
                    <SelectPrimitive.Item
                      key={option.value}
                      value={option.value}
                      className="relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-3 text-sm outline-none hover:bg-[var(--muted)] focus:bg-[var(--muted)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                    >
                      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                        <SelectPrimitive.ItemIndicator>
                          <Check className="h-4 w-4" />
                        </SelectPrimitive.ItemIndicator>
                      </span>
                      <SelectPrimitive.ItemText>
                        {option.label}
                      </SelectPrimitive.ItemText>
                    </SelectPrimitive.Item>
                  ))}
                </SelectPrimitive.Group>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    )
  },
)
GroupedSelect.displayName = 'GroupedSelect'

export { GroupedSelect }
