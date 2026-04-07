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
    const baseStyles = "inline-flex items-center justify-center transition-all duration-200 font-semibold cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none active:scale-95 rounded-[40px]";
    
    // Size styles
    const sizeStyles = {
      sm: iconOnly ? "p-2 text-xs" : variant === "link" ? "text-xs gap-2" : "px-4 py-2 text-xs gap-2",
      md: iconOnly ? "p-3 text-base" : variant === "link" ? "text-base gap-2.5" : "px-6 py-3 text-base gap-2.5",
      lg: iconOnly ? "p-4 text-lg" : variant === "link" ? "text-lg gap-3" : "px-8 py-4 text-lg gap-3",
    };

    // Variant classes
    const variantClasses = {
      primary: "bg-gradient-to-b from-primary-400 to-primary-600 text-white border border-white/30 shadow-[0_4px_12px_rgba(37,99,235,0.2)] hover:brightness-110 hover:shadow-lg",
      line: "bg-transparent text-primary-600 border border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/10",
      ghost: "bg-transparent text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800",
      link: "bg-transparent text-primary-600 p-0 shadow-none underline-offset-4 hover:underline",
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
        className={`${baseStyles} ${sizeStyles[size]} ${variantClasses[variant]} ${className}`}
        style={style}
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
