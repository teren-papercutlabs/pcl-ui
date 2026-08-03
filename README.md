# @pcl/ui

PcL UI primitives built on Radix UI and Tailwind CSS v4.

## Installation

```bash
pnpm add @pcl/ui
```

## Usage

```tsx
import { Button, Input, Dialog } from '@pcl/ui'
import '@pcl/ui/theme.css'

function App() {
  return <Button agentRef="submit-btn">Submit</Button>
}
```

## Components

- **Button** - Button with variants (solid, outline, subtle, plain, surface)
- **Input** - Text input field
- **Textarea** - Multi-line text input
- **Checkbox** - Checkbox with Radix UI primitives
- **Dialog** - Modal dialog with header, body, footer
- **ContextMenu** - Right-click context menu
- **GroupedSelect** - Select with optgroups
- **FormField** - Label + children wrapper
- **Label** - Form label with required indicator
- **Separator** - Horizontal/vertical divider
- **Spinner** - Loading indicator
- **Toast** - Toast notification system
- **ThreeSlotBar** - Stable three-slot comment/action bar; consumer supplies all actions
- **CommentSheet** - Inline, expandable comment sheet shell with header and handle primitives
- **CommentCard** - Comment card regions and `rest | active | pending | disabled` states
- **CommentNotice** - Inline accessible status/alert notice (distinct from global toasts)

## Comment surface

The shared comment components own markup and the ruled visual defaults. Consumers
continue to own fetching, selection geometry, paging, gestures, send state, and
all callbacks.

## Toast actions and collapse

`createToaster()` accepts an optional stable `id` and `onClick` on every toast.
Reusing an id replaces the visible toast (and restarts its duration) instead of
stacking another, while `onClick` makes the whole card keyboard- and
pointer-activatable. Use this for a burst of updates that represents one
destination.

| Component | Typed props |
|---|---|
| `ThreeSlotBar` | `start`, `middle`, `end`, `state` |
| `CommentSheet` | `open`, `expanded`, `disabled` plus native `aside` attributes |
| `CommentCard` | `state`, `tone`, optional `quotedText`, `identity`, `actions` plus native `div` attributes |
| `CommentNotice` | `variant`, `live` plus native `div` attributes |

`CommentSheetHeader`, `CommentSheetHandle`, `CommentQuote`, `CommentIdentity`,
and `CommentActions` are composable regions for consumers that need exact DOM
control without rebuilding the shared state and style vocabulary.

## Agent Interaction

All interactive components support the `agentRef` prop for agent-driven interaction.

```tsx
<Button agentRef="submit-button">Submit</Button>
<Input agentRef="email-input" />
```

## Theme

Import the theme CSS to get PcL Steel Blue design tokens (light + dark mode):

```tsx
import '@pcl/ui/theme.css'
```
