import type { ReactNode } from 'react'
import { App, ConfigProvider, theme as antdTheme } from 'antd'
import type { ConfigProviderProps, ThemeConfig } from 'antd'

export type PclThemeOptions = {
  appearance?: 'light' | 'dark'
}

export type PclUiProviderProps = {
  children: ReactNode
  appearance?: PclThemeOptions['appearance']
  direction?: ConfigProviderProps['direction']
  locale?: ConfigProviderProps['locale']
  getPopupContainer?: ConfigProviderProps['getPopupContainer']
}

const PCL_TOKEN_BASE = Object.freeze({
  borderRadius: 6,
  controlHeight: 32,
})

function assertPclThemeOptions(options: PclThemeOptions): void {
  if (options.appearance !== undefined && options.appearance !== 'light' && options.appearance !== 'dark') {
    throw new Error(`Unsupported PcL theme appearance: ${String(options.appearance)}`)
  }
}

/**
 * The only supported path from a product to Ant's global theme configuration.
 * Products choose a named appearance; this layer owns the token family.
 */
export function createPclTheme(options: PclThemeOptions = {}): ThemeConfig {
  assertPclThemeOptions(options)

  return {
    algorithm: options.appearance === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token: PCL_TOKEN_BASE,
  }
}

/**
 * Root provider for an operational product. It deliberately accepts no arbitrary
 * token or selector overrides: those belong in the ratified shared design layer.
 */
export function PclUiProvider({
  children,
  appearance,
  direction,
  locale,
  getPopupContainer,
}: PclUiProviderProps) {
  return (
    <ConfigProvider
      direction={direction}
      getPopupContainer={getPopupContainer}
      locale={locale}
      theme={createPclTheme({ appearance })}
    >
      <App>{children}</App>
    </ConfigProvider>
  )
}
