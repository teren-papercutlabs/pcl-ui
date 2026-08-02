// src/button.tsx
import * as React from "react";
import { cva } from "class-variance-authority";

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/button.tsx
import { Loader2 } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        solid: "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90",
        outline: "border border-[var(--border)] bg-transparent hover:bg-[var(--muted)] text-[var(--foreground)]",
        subtle: "bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--muted)]/80",
        plain: "text-[var(--foreground)] hover:bg-[var(--muted)] bg-transparent",
        surface: "border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--muted)]"
      },
      size: {
        xs: "h-7 rounded-md px-2 text-xs",
        sm: "h-8 rounded-md px-3 text-sm",
        md: "h-9 px-4 text-sm",
        lg: "h-10 rounded-md px-6 text-base"
      },
      colorPalette: {
        blue: "",
        red: ""
      }
    },
    compoundVariants: [
      { variant: "solid", colorPalette: "blue", className: "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90" },
      { variant: "solid", colorPalette: "red", className: "bg-[var(--destructive)] text-[var(--destructive-foreground)] hover:bg-[var(--destructive)]/90" },
      { variant: "outline", colorPalette: "red", className: "border-[var(--destructive)] text-[var(--destructive)] hover:bg-[var(--destructive)]/10" }
    ],
    defaultVariants: {
      variant: "solid",
      size: "md"
    }
  }
);
var Button = React.forwardRef(
  ({ className, variant, size, colorPalette, agentRef, loading, disabled, children, ...props }, ref) => {
    return /* @__PURE__ */ jsxs(
      "button",
      {
        className: cn(buttonVariants({ variant, size, colorPalette, className })),
        ref,
        disabled: disabled || loading,
        "data-agent-ref": agentRef,
        ...props,
        children: [
          loading && /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }),
          children
        ]
      }
    );
  }
);
Button.displayName = "Button";

// src/input.tsx
import * as React2 from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var Input = React2.forwardRef(
  ({ className, type, agentRef, ...props }, ref) => {
    return /* @__PURE__ */ jsx2(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-[var(--input)] bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--muted-foreground)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)] disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        "data-agent-ref": agentRef,
        ...props
      }
    );
  }
);
Input.displayName = "Input";

// src/textarea.tsx
import * as React3 from "react";
import { jsx as jsx3 } from "react/jsx-runtime";
var Textarea = React3.forwardRef(
  ({ className, agentRef, ...props }, ref) => {
    return /* @__PURE__ */ jsx3(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-[var(--input)] bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-[var(--muted-foreground)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)] disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        "data-agent-ref": agentRef,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";

// src/checkbox.tsx
import * as React4 from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { jsx as jsx4 } from "react/jsx-runtime";
var Checkbox = React4.forwardRef(({ checked = false, onCheckedChange, size = "md", agentRef, className }, ref) => {
  const sizeClasses = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const iconSize = size === "sm" ? 12 : 14;
  return /* @__PURE__ */ jsx4(
    CheckboxPrimitive.Root,
    {
      ref,
      checked,
      onCheckedChange: (value) => {
        if (typeof value === "boolean") {
          onCheckedChange?.(value);
        }
      },
      "data-agent-ref": agentRef,
      className: cn(
        "peer shrink-0 rounded-sm border border-[var(--border)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)] disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center cursor-pointer",
        checked && "bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]",
        !checked && "bg-transparent",
        sizeClasses,
        className
      ),
      children: /* @__PURE__ */ jsx4(CheckboxPrimitive.Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx4(Check, { size: iconSize }) })
    }
  );
});
Checkbox.displayName = "Checkbox";

// src/separator.tsx
import * as React5 from "react";
import { jsx as jsx5 } from "react/jsx-runtime";
var Separator = React5.forwardRef(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsx5(
    "div",
    {
      ref,
      role: decorative ? "none" : "separator",
      "aria-orientation": decorative ? void 0 : orientation,
      className: cn(
        "shrink-0 bg-[var(--border)]",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      ),
      ...props
    }
  )
);
Separator.displayName = "Separator";

// src/label.tsx
import * as React6 from "react";
import { jsx as jsx6, jsxs as jsxs2 } from "react/jsx-runtime";
var Label = React6.forwardRef(
  ({ className, children, required, ...props }, ref) => /* @__PURE__ */ jsxs2(
    "label",
    {
      ref,
      className: cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      ),
      ...props,
      children: [
        children,
        required && /* @__PURE__ */ jsx6("span", { className: "text-[var(--destructive)] ml-1", children: "*" })
      ]
    }
  )
);
Label.displayName = "Label";

