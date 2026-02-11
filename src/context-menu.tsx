/**
 * ContextMenu — right-click context menu using @radix-ui/react-context-menu.
 *
 * Supports agentRef on the root for agent interaction.
 */
import * as React from 'react'
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'
import { cn } from './lib/utils'

interface ContextMenuProps {
  agentRef?: string
  children: React.ReactNode
}

function ContextMenu({ agentRef, children }: ContextMenuProps) {
  return (
    <ContextMenuPrimitive.Root>
      <div data-agent-ref={agentRef} className="contents">
        {children}
      </div>
    </ContextMenuPrimitive.Root>
  )
}

interface ContextMenuTriggerProps {
  asChild?: boolean
  children: React.ReactElement
}

function ContextMenuTrigger({ asChild, children }: ContextMenuTriggerProps) {
  return (
    <ContextMenuPrimitive.Trigger asChild={asChild}>
      {children}
    </ContextMenuPrimitive.Trigger>
  )
}

interface ContextMenuContentProps {
  children: React.ReactNode
  className?: string
}

function ContextMenuContent({ children, className }: ContextMenuContentProps) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        className={cn(
          'z-50 min-w-[8rem] rounded-md border border-[var(--border)] bg-[var(--popover)] text-[var(--popover-foreground)] shadow-md py-1',
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          className,
        )}
      >
        {children}
      </ContextMenuPrimitive.Content>
    </ContextMenuPrimitive.Portal>
  )
}

interface ContextMenuItemProps {
  value?: string
  className?: string
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

function ContextMenuItem({ className, children, onClick, ...props }: ContextMenuItemProps) {
  return (
    <ContextMenuPrimitive.Item
      className={cn(
        'relative flex cursor-pointer select-none items-center px-3 py-1.5 text-sm outline-none transition-colors hover:bg-[var(--muted)] focus:bg-[var(--muted)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      onSelect={() => onClick?.({} as React.MouseEvent<HTMLDivElement>)}
      {...props}
    >
      {children}
    </ContextMenuPrimitive.Item>
  )
}

// Attach sub-components
ContextMenu.Trigger = ContextMenuTrigger
ContextMenu.Content = ContextMenuContent
ContextMenu.Item = ContextMenuItem

export { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem }
