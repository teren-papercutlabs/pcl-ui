/**
 * MultiSelect — multi-select dropdown with checkbox items.
 * Trigger styling matches GroupedSelect. Opens a Popover with Checkbox items.
 * Supports optional group headers.
 */
import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { ChevronDown } from 'lucide-react'
import { cn } from './lib/utils'
import { Checkbox } from './checkbox'

export interface MultiSelectOption {
  value: string
  label: string
  group?: string
}

export interface MultiSelectProps {
  options: MultiSelectOption[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  summaryFn?: (selected: string[], options: MultiSelectOption[]) => string
  agentRef?: string
  disabled?: boolean
  className?: string
}

function defaultSummary(selected: string[], options: MultiSelectOption[]): string {
  if (selected.length === 0) return 'All'
  if (selected.length <= 2) {
    return selected
      .map((v) => options.find((o) => o.value === v)?.label ?? v)
      .join(', ')
  }
  return `${selected.length} selected`
}

const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      selected,
      onChange,
      placeholder = 'All',
      summaryFn,
      agentRef,
      disabled = false,
      className,
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false)

    const summaryText = React.useMemo(() => {
      if (selected.length === 0) return placeholder
      return summaryFn
        ? summaryFn(selected, options)
        : defaultSummary(selected, options)
    }, [selected, options, placeholder, summaryFn])

    const handleToggle = (value: string) => {
      if (selected.includes(value)) {
        onChange(selected.filter((v) => v !== value))
      } else {
        onChange([...selected, value])
      }
    }

    // Build grouped structure for rendering
    const grouped = React.useMemo(() => {
      const hasGroups = options.some((o) => o.group != null)
      if (!hasGroups) {
        return [{ label: null, options }]
      }
      const groupMap = new Map<string, MultiSelectOption[]>()
      const ungrouped: MultiSelectOption[] = []
      for (const option of options) {
        if (option.group) {
          if (!groupMap.has(option.group)) groupMap.set(option.group, [])
          groupMap.get(option.group)!.push(option)
        } else {
          ungrouped.push(option)
        }
      }
      const result: { label: string | null; options: MultiSelectOption[] }[] = []
      if (ungrouped.length > 0) result.push({ label: null, options: ungrouped })
      for (const [label, opts] of groupMap) {
        result.push({ label, options: opts })
      }
      return result
    }, [options])

    return (
      <PopoverPrimitive.Root open={open} onOpenChange={disabled ? undefined : setOpen}>
        <PopoverPrimitive.Trigger asChild>
          {/* Rendered as a div to stay within pcl-ui-v2 (can't self-import Button from @pcl/ui) */}
          <div
            ref={ref as React.Ref<HTMLDivElement>}
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            tabIndex={disabled ? -1 : 0}
            data-agent-ref={agentRef}
            data-disabled={disabled || undefined}
            onKeyDown={(e) => {
              if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault()
                setOpen((prev) => !prev)
              }
            }}
            className={cn(
              'flex h-9 w-full items-center justify-between rounded-md border border-[var(--input)] bg-transparent px-3 py-1 text-sm shadow-sm transition-colors hover:border-[var(--ring)] cursor-pointer',
              'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)]',
              disabled && 'cursor-not-allowed opacity-50 pointer-events-none',
              className,
            )}
          >
            <span className="truncate">{summaryText}</span>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </div>
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align="start"
            sideOffset={5}
            style={{ minWidth: 'var(--radix-popover-trigger-width)' }}
            className={cn(
              'z-[100] rounded-md border border-[var(--input)] bg-[var(--popover)] text-[var(--popover-foreground)] shadow-md outline-none',
              'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
              'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            )}
          >
            <div className="p-1 max-h-60 overflow-y-auto">
              {grouped.map((group, groupIdx) => (
                <React.Fragment key={group.label ?? `__ungrouped__${groupIdx}`}>
                  {groupIdx > 0 && (
                    <div className="my-1 h-px bg-[var(--border)]" />
                  )}
                  {group.label != null && (
                    <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                      {group.label}
                    </div>
                  )}
                  {group.options.map((option) => {
                    const isChecked = selected.includes(option.value)
                    return (
                      <div
                        key={option.value}
                        role="option"
                        aria-selected={isChecked}
                        onClick={() => handleToggle(option.value)}
                        className="px-3 py-1.5 flex items-center gap-2 text-sm hover:bg-[var(--muted)] cursor-pointer rounded-sm select-none"
                      >
                        <Checkbox
                          checked={isChecked}
                          size="sm"
                        />
                        <span>{option.label}</span>
                      </div>
                    )
                  })}
                </React.Fragment>
              ))}
            </div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    )
  },
)
MultiSelect.displayName = 'MultiSelect'

export { MultiSelect }
