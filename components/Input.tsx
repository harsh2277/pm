"use client";

import React from "react";
import { LucideIcon, Search } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  onRightIconClick?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", leftIcon, rightIcon: RightIcon, onRightIconClick, disabled, ...props }, ref) => {
    const LeftIcon = leftIcon || Search;

    // Base styles for the container
    const containerBaseStyles = "relative flex items-center w-full transition-all duration-200 border";

    // State styles for the container
    const stateStyles = disabled
      ? "bg-neutral-50 border-neutral-200 opacity-50 cursor-not-allowed"
      : "bg-[var(--background)] border-neutral-200 hover:border-neutral-400 focus-within:border-primary-500 focus-within:ring-4 focus-within:ring-primary-500/10";

    // Text entry styles
    const inputStyles = "w-full bg-transparent border-none outline-none py-3 text-sm font-medium placeholder:text-neutral-400 text-neutral-900 disabled:cursor-not-allowed";

    // Padding based on icons
    const hasLeftIcon = !!LeftIcon;
    const paddingLeft = hasLeftIcon ? "pl-11" : "pl-4";
    const paddingRight = RightIcon ? "pr-11" : "pr-4";

    return (
      <div
        className={`${containerBaseStyles} ${stateStyles} ${className}`}
        style={{ borderRadius: "40px" }}
      >
        {/* Left Icon Overlay */}
        {LeftIcon && (
          <div className="absolute left-4 text-neutral-400 pointer-events-none">
            <LeftIcon size={20} strokeWidth={2.5} />
          </div>
        )}

        <input
          ref={ref}
          disabled={disabled}
          className={`${inputStyles} ${paddingLeft} ${paddingRight}`}
          {...props}
        />

        {/* Right Icon Overlay */}
        {RightIcon && (
          <div
            className={`absolute right-4 text-neutral-400 ${onRightIconClick ? "cursor-pointer hover:text-primary-500 transition-colors" : "pointer-events-none"}`}
            onClick={onRightIconClick}
          >
            <RightIcon size={20} strokeWidth={2.5} />
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
