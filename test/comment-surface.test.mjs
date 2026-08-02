import test from 'node:test'
import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import {
  CommentActions,
  CommentCard,
  CommentIdentity,
  CommentNotice,
  CommentQuote,
  CommentSheet,
  CommentSheetHandle,
  CommentSheetHeader,
  ThreeSlotBar,
} from '../dist/index.js'

test('three-slot bar preserves three direct controls and state', () => {
  const html = renderToStaticMarkup(React.createElement(ThreeSlotBar, {
    state: 'active',
    start: React.createElement('button', null, '4 open'),
    middle: React.createElement('button', null, '1 draft'),
    end: React.createElement('button', null, 'Comment on selection'),
  }))
  assert.match(html, /data-state="active"/)
  assert.match(html, /data-comment-slot="start"/)
  assert.match(html, /data-comment-slot="middle"/)
  assert.match(html, /data-comment-slot="end"/)
  assert.equal(html.match(/<button/g)?.length, 3)
})

test('sheet exposes open and expanded state without owning behavior', () => {
  const html = renderToStaticMarkup(React.createElement(CommentSheet, { open: true, expanded: true },
    React.createElement(CommentSheetHeader, null, React.createElement(CommentSheetHandle), '1 of 4'),
  ))
  assert.match(html, /class="pcl-comment-sheet open expanded"/)
  assert.match(html, /data-state="active"/)
  assert.match(html, /pcl-comment-sheet-header/)
  assert.match(html, /pcl-comment-sheet-handle/)
})

test('card renders every public state and ruled region', () => {
  for (const state of ['rest', 'active', 'pending', 'disabled']) {
    const html = renderToStaticMarkup(React.createElement(CommentCard, { state, tone: 'agent' },
      React.createElement(CommentQuote, null, 'Quoted text'),
      React.createElement(CommentIdentity, null, 'Agent'),
      'Body',
      React.createElement(CommentActions, null, 'Reply'),
    ))
    assert.match(html, new RegExp(`data-state="${state}"`))
    assert.match(html, /data-tone="agent"/)
    assert.match(html, /pcl-comment-quote/)
    assert.match(html, /pcl-comment-identity/)
    assert.match(html, /pcl-comment-actions/)
  }
})

test('notice severity maps to accessible live semantics', () => {
  const warning = renderToStaticMarkup(React.createElement(CommentNotice, { variant: 'warning' }, 'Still sending'))
  const danger = renderToStaticMarkup(React.createElement(CommentNotice, { variant: 'danger' }, 'Delivery failed'))
  assert.match(warning, /role="status"/)
  assert.match(warning, /aria-live="polite"/)
  assert.match(danger, /role="alert"/)
})
