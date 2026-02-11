/**
 * Dialog — modal component using Radix UI Dialog primitives.
 *
 * Usage:
 *   <Dialog open={open} onOpenChange={setOpen}>
 *     <DialogContent>
 *       <DialogHeader>
 *         <DialogTitle>Title</DialogTitle>
 *       </DialogHeader>
 *       <DialogBody>...</DialogBody>
 *       <DialogFooter>...</DialogFooter>
 *     </DialogContent>
 *   </Dialog>
 */
import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from './lib/utils'
import { X } from 'lucide-react'

interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

function Dialog({ open, onOpenChange, children }: DialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </DialogPrimitive.Root>
  )
}

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: string
}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, maxWidth, style, children, ...props }, ref) => (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/60 z-50" />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] shadow-lg overflow-hidden',
          className,
        )}
        style={{ maxWidth: maxWidth ?? '32rem', maxHeight: '80vh', ...style }}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  ),
)
DialogContent.displayName = 'DialogContent'

function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center justify-between px-6 pt-6 pb-2', className)}
      {...props}
    />
  )
}

function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <DialogPrimitive.Title
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
}

function DialogBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('px-6 py-4 overflow-y-auto', className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center px-6 pb-6 pt-2', className)}
      {...props}
    />
  )
}

function DialogCloseTrigger({
  className,
  onClick,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <DialogPrimitive.Close asChild>
      <div
        className={cn('cursor-pointer text-[var(--muted-foreground)] hover:text-[var(--foreground)]', className)}
        onClick={onClick}
        {...props}
      >
        <X size={18} />
      </div>
    </DialogPrimitive.Close>
  )
}

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogCloseTrigger,
}
