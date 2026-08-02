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
  disabled?: boolean
}

function ContextMenuItem({ className, children, onClick, disabled, ...props }: ContextMenuItemProps) {
  return (
    <ContextMenuPrimitive.Item
      className={cn(
        'relative flex cursor-pointer select-none items-center px-3 py-1.5 text-sm outline-none transition-colors hover:bg-[var(--muted)] focus:bg-[var(--muted)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      onSelect={() => onClick?.({} as React.MouseEvent<HTMLDivElement>)}
      disabled={disabled}
      {...props}
    >
      {children}
    </ContextMenuPrimitive.Item>
  )
}

// ─── Sub-menu components ────────────────────────────────

interface ContextMenuSubProps {
  children: React.ReactNode
}

function ContextMenuSub({ children }: ContextMenuSubProps) {
  return <ContextMenuPrimitive.Sub>{children}</ContextMenuPrimitive.Sub>
}

interface ContextMenuSubTriggerProps {
  className?: string
  children?: React.ReactNode
}

function ContextMenuSubTrigger({ className, children }: ContextMenuSubTriggerProps) {
  return (
    <ContextMenuPrimitive.SubTrigger
      className={cn(
        'relative flex cursor-pointer select-none items-center px-3 py-1.5 text-sm outline-none transition-colors hover:bg-[var(--muted)] focus:bg-[var(--muted)] data-[state=open]:bg-[var(--muted)]',
        className,
      )}
    >
      {children}
      <span className="ml-auto pl-4 text-xs">&#x25B8;</span>
    </ContextMenuPrimitive.SubTrigger>
  )
}

interface ContextMenuSubContentProps {
  className?: string
  children?: React.ReactNode
}

function ContextMenuSubContent({ className, children }: ContextMenuSubContentProps) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.SubContent
        className={cn(
          'z-50 min-w-[8rem] rounded-md border border-[var(--border)] bg-[var(--popover)] text-[var(--popover-foreground)] shadow-md py-1',
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          className,
        )}
      >
        {children}
      </ContextMenuPrimitive.SubContent>
    </ContextMenuPrimitive.Portal>
  )
}

interface ContextMenuLabelProps {
  className?: string
  children?: React.ReactNode
}

function ContextMenuLabel({ className, children }: ContextMenuLabelProps) {
  return (
    <ContextMenuPrimitive.Label
      className={cn(
        'px-3 py-1 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider',
        className,
      )}
    >
      {children}
    </ContextMenuPrimitive.Label>
  )
}

interface ContextMenuSeparatorProps {
  className?: string
}

function ContextMenuSeparator({ className }: ContextMenuSeparatorProps) {
  return (
    <ContextMenuPrimitive.Separator
      className={cn('my-1 h-px bg-[var(--border)]', className)}
    />
  )
}

// Attach sub-components
ContextMenu.Trigger = ContextMenuTrigger
ContextMenu.Content = ContextMenuContent
ContextMenu.Item = ContextMenuItem
ContextMenu.Sub = ContextMenuSub
ContextMenu.SubTrigger = ContextMenuSubTrigger
ContextMenu.SubContent = ContextMenuSubContent
ContextMenu.Label = ContextMenuLabel
ContextMenu.Separator = ContextMenuSeparator

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuLabel,
  ContextMenuSeparator,
}
