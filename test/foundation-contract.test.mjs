import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import {
  MediaLightbox,
  PclUiProvider,
  StatusBadge,
  createPclTheme,
} from '../dist/index.js'

test('the shared theme factory permits only PcL appearance choices', () => {
  const light = createPclTheme()
  const dark = createPclTheme({ appearance: 'dark' })

  assert.equal(light.token.controlHeight, 32)
  assert.equal(light.token.borderRadius, 6)
  assert.notEqual(light.algorithm, dark.algorithm)
  assert.throws(() => createPclTheme({ appearance: 'brand-purple' }), /Unsupported PcL theme appearance/)
})

test('policy adapters render through Ant without selector overrides', () => {
  const markup = renderToStaticMarkup(
    createElement(
      PclUiProvider,
      null,
      createElement(StatusBadge, { tone: 'success', label: 'Submitted for closure' }),
    ),
  )

  assert.match(markup, /Submitted for closure/)

  const previewMarkup = renderToStaticMarkup(
    createElement(
      MediaLightbox,
      null,
      createElement('img', { alt: 'Case evidence', src: '/evidence.jpg' }),
    ),
  )
  assert.match(previewMarkup, /Case evidence/)
})

test('foundation sources contain no Ant private-selector override or primitive forwarding export', async () => {
  const sources = await Promise.all([
    readFile(new URL('../src/pcl-ui-provider.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/status-badge.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/media-lightbox.tsx', import.meta.url), 'utf8'),
  ])
  const source = sources.join('\n')

  assert.doesNotMatch(source, /\.ant-/)
  assert.doesNotMatch(source, /export\s*\{\s*(Button|Input|Select|Form|Table|Modal)\s*\}/)
})
