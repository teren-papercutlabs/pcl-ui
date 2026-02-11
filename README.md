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
