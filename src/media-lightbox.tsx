import type { ReactNode } from 'react'
import { Image } from 'antd'

export type MediaLightboxProps = {
  children: ReactNode
}

/**
 * Related evidence belongs to one preview group, so an album opens as one
 * navigable lightbox rather than a row of disconnected image viewers.
 */
export function MediaLightbox({ children }: MediaLightboxProps) {
  return <Image.PreviewGroup>{children}</Image.PreviewGroup>
}
