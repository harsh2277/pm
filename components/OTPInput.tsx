"use client";

import React, { useState, useRef, useEffect } from "react";

interface OTPInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
  disabled?: boolean;
  error?: string | boolean;
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 6, onComplete, disabled = false, error }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Initialize focus on first input if not disabled
    if (!disabled && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [disabled]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    // Take only the last character if more than one is typed (shouldn't happen with maxLength=1 but good for safety)
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // If typing a value, move to next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Trigger onComplete if all fields are filled
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length && onComplete) {
      onComplete(combinedOtp);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const data = e.clipboardData.getData("text").slice(0, length);
    if (!/^\d+$/.test(data)) return;

    const newOtp = [...otp];
    for (let i = 0; i < data.length; i++) {
      newOtp[i] = data[i];
    }
    setOtp(newOtp);

    // Focus last or next empty
    const nextIndex = Math.min(data.length, length - 1);
    inputRefs.current[nextIndex]?.focus();

    if (data.length === length && onComplete) {
      onComplete(data);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            disabled={disabled}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className={`
              w-16 h-16 text-center text-xl font-bold transition-all duration-200 border-2
              ${disabled ? "bg-neutral-50 border-neutral-200 opacity-50 cursor-not-allowed text-neutral-900" :
                error ? "border-error-500 bg-error-50 text-error-600 focus:ring-error-500/10" :
                digit ? "border-primary-500 bg-primary-50 text-primary-600" :
                "border-neutral-200 bg-[var(--background)] text-neutral-900 hover:border-neutral-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"}
              outline-none
            `}
            style={{ borderRadius: "40px" }}
          />
        ))}
      </div>
      {typeof error === "string" && (
        <span className="text-sm font-medium text-error-500 ml-1">
          {error}
        </span>
      )}
    </div>
  );
};

export default OTPInput;
