import { Button } from './button'
import { CommentCard, CommentNotice, CommentSheet, CommentSheetHandle, CommentSheetHeader, ThreeSlotBar } from './comment-surface'

export function CommentSurfaceStory() {
  return <div style={{ maxWidth: 390 }}>
    <ThreeSlotBar
      start={<Button variant="plain">4 open</Button>}
      middle={<Button variant="plain">1 draft</Button>}
      end={<Button>Comment on selection</Button>}
    />
    <CommentSheet open>
      <CommentSheetHeader><CommentSheetHandle />View all · 1 of 4</CommentSheetHeader>
      <CommentCard state="active" tone="agent" quotedText="A merged pull request is not a deployed change" identity="xianxing">
        The component owns the visual contract; the consumer owns behavior.
      </CommentCard>
      <CommentNotice variant="warning">Delivery is continuing.</CommentNotice>
    </CommentSheet>
  </div>
}
