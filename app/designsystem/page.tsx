"use client";

import React from "react";
import Button from "@/components/Button";
import { ArrowRight, Plus, Heart, ChevronRight, Settings, Info } from "lucide-react";

const SHADES = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"];

const CATEGORIES = [
  { id: "primary", title: "Primary", description: "The core brand identity scale. Used for main action components, focus states, and essential brand presence." },
  { id: "neutral", title: "Neutral", description: "A highly versatile grayscale for text, borders, shadows, and architectural layout foundations." },
  { id: "success", title: "Success", description: "System indicators for positive feedback, successful completions, and verified states." },
  { id: "error", title: "Error", description: "Semantic markers for destructive actions, validation failures, and critical system alerts." },
  { id: "warning", title: "Warning", description: "Cuationary palettes for non-blocking alerts, intermediate states, and attention-required areas." },
  { id: "info", title: "Info", description: "Informative highlights, promotional content, and system announcements." },
] as const;

const TypographyRow = ({ label, size, level }: { label: string; size: string; level: string }) => {
  const weights = [
    { name: "Regular", weight: "400", var: "var(--font-weight-regular)" },
    { name: "Medium", weight: "500", var: "var(--font-weight-medium)" },
    { name: "Semibold", weight: "600", var: "var(--font-weight-semibold)" },
    { name: "Bold", weight: "700", var: "var(--font-weight-bold)" },
  ];

  return (
    <div className="flex flex-col gap-6 py-12 border-b border-neutral-100 dark:border-neutral-900 last:border-0">
      <div className="flex items-baseline justify-between">
        <div className="flex flex-col">
          <span
            style={{ color: `var(--primary-600)`, fontWeight: `var(--font-weight-bold)` }}
            className="text-sm uppercase tracking-widest"
          >
            {label}
          </span>
          <span
            style={{ color: `var(--neutral-400)`, fontWeight: `var(--font-weight-medium)` }}
            className="text-xs"
          >
            Size: {size}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        {weights.map((w) => (
          <div key={w.name} className="flex flex-col gap-2">
            <span
              style={{ color: `var(--neutral-300)`, fontWeight: `var(--font-weight-bold)` }}
              className="text-[10px] uppercase tracking-widest dark:!text-[var(--neutral-700)]"
            >
              {w.name} ({w.weight})
            </span>
            <p
              style={{ 
                fontSize: `var(--font-size-${level})`, 
                fontWeight: w.var,
                color: `var(--neutral-900)` 
              }}
              className="leading-tight dark:!text-[var(--foreground)]"
            >
              Design is the silent ambassador of your brand.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const TypographySection = () => {
  const levels = ["h1", "h2", "h3", "h4", "h5", "h6", "b1", "b2", "b3", "b4"] as const;

  return (
    <section className="flex flex-col">
      <div className="flex flex-col gap-2">
        <h2
          style={{ color: `var(--neutral-900)`, fontWeight: `var(--font-weight-bold)` }}
          className="text-4xl tracking-tighter"
        >
          Typography
        </h2>
        <p
          style={{ color: `var(--neutral-500)` }}
          className="text-lg max-w-xl dark:!text-[var(--neutral-600)]"
        >
          A structured typographic system built for readability, hierarchy, and visual balance across all screen sizes.
        </p>
      </div>
      <div className="flex flex-col mt-10">
        {levels.map((id) => (
          <TypographyRow
            key={id}
            label={id.startsWith("h") ? `Heading ${id.slice(1)}` : `Body ${id.slice(1)}`}
            size={id === "h1" ? "64px" : id === "h2" ? "56px" : id === "h3" ? "38px" : id === "h4" ? "28px" : id === "h5" ? "24px" : id === "h6" ? "20px" : id === "b1" ? "18px" : id === "b2" ? "16px" : id === "b3" ? "14px" : "12px"}
            level={id}
          />
        ))}
      </div>
    </section>
  );
};

const ButtonSection = () => {
  return (
    <section className="flex flex-col gap-12 py-20 border-t border-neutral-100 dark:border-neutral-900">
      <div className="flex flex-col gap-2">
        <h2
          style={{ color: `var(--neutral-900)`, fontWeight: `var(--font-weight-bold)` }}
          className="text-4xl tracking-tighter"
        >
          Buttons
        </h2>
        <p
          style={{ color: `var(--neutral-500)` }}
          className="text-lg max-w-xl dark:!text-[var(--neutral-600)]"
        >
          Essential interactive elements with support for multiple variants, states, and icon placements.
        </p>
      </div>

      <div className="flex flex-col gap-16">
        {/* Variants */}
        <div className="flex flex-col gap-6">
          <h3 style={{ color: `var(--neutral-900)`, fontWeight: `var(--font-weight-semibold)` }} className="text-xl">Variants</h3>
          <div className="flex flex-wrap items-center gap-6">
            <Button variant="primary">Primary Button</Button>
            <Button variant="line">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="link">Link Button</Button>
          </div>
        </div>

        {/* Sizes */}
        <div className="flex flex-col gap-6">
          <h3 style={{ color: `var(--neutral-900)`, fontWeight: `var(--font-weight-semibold)` }} className="text-xl">Sizes</h3>
          <div className="flex flex-wrap items-center gap-8">
            <div className="flex flex-col gap-3 items-center">
              <Button size="sm">Small</Button>
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">SM</span>
            </div>
            <div className="flex flex-col gap-3 items-center">
              <Button size="md">Medium</Button>
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">MD</span>
            </div>
            <div className="flex flex-col gap-3 items-center">
              <Button size="lg">Large</Button>
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">LG</span>
            </div>
          </div>
        </div>

        {/* Icons */}
        <div className="flex flex-col gap-6">
          <h3 style={{ color: `var(--neutral-900)`, fontWeight: `var(--font-weight-semibold)` }} className="text-xl">Icon Positions</h3>
          <div className="flex flex-wrap items-center gap-6">
            <Button leftIcon={Plus}>Left Icon</Button>
            <Button rightIcon={ArrowRight}>Right Icon</Button>
            <Button leftIcon={Plus} rightIcon={ChevronRight}>Dual Icons</Button>
          </div>
        </div>

        {/* Icon Only */}
        <div className="flex flex-col gap-6">
          <h3 style={{ color: `var(--neutral-900)`, fontWeight: `var(--font-weight-semibold)` }} className="text-xl">Icon Only</h3>
          <div className="flex flex-wrap items-center gap-6">
            <Button iconOnly variant="primary" leftIcon={Plus} />
            <Button iconOnly variant="line" leftIcon={Settings} />
            <Button iconOnly variant="ghost" leftIcon={Heart} />
          </div>
        </div>

        {/* States */}
        <div className="flex flex-col gap-6">
          <h3 style={{ color: `var(--neutral-900)`, fontWeight: `var(--font-weight-semibold)` }} className="text-xl">States</h3>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex flex-col gap-3 items-center">
              <Button>Default</Button>
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Default</span>
            </div>
            <div className="flex flex-col gap-3 items-center">
              <Button className="brightness-110 shadow-lg">Hover</Button>
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Hover</span>
            </div>
            <div className="flex flex-col gap-3 items-center">
              <Button className="scale-95 opacity-90">Active</Button>
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Click</span>
            </div>
            <div className="flex flex-col gap-3 items-center">
              <Button disabled>Disabled</Button>
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Disabled</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ColorShade = ({ category, shade }: { category: string; shade: string }) => {
  const cssVar = `--${category}-${shade}`;
  return (
    <div className="flex flex-col items-center gap-4 group">
      <div
        style={{ backgroundColor: `var(${cssVar})` }}
        className="h-20 w-20 rounded-full shadow-lg border border-neutral-200 dark:border-neutral-800 transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl"
      ></div>
      <div className="flex flex-col items-center">
        <span
          style={{ color: `var(--neutral-800)`, fontWeight: `var(--font-weight-bold)` }}
          className="text-[13px] tracking-tight"
        >
          {shade}
        </span>
        <span
          style={{ color: `var(--neutral-400)`, fontWeight: `var(--font-weight-medium)` }}
          className="text-[10px] uppercase"
        >
          {cssVar}
        </span>
      </div>
    </div>
  );
};

const ColorSection = ({ title, category, description }: { title: string; category: string; description: string }) => (
  <section className="flex flex-col gap-10 py-16 border-b border-neutral-100 dark:border-neutral-200 last:border-0">
    <div className="flex flex-col gap-2">
      <h2
        style={{ color: `var(--neutral-900)`, fontWeight: `var(--font-weight-bold)` }}
        className="text-3xl tracking-tighter capitalize"
      >
        {title}
      </h2>
      <p
        style={{ color: `var(--neutral-500)` }}
        className="text-base max-w-xl dark:!text-[var(--neutral-600)]"
      >
        {description}
      </p>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-8">
      {SHADES.map((shade) => (
        <ColorShade key={shade} category={category} shade={shade} />
      ))}
    </div>
  </section>
);

export default function DesignSystemPage() {
  return (
    <div 
      style={{ backgroundColor: `var(--background)`, color: `var(--foreground)` }}
      className="min-h-screen font-sans selection:bg-primary-100 dark:selection:bg-primary-900/30"
    >
      <main className="max-w-7xl mx-auto px-8 py-20 md:py-32 flex flex-col gap-20">
        {/* Hero */}
        <header className="flex flex-col gap-8 max-w-4xl">
          <h1
            style={{ color: `var(--neutral-900)`, fontSize: `var(--font-size-h1)`, fontWeight: `var(--font-weight-bold)` }}
            className="tracking-[-0.06em] leading-none"
          >
            Fluid <span style={{ color: `var(--primary-600)` }}>Color</span> Shards.
          </h1>
          <p
            style={{ color: `var(--neutral-500)` }}
            className="text-xl md:text-xl leading-relaxed font-medium dark:!text-[var(--neutral-600)]"
          >
            A comprehensive foundation of 60 semantic color shards, optimized for high-fidelity interfaces and perfect accessibility in all light environments.
          </p>
        </header>

        {/* Colors Section */}
        <div className="flex flex-col">
          {CATEGORIES.map((cat) => (
            <ColorSection
              key={cat.id}
              category={cat.id}
              title={cat.title}
              description={cat.description}
            />
          ))}
        </div>

        {/* Typography Section */}
        <TypographySection />

        {/* Button Section */}
        <ButtonSection />

        <footer className="py-24 border-t border-neutral-100 dark:border-neutral-900 text-center">
          <p
            style={{ color: `var(--neutral-400)` }}
            className="text-sm font-medium tracking-tight dark:!text-[var(--neutral-500)]"
          >
            &copy; 2026 Color Scale Framework. Built by Antigravity Core.
          </p>
        </footer>
      </main>
    </div>
  );
}
