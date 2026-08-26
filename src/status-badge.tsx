import { Badge } from 'antd'

export type StatusTone = 'neutral' | 'info' | 'success' | 'warning' | 'error'

export type StatusBadgeProps = {
  label: string
  tone: StatusTone
}

const ANT_BADGE_STATUS: Record<StatusTone, 'default' | 'processing' | 'success' | 'warning' | 'error'> = {
  neutral: 'default',
  info: 'processing',
  success: 'success',
  warning: 'warning',
  error: 'error',
}

/**
 * A semantic status adapter. It owns the finite visual mapping but deliberately
 * does not decide a product's business status or accept arbitrary visual props.
 */
export function StatusBadge({ label, tone }: StatusBadgeProps) {
  return <Badge status={ANT_BADGE_STATUS[tone]} text={label} />
}