// src/form-field.tsx
import { jsx as jsx7, jsxs as jsxs3 } from "react/jsx-runtime";
function FormField({ agentRef, label, required, children, className }) {
  return /* @__PURE__ */ jsxs3("div", { className: cn("flex flex-col gap-1.5", className), "data-agent-ref": agentRef, children: [
    /* @__PURE__ */ jsx7(Label, { required, children: label }),
    children
  ] });
}

// src/grouped-select.tsx
import * as React7 from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, Check as Check2 } from "lucide-react";
import { jsx as jsx8, jsxs as jsxs4 } from "react/jsx-runtime";
var GroupedSelect = React7.forwardRef(
  ({ className, agentRef, placeholder, groups, value, onChange, disabled, ...props }, ref) => {
    const handleValueChange = (newValue) => {
      if (onChange) {
        onChange({ target: { value: newValue } });
      }
    };
    return /* @__PURE__ */ jsxs4(SelectPrimitive.Root, { value, onValueChange: handleValueChange, disabled, children: [
      /* @__PURE__ */ jsxs4(
        SelectPrimitive.Trigger,
        {
          ref,
          className: cn(
            "flex h-9 w-full items-center justify-between rounded-md border border-[var(--input)] bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)] disabled:cursor-not-allowed disabled:opacity-50",
            className
          ),
          "data-agent-ref": agentRef,
          ...props,
          children: [
            /* @__PURE__ */ jsx8(SelectPrimitive.Value, { placeholder }),
            /* @__PURE__ */ jsx8(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx8(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
          ]
        }
      ),
      /* @__PURE__ */ jsx8(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsx8(
        SelectPrimitive.Content,
        {
          className: "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-[var(--input)] bg-[var(--popover)] text-[var(--popover-foreground)] shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          position: "popper",
          sideOffset: 5,
          children: /* @__PURE__ */ jsx8(SelectPrimitive.Viewport, { className: "p-1", children: groups.map((group) => /* @__PURE__ */ jsxs4(SelectPrimitive.Group, { children: [
            /* @__PURE__ */ jsx8(SelectPrimitive.Label, { className: "px-3 py-1.5 text-xs font-semibold text-[var(--muted-foreground)]", children: group.label }),
            group.options.map((option) => /* @__PURE__ */ jsxs4(
              SelectPrimitive.Item,
              {
                value: option.value,
                className: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-3 text-sm outline-none hover:bg-[var(--muted)] focus:bg-[var(--muted)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                children: [
                  /* @__PURE__ */ jsx8("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx8(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx8(Check2, { className: "h-4 w-4" }) }) }),
                  /* @__PURE__ */ jsx8(SelectPrimitive.ItemText, { children: option.label })
                ]
              },
              option.value
            ))
          ] }, group.label)) })
        }
      ) })
    ] });
  }
);
GroupedSelect.displayName = "GroupedSelect";

// src/spinner.tsx
import { Loader2 as Loader22 } from "lucide-react";
import { jsx as jsx9 } from "react/jsx-runtime";
var SIZE_MAP = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8"
};
function Spinner({ size = "md", className }) {
  return /* @__PURE__ */ jsx9(Loader22, { className: cn("animate-spin text-[var(--muted-foreground)]", SIZE_MAP[size], className) });
}

// src/dialog.tsx
import * as React8 from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { jsx as jsx10, jsxs as jsxs5 } from "react/jsx-runtime";
function Dialog({ open, onOpenChange, children }) {
  return /* @__PURE__ */ jsx10(DialogPrimitive.Root, { open, onOpenChange, children });
}
var DialogContent = React8.forwardRef(
  ({ className, maxWidth, style, children, ...props }, ref) => /* @__PURE__ */ jsxs5(DialogPrimitive.Portal, { children: [
    /* @__PURE__ */ jsx10(DialogPrimitive.Overlay, { className: "fixed inset-0 bg-black/60 z-50" }),
    /* @__PURE__ */ jsx10(
      DialogPrimitive.Content,
      {
        ref,
        className: cn(
          "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] shadow-lg overflow-hidden",
          className
        ),
        style: { maxWidth: maxWidth ?? "32rem", maxHeight: "80vh", ...style },
        ...props,
        children
      }
    )
  ] })
);
DialogContent.displayName = "DialogContent";
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx10(
    "div",
    {
      className: cn("flex items-center justify-between px-6 pt-6 pb-2", className),
      ...props
    }
  );
}
function DialogTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx10(
    DialogPrimitive.Title,
    {
      className: cn("text-lg font-semibold leading-none tracking-tight", className),
      ...props
    }
  );
}
function DialogBody({ className, ...props }) {
  return /* @__PURE__ */ jsx10(
    "div",
    {
      className: cn("px-6 py-4 overflow-y-auto", className),
      ...props
    }
  );
}
function DialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx10(
    "div",
    {
      className: cn("flex items-center px-6 pb-6 pt-2", className),
      ...props
    }
  );
}
function DialogCloseTrigger({
  className,
  onClick,
  ...props
}) {
  return /* @__PURE__ */ jsx10(DialogPrimitive.Close, { asChild: true, children: /* @__PURE__ */ jsx10(
    "div",
    {
      className: cn("cursor-pointer text-[var(--muted-foreground)] hover:text-[var(--foreground)]", className),
      onClick,
      ...props,
      children: /* @__PURE__ */ jsx10(X, { size: 18 })
    }
  ) });
}

