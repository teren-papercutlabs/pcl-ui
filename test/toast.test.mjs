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
    Event: dom.window.Event,
    Node: dom.window.Node,
    CustomEvent: dom.window.CustomEvent,
    MutationObserver: dom.window.MutationObserver,
    getComputedStyle: dom.window.getComputedStyle,
    IS_REACT_ACT_ENVIRONMENT: true,
  })
  Object.defineProperty(document, 'hasFocus', { configurable: true, value: () => true })
  class PointerEvent extends dom.window.MouseEvent {
    constructor(type, options = {}) {
      super(type, options)
      Object.defineProperties(this, {
        pointerId: { value: options.pointerId ?? 1 },
        pointerType: { value: options.pointerType ?? 'touch' },
      })
    }
  }
  Object.defineProperty(dom.window, 'PointerEvent', { configurable: true, value: PointerEvent })
  Object.defineProperty(globalThis, 'PointerEvent', { configurable: true, value: PointerEvent })
  dom.window.HTMLElement.prototype.setPointerCapture = () => {}
  dom.window.HTMLElement.prototype.releasePointerCapture = () => {}
  dom.window.HTMLElement.prototype.hasPointerCapture = () => true
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
  assert.equal(document.querySelector('[data-state="open"]'), null)

  await act(async () => root.unmount())
  dom.window.close()
})

test('Toaster remains compatible with the legacy public toaster shape', async () => {
  const dom = installDom()
  let listener = () => {}
  const legacyToaster = {
    subscribe(next) {
      listener = next
      return () => { listener = () => {} }
    },
    success() {},
    error() {},
    info() {},
  }
  const root = createRoot(document.getElementById('root'))

  await act(async () => root.render(React.createElement(Toaster, { toaster: legacyToaster })))
  await act(async () => listener([{ id: 'legacy-1', type: 'info', title: 'Legacy toast', duration: 0 }]))
  assert.equal(document.querySelector('[data-state="open"]')?.textContent.includes('Legacy toast'), true)

  await act(async () => document.querySelector('[aria-label="Dismiss notification"]').click())
  assert.equal(document.querySelector('[data-state="open"]'), null)
  await act(async () => root.unmount())
  dom.window.close()
})

test('Radix owns timeout dismissal and non-default placement is honored', async () => {
  const dom = installDom()
  const toaster = createToaster({ placement: 'top-start', pauseOnPageIdle: true })
  const root = createRoot(document.getElementById('root'))

  await act(async () => root.render(React.createElement(Toaster, { toaster })))
  await act(async () => toaster.info({ title: 'Brief notice', duration: 20 }))
  assert.match(document.querySelector('ol').className, /top-4/)
  assert.match(document.querySelector('ol').className, /left-4/)
  assert.ok(document.querySelector('[data-state="open"]'))

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 80))
  })
  assert.equal(document.querySelector('[data-state="open"]'), null)
  await act(async () => root.unmount())
  dom.window.close()
})

test('Radix swipe dismissal closes through the shared toaster path', async () => {
  const dom = installDom()
  const toaster = createToaster()
  const root = createRoot(document.getElementById('root'))

  await act(async () => root.render(React.createElement(Toaster, { toaster })))
  await act(async () => toaster.info({ title: 'Swipe me', duration: 0 }))
  const toast = document.querySelector('[data-state="open"]')

  await act(async () => {
    toast.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: 0, clientY: 0 }))
    toast.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientX: 100, clientY: 0 }))
    toast.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, clientX: 100, clientY: 0 }))
  })
  assert.equal(document.querySelector('[data-state="open"]'), null)

  await act(async () => root.unmount())
  dom.window.close()
})

test('stable toast ids collapse a burst and retain one accessible action', async () => {
  const dom = installDom()
  const toaster = createToaster()
  let activations = 0
  const root = createRoot(document.querySelector('#root'))

  await act(async () => root.render(React.createElement(Toaster, { toaster })))
  await act(async () => {
    toaster.info({ id: 'doc-replies', title: 'Rasim replied', description: 'First', duration: 0, onClick: () => { activations += 1 } })
    toaster.info({ id: 'doc-replies', title: '2 new replies', description: 'Kleya: Latest', duration: 0, onClick: () => { activations += 1 } })
  })

  const actionable = Array.from(document.querySelectorAll('button')).find((button) => button.textContent === 'View')
  assert.ok(actionable)
  assert.equal(document.querySelectorAll('[data-state="open"]').length, 1)
  assert.match(document.querySelector('[data-state="open"]').textContent, /2 new replies/)
  assert.match(document.querySelector('[data-state="open"]').textContent, /Kleya: Latest/)

  await act(async () => actionable.click())
  assert.equal(activations, 1)
  assert.equal(document.querySelector('[data-state="open"]'), null)

  await act(async () => root.unmount())
  dom.window.close()
})

test('generated toast ids never collide with caller-owned ids', () => {
  const toaster = createToaster()
  let snapshot = []
  toaster.subscribe((toasts) => { snapshot = toasts })

  toaster.info({ id: 'toast-1', title: 'Caller-owned' })
  toaster.error({ title: 'Generated' })

  assert.equal(snapshot.length, 2)
  assert.deepEqual(snapshot.map(({ title }) => title), ['Caller-owned', 'Generated'])
})

test('keyboard activation of Dismiss never invokes the toast action', async () => {
  const dom = installDom()
  const toaster = createToaster()
  let activations = 0
  const root = createRoot(document.querySelector('#root'))

  await act(async () => root.render(React.createElement(Toaster, { toaster })))
  await act(async () => toaster.info({ title: 'Actionable', duration: 0, onClick: () => { activations += 1 } }))
  const close = document.querySelector('[aria-label="Dismiss notification"]')
  await act(async () => close.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'Enter', bubbles: true })))
  await act(async () => close.click())

  assert.equal(activations, 0)
  await act(async () => root.unmount())
  dom.window.close()
})
