/**
 * Toast system — lightweight replacement for Chakra's createToaster.
 *
 * Renders toast notifications in a fixed container at bottom-right.
 * Uses a pub-sub pattern: `createToaster()` returns an object with
 * `.success()`, `.error()`, `.info()` methods. A `<Toaster>` component
 * subscribes and renders them.
 */
import { useState, useEffect, useCallback } from 'react'
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

interface ToasterInstance {
  subscribe: (listener: ToastListener) => () => void
  success: (opts: { title?: string; description?: string; duration?: number }) => void
  error: (opts: { title?: string; description?: string; duration?: number }) => void
  info: (opts: { title?: string; description?: string; duration?: number }) => void
}

let toastIdCounter = 0

export function createToaster(_options?: ToasterOptions): ToasterInstance {
  let toasts: ToastData[] = []
  const listeners = new Set<ToastListener>()

  function notify() {
    listeners.forEach((l) => l([...toasts]))
  }

  function addToast(type: ToastData['type'], opts: { title?: string; description?: string; duration?: number }) {
    const id = `toast-${++toastIdCounter}`
    const duration = opts.duration ?? 4000
    const toast: ToastData = { id, type, ...opts }
    toasts = [...toasts, toast]
    notify()

    if (duration > 0) {
      setTimeout(() => {
        toasts = toasts.filter((t) => t.id !== id)
        notify()
      }, duration)
    }
  }

  return {
    subscribe(listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    success(opts) { addToast('success', opts) },
    error(opts) { addToast('error', opts) },
    info(opts) { addToast('info', opts) },
  }
}

// ── Toaster React component ──

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

export function Toaster({ toaster }: ToasterProps) {
  const [toasts, setToasts] = useState<ToastData[]>([])

  useEffect(() => {
    return toaster.subscribe(setToasts)
  }, [toaster])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => {
        const Icon = ICON_MAP[toast.type]
        return (
          <div
            key={toast.id}
            className={cn(
              'flex items-start gap-3 rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 shadow-md',
              'animate-in slide-in-from-bottom-2',
            )}
          >
            <Icon size={16} className={cn('mt-0.5 shrink-0', COLOR_MAP[toast.type])} />
            <div className="flex-1 min-w-0">
              {toast.title && (
                <p className="text-sm font-medium">{toast.title}</p>
              )}
              {toast.description && (
                <p className="text-xs text-[var(--muted-foreground)] mt-1">{toast.description}</p>
              )}
            </div>
            <div
              className="cursor-pointer text-[var(--muted-foreground)] hover:text-[var(--foreground)] shrink-0"
              onClick={() => dismiss(toast.id)}
            >
              <X size={14} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