// src/context-menu.tsx
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { jsx as jsx11 } from "react/jsx-runtime";
function ContextMenu({ agentRef, children }) {
  return /* @__PURE__ */ jsx11(ContextMenuPrimitive.Root, { children: /* @__PURE__ */ jsx11("div", { "data-agent-ref": agentRef, className: "contents", children }) });
}
function ContextMenuTrigger({ asChild, children }) {
  return /* @__PURE__ */ jsx11(ContextMenuPrimitive.Trigger, { asChild, children });
}
function ContextMenuContent({ children, className }) {
  return /* @__PURE__ */ jsx11(ContextMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx11(
    ContextMenuPrimitive.Content,
    {
      className: cn(
        "z-50 min-w-[8rem] rounded-md border border-[var(--border)] bg-[var(--popover)] text-[var(--popover-foreground)] shadow-md py-1",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        className
      ),
      children
    }
  ) });
}
function ContextMenuItem({ className, children, onClick, ...props }) {
  return /* @__PURE__ */ jsx11(
    ContextMenuPrimitive.Item,
    {
      className: cn(
        "relative flex cursor-pointer select-none items-center px-3 py-1.5 text-sm outline-none transition-colors hover:bg-[var(--muted)] focus:bg-[var(--muted)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      ),
      onSelect: () => onClick?.({}),
      ...props,
      children
    }
  );
}
ContextMenu.Trigger = ContextMenuTrigger;
ContextMenu.Content = ContextMenuContent;
ContextMenu.Item = ContextMenuItem;

// src/toast.tsx
import { useState, useEffect, useCallback } from "react";
import { X as X2, CheckCircle, AlertCircle, Info } from "lucide-react";
import { jsx as jsx12, jsxs as jsxs6 } from "react/jsx-runtime";
var toastIdCounter = 0;
function createToaster(_options) {
  let toasts = [];
  const listeners = /* @__PURE__ */ new Set();
  function notify() {
    listeners.forEach((l) => l([...toasts]));
  }
  function addToast(type, opts) {
    const id = `toast-${++toastIdCounter}`;
    const duration = opts.duration ?? 4e3;
    const toast = { id, type, ...opts };
    toasts = [...toasts, toast];
    notify();
    if (duration > 0) {
      setTimeout(() => {
        toasts = toasts.filter((t) => t.id !== id);
        notify();
      }, duration);
    }
  }
  return {
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    success(opts) {
      addToast("success", opts);
    },
    error(opts) {
      addToast("error", opts);
    },
    info(opts) {
      addToast("info", opts);
    }
  };
}
var ICON_MAP = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info
};
var COLOR_MAP = {
  success: "text-green-600",
  error: "text-[var(--destructive)]",
  info: "text-[var(--primary)]"
};
function Toaster({ toaster }) {
  const [toasts, setToasts] = useState([]);
  useEffect(() => {
    return toaster.subscribe(setToasts);
  }, [toaster]);
  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);
  if (toasts.length === 0) return null;
  return /* @__PURE__ */ jsx12("div", { className: "fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm", children: toasts.map((toast) => {
    const Icon2 = ICON_MAP[toast.type];
    return /* @__PURE__ */ jsxs6(
      "div",
      {
        className: cn(
          "flex items-start gap-3 rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 shadow-md",
          "animate-in slide-in-from-bottom-2"
        ),
        children: [
          /* @__PURE__ */ jsx12(Icon2, { size: 16, className: cn("mt-0.5 shrink-0", COLOR_MAP[toast.type]) }),
          /* @__PURE__ */ jsxs6("div", { className: "flex-1 min-w-0", children: [
            toast.title && /* @__PURE__ */ jsx12("p", { className: "text-sm font-medium", children: toast.title }),
            toast.description && /* @__PURE__ */ jsx12("p", { className: "text-xs text-[var(--muted-foreground)] mt-1", children: toast.description })
          ] }),
          /* @__PURE__ */ jsx12(
            "div",
            {
              className: "cursor-pointer text-[var(--muted-foreground)] hover:text-[var(--foreground)] shrink-0",
              onClick: () => dismiss(toast.id),
              children: /* @__PURE__ */ jsx12(X2, { size: 14 })
            }
          )
        ]
      },
      toast.id
    );
  }) });
}

