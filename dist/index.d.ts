import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React from 'react';
import { VariantProps } from 'class-variance-authority';
import { ClassValue } from 'clsx';

declare const buttonVariants: (props?: ({
    variant?: "solid" | "outline" | "subtle" | "plain" | "surface" | null | undefined;
    size?: "xs" | "sm" | "md" | "lg" | null | undefined;
    colorPalette?: "blue" | "red" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    agentRef?: string;
    loading?: boolean;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    agentRef?: string;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    agentRef?: string;
}
declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;

interface CheckboxProps {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    size?: 'sm' | 'md';
    agentRef?: string;
    className?: string;
}
declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLButtonElement>>;

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
    orientation?: 'horizontal' | 'vertical';
    decorative?: boolean;
}
declare const Separator: React.ForwardRefExoticComponent<SeparatorProps & React.RefAttributes<HTMLDivElement>>;

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    required?: boolean;
}
declare const Label: React.ForwardRefExoticComponent<LabelProps & React.RefAttributes<HTMLLabelElement>>;

/**
 * FormField — label + children wrapper replacing Chakra FormField.
 * Supports agentRef, required indicator, and consistent spacing.
 */

interface FormFieldProps {
    agentRef?: string;
    label: string;
    required?: boolean;
    children: React.ReactNode;
    className?: string;
}
declare function FormField({ agentRef, label, required, children, className }: FormFieldProps): React.JSX.Element;

/**
 * GroupedSelect — Radix UI select with optgroup support.
 * Replaces the native select/Chakra GroupedSelect component.
 */

interface SelectOption {
    value: string;
    label: string;
}
interface SelectGroup {
    label: string;
    options: SelectOption[];
}
interface GroupedSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
    agentRef?: string;
    placeholder?: string;
    groups: SelectGroup[];
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
declare const GroupedSelect: React.ForwardRefExoticComponent<GroupedSelectProps & React.RefAttributes<HTMLButtonElement>>;

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}
declare function Spinner({ size, className }: SpinnerProps): React.JSX.Element;

/**
 * Dialog — modal component using Radix UI Dialog primitives.
 *
 * Usage:
 *   <Dialog open={open} onOpenChange={setOpen}>
 *     <DialogContent>
 *       <DialogHeader>
 *         <DialogTitle>Title</DialogTitle>
 *       </DialogHeader>
 *       <DialogBody>...</DialogBody>
 *       <DialogFooter>...</DialogFooter>
 *     </DialogContent>
 *   </Dialog>
 */

interface DialogProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
}
declare function Dialog({ open, onOpenChange, children }: DialogProps): React.JSX.Element;
interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
    maxWidth?: string;
}
declare const DialogContent: React.ForwardRefExoticComponent<DialogContentProps & React.RefAttributes<HTMLDivElement>>;
declare function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
declare function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>): React.JSX.Element;
declare function DialogBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
declare function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
declare function DialogCloseTrigger({ className, onClick, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;

/**
 * ContextMenu — right-click context menu using @radix-ui/react-context-menu.
 *
 * Supports agentRef on the root for agent interaction.
 */

interface ContextMenuProps {
    agentRef?: string;
    children: React.ReactNode;
}
declare function ContextMenu({ agentRef, children }: ContextMenuProps): React.JSX.Element;
declare namespace ContextMenu {
    var Trigger: typeof ContextMenuTrigger;
    var Content: typeof ContextMenuContent;
    var Item: typeof ContextMenuItem;
}
interface ContextMenuTriggerProps {
    asChild?: boolean;
    children: React.ReactElement;
}
declare function ContextMenuTrigger({ asChild, children }: ContextMenuTriggerProps): React.JSX.Element;
interface ContextMenuContentProps {
    children: React.ReactNode;
    className?: string;
}
declare function ContextMenuContent({ children, className }: ContextMenuContentProps): React.JSX.Element;
interface ContextMenuItemProps {
    value?: string;
    className?: string;
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}
declare function ContextMenuItem({ className, children, onClick, ...props }: ContextMenuItemProps): React.JSX.Element;

interface ToastData {
    id: string;
    title?: string;
    description?: string;
    type: 'success' | 'error' | 'info';
    duration?: number;
}
type ToastListener = (toasts: ToastData[]) => void;
interface ToasterOptions {
    placement?: string;
    pauseOnPageIdle?: boolean;
}
interface ToasterInstance {
    subscribe: (listener: ToastListener) => () => void;
    success: (opts: {
        title?: string;
        description?: string;
        duration?: number;
    }) => void;
    error: (opts: {
        title?: string;
        description?: string;
        duration?: number;
    }) => void;
    info: (opts: {
        title?: string;
        description?: string;
        duration?: number;
    }) => void;
}
declare function createToaster(_options?: ToasterOptions): ToasterInstance;
interface ToasterProps {
    toaster: ToasterInstance;
}
declare function Toaster({ toaster }: ToasterProps): React.JSX.Element | null;

type CommentSurfaceState = 'rest' | 'active' | 'pending' | 'disabled';
type SlotElement = React.ReactElement<Record<string, unknown>>;
interface ThreeSlotBarProps extends React.HTMLAttributes<HTMLDivElement> {
    start: SlotElement;
    middle: SlotElement;
    end: SlotElement;
    state?: CommentSurfaceState;
}
declare const ThreeSlotBar: React.ForwardRefExoticComponent<ThreeSlotBarProps & React.RefAttributes<HTMLDivElement>>;
interface CommentSheetProps extends React.HTMLAttributes<HTMLElement> {
    open?: boolean;
    expanded?: boolean;
    disabled?: boolean;
}
declare const CommentSheet: React.ForwardRefExoticComponent<CommentSheetProps & React.RefAttributes<HTMLElement>>;
declare const CommentSheetHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CommentSheetHandle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLSpanElement> & React.RefAttributes<HTMLSpanElement>>;
interface CommentCardProps extends React.HTMLAttributes<HTMLDivElement> {
    state?: CommentSurfaceState;
    tone?: 'principal' | 'agent';
    quotedText?: React.ReactNode;
    identity?: React.ReactNode;
    actions?: React.ReactNode;
}
declare const CommentCard: React.ForwardRefExoticComponent<CommentCardProps & React.RefAttributes<HTMLDivElement>>;
declare const CommentQuote: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CommentIdentity: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CommentActions: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
interface CommentNoticeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'info' | 'success' | 'warning' | 'danger';
    live?: 'polite' | 'assertive' | 'off';
}
declare const CommentNotice: React.ForwardRefExoticComponent<CommentNoticeProps & React.RefAttributes<HTMLDivElement>>;

declare function cn(...inputs: ClassValue[]): string;

export { Button, type ButtonProps, Checkbox, type CheckboxProps, CommentActions, CommentCard, type CommentCardProps, CommentIdentity, CommentNotice, type CommentNoticeProps, CommentQuote, CommentSheet, CommentSheetHandle, CommentSheetHeader, type CommentSheetProps, type CommentSurfaceState, ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger, Dialog, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogTitle, FormField, GroupedSelect, type GroupedSelectProps, Input, type InputProps, Label, Separator, Spinner, Textarea, type TextareaProps, ThreeSlotBar, type ThreeSlotBarProps, Toaster, cn, createToaster };
