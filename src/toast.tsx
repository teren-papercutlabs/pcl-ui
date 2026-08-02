/**
 * Shared toast API backed by Radix Toast.
 *
 * Product code owns the semantic variants and PcL card styling. Radix owns
 * timing, pause/focus behavior, announcements, keyboard focus and swipe
 * dismissal.
 */
import { useEffect, useState } from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { cn } from './lib/utils'

interface ToastData {
  id: string
  title?: string
  description?: string
  type: 'success' | 'error' | 'info'
  duration?: number
}

type ToastListener = (toasts: ToastData[]) => void

interface ToasterOptions {
  placement?: string
  pauseOnPageIdle?: boolean
}

interface ToastOptions {
  title?: string
  description?: string
  duration?: number
}

interface ToasterInstance {
  subscribe: (listener: ToastListener) => () => void
  success: (opts: ToastOptions) => void
  error: (opts: ToastOptions) => void
  info: (opts: ToastOptions) => void
}

interface InternalToasterState {
  getSnapshot: () => ToastData[]
  dismiss: (id: string) => void
  placement: string
}

const internalState = new WeakMap<ToasterInstance, InternalToasterState>()

let toastIdCounter = 0

export function createToaster(options?: ToasterOptions): ToasterInstance {
  let toasts: ToastData[] = []
  const listeners = new Set<ToastListener>()

  function notify() {
    const snapshot = [...toasts]
    listeners.forEach((listener) => listener(snapshot))
  }

  function addToast(type: ToastData['type'], opts: ToastOptions) {
    const id = `toast-${++toastIdCounter}`
    toasts = [...toasts, { id, type, ...opts }]
    notify()
  }

  function dismiss(id: string) {
    const next = toasts.filter((toast) => toast.id !== id)
    if (next.length === toasts.length) return
    toasts = next
    notify()
  }

  const instance: ToasterInstance = {
    subscribe(listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    success: (opts) => addToast('success', opts),
    error: (opts) => addToast('error', opts),
    info: (opts) => addToast('info', opts),
  }
  internalState.set(instance, {
    getSnapshot: () => [...toasts],
    dismiss,
    placement: options?.placement ?? 'bottom-end',
  })
  return instance
}

interface ToasterProps {
  toaster: ToasterInstance
}

const ICON_MAP = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
}

const COLOR_MAP = {
  success: 'text-green-600',
  error: 'text-[var(--destructive)]',
  info: 'text-[var(--primary)]',
}

const VIEWPORT_PLACEMENT = {
  'bottom-start': 'bottom-4 left-4',
  'bottom-end': 'bottom-4 right-4',
  'top-start': 'top-4 left-4',
  'top-end': 'top-4 right-4',
} as const

export function Toaster({ toaster }: ToasterProps) {
  const state = internalState.get(toaster)
  const [toasts, setToasts] = useState<ToastData[]>(() => state?.getSnapshot() ?? [])

  useEffect(() => toaster.subscribe(setToasts), [toaster])

  const viewportPlacement = VIEWPORT_PLACEMENT[
    state?.placement as keyof typeof VIEWPORT_PLACEMENT
  ] ?? VIEWPORT_PLACEMENT['bottom-end']

  return (
    <ToastPrimitive.Provider swipeDirection="right" label="Notifications">
      {toasts.map((toast) => {
        const Icon = ICON_MAP[toast.type]
        return (
          <ToastPrimitive.Root
            key={toast.id}
            duration={toast.duration ?? 4000}
            onOpenChange={(open) => {
              if (!open) {
                if (state) state.dismiss(toast.id)
                else setToasts((current) => current.filter(({ id }) => id !== toast.id))
              }
            }}
            className={cn(
              'flex items-start gap-3 rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 shadow-md',
              'data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-2',
              'data-[state=closed]:animate-out data-[state=closed]:fade-out',
              'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]',
              'data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform',
              'data-[swipe=end]:animate-out data-[swipe=end]:slide-out-to-right-full',
            )}
          >
            <Icon size={16} className={cn('mt-0.5 shrink-0', COLOR_MAP[toast.type])} />
            <div className="min-w-0 flex-1">
              {toast.title && (
                <ToastPrimitive.Title className="text-sm font-medium">
                  {toast.title}
                </ToastPrimitive.Title>
              )}
              {toast.description && (
                <ToastPrimitive.Description className="mt-1 text-xs text-[var(--muted-foreground)]">
                  {toast.description}
                </ToastPrimitive.Description>
              )}
            </div>
            <ToastPrimitive.Close
              aria-label="Dismiss notification"
              className="shrink-0 cursor-pointer text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            >
              <X size={14} />
            </ToastPrimitive.Close>
          </ToastPrimitive.Root>
        )
      })}
      <ToastPrimitive.Viewport
        className={cn(
          'fixed z-[100] m-0 flex max-w-[calc(100vw-2rem)] flex-col gap-2 p-0 outline-none',
          viewportPlacement,
        )}
      />
    </ToastPrimitive.Provider>
  )
}
