"use client";

import React from "react";
import { LucideIcon, AlertCircle } from "lucide-react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  error?: string | boolean;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  onRightIconClick?: () => void;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      required,
      error,
      className = "",
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      onRightIconClick,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const isError = !!error;
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

    // Container styles
    const containerClasses = "flex flex-col w-full";
    const labelClasses = "flex items-center text-sm font-semibold mb-[12px] text-neutral-800";

    // Field box styles
    const fieldBaseStyles = "relative flex items-center w-full transition-all duration-200 border";

    const stateStyles = disabled
      ? "bg-neutral-50 border-neutral-200 opacity-50 cursor-not-allowed"
      : isError
        ? "bg-[var(--background)] border-error-500 focus-within:ring-4 focus-within:ring-error-500/10"
        : "bg-[var(--background)] border-neutral-200 hover:border-neutral-400 focus-within:border-primary-500 focus-within:ring-4 focus-within:ring-primary-500/10";

    const inputStyles = "w-full bg-transparent border-none outline-none py-3 text-sm font-medium placeholder:text-neutral-400 text-neutral-900 disabled:cursor-not-allowed";

    const paddingLeft = LeftIcon ? "pl-11" : "pl-4";
    const paddingRight = (RightIcon || isError) ? "pr-11" : "pr-4";

    return (
      <div className={containerClasses}>
        <label htmlFor={inputId} className={labelClasses}>
          {label}
          {required && <span className="ml-1 text-error-500 select-none">*</span>}
        </label>

        <div
          className={`${fieldBaseStyles} ${stateStyles} ${className}`}
          style={{ borderRadius: "40px" }}
        >
          {/* Left Icon */}
          {LeftIcon && (
            <div className="absolute left-4 text-neutral-400 pointer-events-none">
              <LeftIcon size={20} strokeWidth={2.5} />
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            className={`${inputStyles} ${paddingLeft} ${paddingRight}`}
            {...props}
          />

          {/* Right Icon / Error Icon */}
          <div className="absolute right-4 flex items-center gap-2">
            {isError && !RightIcon && (
              <AlertCircle size={20} className="text-error-500" strokeWidth={2.5} />
            )}
            {RightIcon && (
              <div
                className={`text-neutral-400 ${onRightIconClick ? "cursor-pointer hover:text-primary-500 transition-colors" : "pointer-events-none"}`}
                onClick={onRightIconClick}
              >
                <RightIcon size={20} strokeWidth={2.5} />
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {typeof error === "string" && (
          <span className="mt-2 text-xs font-semibold text-error-600">
            {error}
          </span>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
