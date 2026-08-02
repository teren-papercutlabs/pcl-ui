/**
 * Popover — floating content panel using @radix-ui/react-popover.
 *
 * Usage:
 *   <Popover open={open} onOpenChange={setOpen}>
 *     <PopoverTrigger asChild>
 *       <Button>Open</Button>
 *     </PopoverTrigger>
 *     <PopoverContent>
 *       <PopoverHeader>Title</PopoverHeader>
 *       <PopoverBody>Content here</PopoverBody>
 *       <PopoverFooter>Footer</PopoverFooter>
 *     </PopoverContent>
 *   </Popover>
 */
import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { cn } from './lib/utils'
import { X } from 'lucide-react'

interface PopoverProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

function Popover({ open, onOpenChange, children }: PopoverProps) {
  return (
    <PopoverPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </PopoverPrimitive.Root>
  )
}

interface PopoverTriggerProps {
  asChild?: boolean
  children: React.ReactElement
}

function PopoverTrigger({ asChild, children }: PopoverTriggerProps) {
  return (
    <PopoverPrimitive.Trigger asChild={asChild}>
      {children}
    </PopoverPrimitive.Trigger>
  )
}

interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
}

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ className, align = 'center', side = 'bottom', sideOffset = 4, children, ...props }, ref) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        side={side}
        sideOffset={sideOffset}
        className={cn(
          'z-50 w-72 rounded-md border border-[var(--border)] bg-[var(--popover)] text-[var(--popover-foreground)] shadow-md outline-none',
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className,
        )}
        {...props}
      >
        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  ),
)
PopoverContent.displayName = 'PopoverContent'

function PopoverHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center justify-between px-4 pt-4 pb-1', className)}
      {...props}
    />
  )
}

function PopoverBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('px-4 py-2', className)}
      {...props}
    />
  )
}

function PopoverFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center px-4 pb-4 pt-1', className)}
      {...props}
    />
  )
}

function PopoverCloseTrigger({
  className,
  onClick,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <PopoverPrimitive.Close asChild>
      <div
        className={cn('cursor-pointer text-[var(--muted-foreground)] hover:text-[var(--foreground)]', className)}
        onClick={onClick}
        {...props}
      >
        <X size={16} />
      </div>
    </PopoverPrimitive.Close>
  )
}

const PopoverArrow = React.forwardRef<
  SVGSVGElement,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Arrow>
>(({ className, ...props }, ref) => (
  <PopoverPrimitive.Arrow
    ref={ref}
    className={cn('fill-[var(--popover)]', className)}
    {...props}
  />
))
PopoverArrow.displayName = 'PopoverArrow'

// Attach sub-components
Popover.Trigger = PopoverTrigger
Popover.Content = PopoverContent
Popover.Header = PopoverHeader
Popover.Body = PopoverBody
Popover.Footer = PopoverFooter
Popover.CloseTrigger = PopoverCloseTrigger
Popover.Arrow = PopoverArrow

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverCloseTrigger,
  PopoverArrow,
}
