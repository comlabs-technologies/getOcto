"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type PressableProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "orange" | "ink" | "paper" | "outline";
  size?: "md" | "sm";
};

/**
 * The project's button. Always renders a real <button>, and carries the shared
 * `.btn` treatment whose CSS `:active` rule supplies press feedback — no
 * JavaScript is involved in the interaction, so it stays responsive under load.
 */
export function Pressable({
  children,
  variant = "outline",
  size = "md",
  className,
  type = "button",
  ...rest
}: PressableProps) {
  const classes = [
    "btn",
    `btn-${variant}`,
    size === "sm" ? "btn-sm" : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
