/**
 * FormField — label + children wrapper replacing Chakra FormField.
 * Supports agentRef, required indicator, and consistent spacing.
 */
import * as React from 'react'
import { cn } from './lib/utils'
import { Label } from './label'

interface FormFieldProps {
  agentRef?: string
  label: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

export function FormField({ agentRef, label, required, children, className }: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)} data-agent-ref={agentRef}>
      <Label required={required}>{label}</Label>
      {children}
    </div>
  )
}
