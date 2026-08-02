import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import * as ui from '../dist/index.js'

const preCommentSurfaceExports = [
  'MultiSelect',
  'Popover',
  'PopoverTrigger',
  'PopoverContent',
  'PopoverHeader',
  'PopoverBody',
  'PopoverFooter',
  'PopoverCloseTrigger',
  'PopoverArrow',
  'Table',
  'TableHeader',
  'TableBody',
  'TableFooter',
  'TableRow',
  'TableHead',
  'TableCell',
  'TableCaption',
  'ContextMenuSub',
  'ContextMenuSubTrigger',
  'ContextMenuSubContent',
  'ContextMenuLabel',
  'ContextMenuSeparator',
]

test('a rebuild preserves the public API that predates comment surfaces', () => {
  for (const name of preCommentSurfaceExports) {
    assert.notEqual(ui[name], undefined, `${name} must remain exported`)
  }
})

test('a rebuild preserves the pre-comment MultiSelect type exports', async () => {
  const declarations = await readFile(new URL('../dist/index.d.ts', import.meta.url), 'utf8')

  assert.match(declarations, /type MultiSelectOption/)
  assert.match(declarations, /type MultiSelectProps/)
})
