"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { CheckIcon, DotFilledIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"

/**
 * Full-width dropdown menu
 * - Panel spans the viewport width (w-screen)
 * - Collisions disabled (no auto-shrink)
 * - No auto-focus on open (no pre-highlight)
 * - Single-row highlight via data-[highlighted] (background + ring only)
 *
 * Extras:
 * - DropdownMenuItem now supports `fallbackText`:
 *   If children are empty/whitespace, it renders the fallback label instead.
 */

function DropdownMenu(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Root>
) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuTrigger(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>
) {
  return <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

function DropdownMenuContent({
  className,
  sideOffset = 0,
  onOpenAutoFocus,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        avoidCollisions={false}
        side="bottom"
        align="center"
        sideOffset={sideOffset}
        onOpenAutoFocus={(e) => {
          // prevent first-item auto focus → nothing looks selected until hover
          e.preventDefault()
          onOpenAutoFocus?.(e)
        }}
        className={cn(
          "z-50 w-screen max-w-none overflow-hidden",
          "rounded-lg border border-neutral-200 bg-white p-1 text-neutral-900 shadow-lg",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

type DropdownMenuItemProps =
  React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
    /** If the item has no visible children, this text will be rendered instead. */
    fallbackText?: string
  }

/** Determine if children render something visible (non-empty string / at least one node). */
function hasVisibleChildren(children: React.ReactNode) {
  const count = React.Children.count(children)
  if (count === 0) return false
  if (count === 1 && typeof children === "string") {
    return children.trim().length > 0
  }
  return true
}

function DropdownMenuItem({
  className,
  inset,
  fallbackText,
  children,
  ...props
}: DropdownMenuItemProps) {
  const content =
    hasVisibleChildren(children) ? (
      children
    ) : (
      <span aria-hidden={false}>{fallbackText ?? "Submit Quote"}</span>
    )

  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      className={cn(
        "relative flex cursor-default select-none items-center rounded-md px-3 py-3 text-base outline-none transition-colors",
        // Only background + ring on highlight; avoid forcing a light text color
        "data-[highlighted]:bg-brand-50 data-[highlighted]:ring-2 data-[highlighted]:ring-brand-300 data-[highlighted]:ring-offset-0",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-8",
        className
      )}
      // Use aria-label to preserve accessibility even if original children were empty.
      aria-label={
        hasVisibleChildren(children) ? undefined : (fallbackText ?? "Submit Quote")
      }
      {...props}
    >
      {content}
    </DropdownMenuPrimitive.Item>
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "relative flex cursor-default select-none items-center rounded-md py-3 pl-8 pr-3 text-base outline-none transition-colors",
        "data-[highlighted]:bg-brand-50 data-[highlighted]:ring-2 data-[highlighted]:ring-brand-300 data-[highlighted]:ring-offset-0",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="h-4 w-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "relative flex cursor-default select-none items-center rounded-md py-3 pl-8 pr-3 text-base outline-none transition-colors",
        "data-[highlighted]:bg-brand-50 data-[highlighted]:ring-2 data-[highlighted]:ring-brand-300 data-[highlighted]:ring-offset-0",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <DotFilledIcon className="h-4 w-4 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      className={cn("px-3 py-2 text-sm font-semibold", inset && "pl-8", className)}
      {...props}
    />
  )
}

function DropdownMenuSeparator(
  { className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>
) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("my-2 h-px bg-neutral-200", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
}
