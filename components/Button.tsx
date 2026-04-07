"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

type ButtonVariant = "primary" | "line" | "link" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  iconOnly?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      iconOnly = false,
      disabled,
      children,
      style,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = "inline-flex items-center justify-center transition-all duration-200 font-semibold cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 active:scale-95";
    
    // Size styles
    const sizeStyles = {
      sm: iconOnly ? "p-2 text-xs" : "px-4 py-2 text-xs gap-2",
      md: iconOnly ? "p-3 text-sm" : "px-6 py-3 text-sm gap-2.5",
      lg: iconOnly ? "p-4 text-base" : "px-8 py-4 text-base gap-3",
    };

    // Variant styles
    const variantStyles = {
      primary: {
        background: "linear-gradient(180deg, var(--primary-400) 0%, var(--primary-600) 100%)",
        color: "white",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
      },
      line: {
        background: "transparent",
        color: "var(--primary-600)",
        border: "1px solid var(--primary-600)",
      },
      link: {
        background: "transparent",
        color: "var(--primary-600)",
        border: "none",
        padding: "0",
        boxShadow: "none",
        textDecoration: "underline-offset-4 hover:underline",
      },
      ghost: {
        background: "transparent",
        color: "var(--neutral-600)",
        border: "none",
      },
    };

    // Hover effect simulation for non-native CSS properties
    const hoverStyles = variant === "primary" ? "hover:brightness-110 hover:shadow-lg" : "";
    const ghostHover = variant === "ghost" ? "hover:bg-neutral-100 dark:hover:bg-neutral-800" : "";
    const lineHover = variant === "line" ? "hover:bg-primary-50 dark:hover:bg-primary-900/10" : "";

    const combinedStyle = {
      borderRadius: "40px",
      ...variantStyles[variant],
      ...style,
    };

    const iconSize = {
      sm: 14,
      md: 18,
      lg: 20,
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`${baseStyles} ${sizeStyles[size]} ${hoverStyles} ${ghostHover} ${lineHover} ${className}`}
        style={combinedStyle}
        {...props}
      >
        {LeftIcon && <LeftIcon size={iconSize[size]} strokeWidth={2.5} />}
        {!iconOnly && children}
        {RightIcon && <RightIcon size={iconSize[size]} strokeWidth={2.5} />}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
