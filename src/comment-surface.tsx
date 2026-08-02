import * as React from 'react'
import { cn } from './lib/utils'

export type CommentSurfaceState = 'rest' | 'active' | 'pending' | 'disabled'

type SlotElement = React.ReactElement<Record<string, unknown>>

export interface ThreeSlotBarProps extends React.HTMLAttributes<HTMLDivElement> {
  start: SlotElement
  middle: SlotElement
  end: SlotElement
  state?: CommentSurfaceState
}

function withSlot(element: SlotElement, slot: 'start' | 'middle' | 'end') {
  return React.cloneElement(element, { 'data-comment-slot': slot })
}

export const ThreeSlotBar = React.forwardRef<HTMLDivElement, ThreeSlotBarProps>(
  ({ start, middle, end, state = 'rest', className, ...props }, ref) => (
    <div ref={ref} className={cn('pcl-comment-three-slot-bar', className)} data-state={state} {...props}>
      {withSlot(start, 'start')}
      {withSlot(middle, 'middle')}
      {withSlot(end, 'end')}
    </div>
  ),
)
ThreeSlotBar.displayName = 'ThreeSlotBar'

export interface CommentSheetProps extends React.HTMLAttributes<HTMLElement> {
  open?: boolean
  expanded?: boolean
  disabled?: boolean
}

export const CommentSheet = React.forwardRef<HTMLElement, CommentSheetProps>(
  ({ open = false, expanded = false, disabled = false, className, ...props }, ref) => (
    <aside
      ref={ref}
      className={cn('pcl-comment-sheet', open && 'open', expanded && 'expanded', className)}
      data-state={disabled ? 'disabled' : open ? 'active' : 'rest'}
      aria-disabled={disabled || undefined}
      {...props}
    />
  ),
)
CommentSheet.displayName = 'CommentSheet'

export const CommentSheetHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('pcl-comment-sheet-header', className)} {...props} />,
)
CommentSheetHeader.displayName = 'CommentSheetHeader'

export const CommentSheetHandle = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => <span ref={ref} className={cn('pcl-comment-sheet-handle', className)} aria-hidden="true" {...props} />,
)
CommentSheetHandle.displayName = 'CommentSheetHandle'

export interface CommentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  state?: CommentSurfaceState
  tone?: 'principal' | 'agent'
  quotedText?: React.ReactNode
  identity?: React.ReactNode
  actions?: React.ReactNode
}

export const CommentCard = React.forwardRef<HTMLDivElement, CommentCardProps>(
  ({ state = 'rest', tone = 'principal', quotedText, identity, actions, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('pcl-comment-card', state === 'active' && 'active', state === 'pending' && 'pending', className)}
      data-state={state}
      data-tone={tone}
      aria-disabled={state === 'disabled' || undefined}
      {...props}
    >
      {quotedText !== undefined && <CommentQuote>{quotedText}</CommentQuote>}
      {identity !== undefined && <CommentIdentity>{identity}</CommentIdentity>}
      {children}
      {actions !== undefined && <CommentActions>{actions}</CommentActions>}
    </div>
  ),
)
CommentCard.displayName = 'CommentCard'

export const CommentQuote = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('pcl-comment-quote', className)} {...props} />,
)
CommentQuote.displayName = 'CommentQuote'

export const CommentIdentity = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('pcl-comment-identity', className)} {...props} />,
)
CommentIdentity.displayName = 'CommentIdentity'

export const CommentActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('pcl-comment-actions', className)} {...props} />,
)
CommentActions.displayName = 'CommentActions'

export interface CommentNoticeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'danger'
  live?: 'polite' | 'assertive' | 'off'
}

export const CommentNotice = React.forwardRef<HTMLDivElement, CommentNoticeProps>(
  ({ variant = 'info', live = 'polite', className, role, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('pcl-comment-notice', className)}
      data-variant={variant}
      role={role ?? (variant === 'danger' ? 'alert' : 'status')}
      aria-live={live}
      {...props}
    />
  ),
)
CommentNotice.displayName = 'CommentNotice'