// src/comment-surface.tsx
import * as React9 from "react";
import { jsx as jsx13, jsxs as jsxs7 } from "react/jsx-runtime";
function withSlot(element, slot) {
  return React9.cloneElement(element, { "data-comment-slot": element.props["data-comment-slot"] ?? slot });
}
var ThreeSlotBar = React9.forwardRef(
  ({ start, middle, end, state = "rest", className, ...props }, ref) => /* @__PURE__ */ jsxs7("div", { ref, className: cn("pcl-comment-three-slot-bar", className), "data-state": state, ...props, children: [
    withSlot(start, "start"),
    withSlot(middle, "middle"),
    withSlot(end, "end")
  ] })
);
ThreeSlotBar.displayName = "ThreeSlotBar";
var CommentSheet = React9.forwardRef(
  ({ open = false, expanded = false, disabled = false, className, ...props }, ref) => /* @__PURE__ */ jsx13(
    "aside",
    {
      ref,
      className: cn("pcl-comment-sheet", open && "open", expanded && "expanded", className),
      "data-state": disabled ? "disabled" : open ? "active" : "rest",
      "aria-disabled": disabled || void 0,
      ...props
    }
  )
);
CommentSheet.displayName = "CommentSheet";
var CommentSheetHeader = React9.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx13("div", { ref, className: cn("pcl-comment-sheet-header", className), ...props })
);
CommentSheetHeader.displayName = "CommentSheetHeader";
var CommentSheetHandle = React9.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx13("span", { ref, className: cn("pcl-comment-sheet-handle", className), "aria-hidden": "true", ...props })
);
CommentSheetHandle.displayName = "CommentSheetHandle";
var CommentCard = React9.forwardRef(
  ({ state = "rest", tone = "principal", quotedText, identity, actions, className, children, ...props }, ref) => /* @__PURE__ */ jsxs7(
    "div",
    {
      ref,
      className: cn("pcl-comment-card", state === "active" && "active", state === "pending" && "pending", className),
      "data-state": state,
      "data-tone": tone,
      "aria-disabled": state === "disabled" || void 0,
      ...props,
      children: [
        quotedText !== void 0 && /* @__PURE__ */ jsx13(CommentQuote, { children: quotedText }),
        identity !== void 0 && /* @__PURE__ */ jsx13(CommentIdentity, { children: identity }),
        children,
        actions !== void 0 && /* @__PURE__ */ jsx13(CommentActions, { children: actions })
      ]
    }
  )
);
CommentCard.displayName = "CommentCard";
var CommentQuote = React9.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx13("div", { ref, className: cn("pcl-comment-quote", className), ...props })
);
CommentQuote.displayName = "CommentQuote";
var CommentIdentity = React9.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx13("div", { ref, className: cn("pcl-comment-identity", className), ...props })
);
CommentIdentity.displayName = "CommentIdentity";
var CommentActions = React9.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx13("div", { ref, className: cn("pcl-comment-actions", className), ...props })
);
CommentActions.displayName = "CommentActions";
var CommentNotice = React9.forwardRef(
  ({ variant = "info", live = "polite", className, role, ...props }, ref) => /* @__PURE__ */ jsx13(
    "div",
    {
      ref,
      className: cn("pcl-comment-notice", className),
      "data-variant": variant,
      role: live === "off" ? role : role ?? (variant === "danger" ? "alert" : "status"),
      "aria-live": live === "off" ? void 0 : live,
      ...props
    }
  )
);
CommentNotice.displayName = "CommentNotice";
export {
  Button,
  Checkbox,
  CommentActions,
  CommentCard,
  CommentIdentity,
  CommentNotice,
  CommentQuote,
  CommentSheet,
  CommentSheetHandle,
  CommentSheetHeader,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  Dialog,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FormField,
  GroupedSelect,
  Input,
  Label,
  Separator,
  Spinner,
  Textarea,
  ThreeSlotBar,
  Toaster,
  cn,
  createToaster
};
//# sourceMappingURL=index.js.map