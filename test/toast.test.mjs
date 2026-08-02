import test from 'node:test'
import assert from 'node:assert/strict'
import { JSDOM } from 'jsdom'
import React, { act } from 'react'
import { createRoot } from 'react-dom/client'
import { createToaster, Toaster } from '../dist/index.js'

function installDom() {
  const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
    url: 'https://os.papercut-labs.com/',
  })
  Object.assign(globalThis, {
    window: dom.window,
    document: dom.window.document,
    Element: dom.window.Element,
    HTMLElement: dom.window.HTMLElement,
    Node: dom.window.Node,
    CustomEvent: dom.window.CustomEvent,
    MutationObserver: dom.window.MutationObserver,
    getComputedStyle: dom.window.getComputedStyle,
    IS_REACT_ACT_ENVIRONMENT: true,
  })
  Object.defineProperty(globalThis, 'navigator', {
    configurable: true,
    value: dom.window.navigator,
  })
  return dom
}

test('createToaster preserves the success/error/info API without owning timers', () => {
  const originalSetTimeout = globalThis.setTimeout
  let timerCalls = 0
  globalThis.setTimeout = (...args) => {
    timerCalls += 1
    return originalSetTimeout(...args)
  }
  try {
    const toaster = createToaster({ placement: 'bottom-end', pauseOnPageIdle: true })
    const snapshots = []
    const unsubscribe = toaster.subscribe((toasts) => snapshots.push(toasts))

    toaster.success({ title: 'Saved', duration: 2500 })
    toaster.error({ title: 'Failed' })
    toaster.info({ description: 'Updated' })

    assert.deepEqual(snapshots.at(-1).map(({ type, title, description }) => ({ type, title, description })), [
      { type: 'success', title: 'Saved', description: undefined },
      { type: 'error', title: 'Failed', description: undefined },
      { type: 'info', title: undefined, description: 'Updated' },
    ])
    assert.equal(timerCalls, 0, 'Radix, not createToaster, must own dismissal timing')

    const firstId = snapshots[0][0].id
    toaster.dismiss(firstId)
    assert.equal(toaster.getSnapshot().some(({ id }) => id === firstId), false)
    unsubscribe()
  } finally {
    globalThis.setTimeout = originalSetTimeout
  }
})

test('Toaster renders Radix roots in the existing PcL card language and dismisses through the shared store', async () => {
  const dom = installDom()
  const toaster = createToaster({ placement: 'bottom-end', pauseOnPageIdle: true })
  const container = document.getElementById('root')
  const root = createRoot(container)

  await act(async () => {
    root.render(React.createElement(Toaster, { toaster }))
  })
  await act(async () => {
    toaster.success({ title: 'Saved', description: 'The change is live', duration: 0 })
  })

  const toast = document.querySelector('[data-state="open"]')
  assert.ok(toast)
  assert.match(toast.className, /rounded-lg/)
  assert.match(toast.className, /bg-\[var\(--card\)\]/)
  assert.equal(toast.textContent.includes('Saved'), true)
  assert.equal(toast.textContent.includes('The change is live'), true)
  assert.ok(document.querySelector('[aria-label="Dismiss notification"]'))
  assert.match(document.querySelector('ol').className, /bottom-4/)
  assert.match(document.querySelector('ol').className, /right-4/)

  await act(async () => {
    document.querySelector('[aria-label="Dismiss notification"]').click()
  })
  assert.equal(toaster.getSnapshot().length, 0)

  await act(async () => root.unmount())
  dom.window.close()
})
