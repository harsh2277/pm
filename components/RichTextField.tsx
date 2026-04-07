"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Type, 
  Link as LinkIcon, 
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Eraser
} from "lucide-react";

interface RichTextFieldProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string | boolean;
  disabled?: boolean;
  initialValue?: string;
  onChange?: (html: string) => void;
  className?: string;
}

const RichTextField: React.FC<RichTextFieldProps> = ({
  label,
  placeholder = "Write something amazing...",
  required,
  error,
  disabled = false,
  initialValue = "",
  onChange,
  className = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const isError = !!error;

  useEffect(() => {
    if (editorRef.current && initialValue && editorRef.current.innerHTML !== initialValue) {
      editorRef.current.innerHTML = initialValue;
    }
  }, []); // Only on mount

  const execCommand = (command: string, value?: string) => {
    if (disabled) return;
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const handleInput = () => {
    if (onChange && editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  const ToolbarButton = ({ 
    icon: Icon, 
    command, 
    value, 
    label 
  }: { 
    icon: any, 
    command: string, 
    value?: string,
    label: string 
  }) => (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault(); // Prevent losing focus from editor
        execCommand(command, value);
      }}
      disabled={disabled}
      className={`
        p-2 rounded-lg transition-all duration-200
        ${disabled ? "opacity-30 cursor-not-allowed" : "hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400"}
      `}
      title={label}
    >
      <Icon size={18} strokeWidth={2.5} />
    </button>
  );

  return (
    <div className={`flex flex-col w-full gap-[12px] ${className}`}>
      {label && (
        <label className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
          {label}
          {required && <span className="ml-1 text-error-500">*</span>}
        </label>
      )}

      <div
        className={`
          flex flex-col transition-all duration-200 border
          ${disabled ? "bg-neutral-50 dark:bg-neutral-900 border-neutral-100 dark:border-neutral-800 opacity-50 cursor-not-allowed" :
            isError ? "bg-white dark:bg-neutral-900 border-error-500 focus-within:ring-4 focus-within:ring-error-500/10" :
            isFocused ? "bg-white dark:bg-neutral-900 border-primary-500 ring-4 ring-primary-500/10" :
            "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600"}
        `}
        style={{ borderRadius: "24px" }}
      >
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 p-2 border-b border-neutral-100 dark:border-neutral-800">
          <ToolbarButton icon={Bold} command="bold" label="Bold" />
          <ToolbarButton icon={Italic} command="italic" label="Italic" />
          <ToolbarButton icon={Underline} command="underline" label="Underline" />
          <div className="w-px h-6 bg-neutral-100 dark:bg-neutral-800 mx-1" />
          <ToolbarButton icon={List} command="insertUnorderedList" label="Bullet List" />
          <ToolbarButton icon={ListOrdered} command="insertOrderedList" label="Numbered List" />
          <div className="w-px h-6 bg-neutral-100 dark:bg-neutral-800 mx-1" />
          <ToolbarButton icon={AlignLeft} command="justifyLeft" label="Align Left" />
          <ToolbarButton icon={AlignCenter} command="justifyCenter" label="Align Center" />
          <ToolbarButton icon={AlignRight} command="justifyRight" label="Align Right" />
          <div className="w-px h-6 bg-neutral-100 dark:bg-neutral-800 mx-1" />
          <ToolbarButton icon={Code} command="formatBlock" value="pre" label="Code Block" />
          <ToolbarButton icon={Eraser} command="removeFormat" label="Clear Formatting" />
        </div>

        {/* Editor Area */}
        <div
          ref={editorRef}
          contentEditable={!disabled}
          onInput={handleInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onPaste={handlePaste}
          className={`
            min-h-[200px] p-6 outline-none text-base leading-relaxed text-neutral-800 dark:text-neutral-200
            prose dark:prose-invert max-w-none
            before:content-[attr(data-placeholder)] before:text-neutral-400 before:pointer-events-none before:absolute
            ${!initialValue && !isFocused ? "before:block" : "before:hidden"}
          `}
          data-placeholder={placeholder}
        />
      </div>

      {typeof error === "string" && (
        <span className="text-xs font-semibold text-error-500 ml-1">
          {error}
        </span>
      )}
    </div>
  );
};

export default RichTextField;
