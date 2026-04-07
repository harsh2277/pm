"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";

interface CountryCode {
  code: string;
  dialCode: string;
  name: string;
  flag: string;
}

const COUNTRIES: CountryCode[] = [
  { code: "US", dialCode: "+1", name: "United States", flag: "🇺🇸" },
  { code: "GB", dialCode: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "IN", dialCode: "+91", name: "India", flag: "🇮🇳" },
  { code: "CA", dialCode: "+1", name: "Canada", flag: "🇨🇦" },
  { code: "AU", dialCode: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "DE", dialCode: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "FR", dialCode: "+33", name: "France", flag: "🇫🇷" },
  { code: "JP", dialCode: "+81", name: "Japan", flag: "🇯🇵" },
  { code: "CN", dialCode: "+86", name: "China", flag: "🇨🇳" },
  { code: "BR", dialCode: "+55", name: "Brazil", flag: "🇧🇷" },
];

interface PhoneInputProps {
  label?: string;
  required?: boolean;
  error?: string | boolean;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  label,
  required,
  error,
  disabled = false,
  value = "",
  onChange,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[2]); // Default to India (+91)
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isError = !!error;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.dialCode.includes(searchQuery)
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
          relative flex items-center transition-all duration-200 border
          ${disabled ? "bg-neutral-50 dark:bg-neutral-900 border-neutral-100 dark:border-neutral-800 opacity-50 cursor-not-allowed" :
            isError ? "bg-white dark:bg-neutral-900 border-error-500 focus-within:ring-4 focus-within:ring-error-500/10" :
              "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 focus-within:border-primary-500 focus-within:ring-4 focus-within:ring-primary-500/10"}
        `}
        style={{ borderRadius: "40px" }}
      >
        {/* Country Selector */}
        <div ref={dropdownRef} className="relative h-full">
          <button
            type="button"
            disabled={disabled}
            onClick={() => setIsOpen(!isOpen)}
            className={`
              flex items-center gap-2 pl-6 pr-4 h-full border-r border-neutral-100 dark:border-neutral-800
              hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors
              disabled:cursor-not-allowed disabled:hover:bg-transparent
            `}
            style={{ borderTopLeftRadius: "40px", borderBottomLeftRadius: "40px" }}
          >
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {selectedCountry.dialCode}
            </span>
            <ChevronDown
              size={14}
              className={`text-neutral-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="p-3 border-b border-neutral-50 dark:border-neutral-800">
                <div className="relative flex items-center">
                  <Search size={14} className="absolute left-3 text-neutral-400" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search country or code..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 border-none rounded-xl outline-none"
                  />
                </div>
              </div>
              <div className="max-h-64 overflow-y-auto pt-2 pb-2 custom-scrollbar">
                {filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    className={`
                      w-full flex items-center gap-3 px-4 py-2.5 transition-colors
                      ${selectedCountry.code === country.code ? "bg-primary-50 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400" : "hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"}
                    `}
                    onClick={() => {
                      setSelectedCountry(country);
                      setIsOpen(false);
                      setSearchQuery("");
                    }}
                  >
                    <span className="text-xl">{country.flag}</span>
                    <span className="text-[13px] font-medium flex-1 text-left">{country.name}</span>
                    <span className="text-[12px] opacity-60 font-mono">{country.dialCode}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Number Input */}
        <input
          type="tel"
          disabled={disabled}
          placeholder="00000 00000"
          value={value}
          onChange={(e) => onChange?.(e.target.value.replace(/[^\d\s-]/g, ""))}
          className="flex-1 bg-transparent border-none outline-none py-3.5 px-6 text-sm font-medium text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400"
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

export default PhoneInput;
