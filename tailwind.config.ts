import type { Config } from "tailwindcss";

// Colors are CSS variables (RGB channels) so one class works in both themes; values live in app/globals.css.
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: v("bg"), surface: v("surface"), elevated: v("elevated") },
        fg: v("fg"),
        accent: { DEFAULT: v("accent"), 2: v("accent-2"), ink: v("accent-ink") },
        text: { primary: v("text"), muted: v("muted"), subtle: v("subtle") },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem,8vw,6.5rem)", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(2.25rem,5vw,4.5rem)", { lineHeight: "1.0", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(1.75rem,3.5vw,3rem)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        "display-sm": ["clamp(1.25rem,2.5vw,1.75rem)", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
      },
      spacing: { section: "clamp(5rem, 11vw, 9rem)" },
      maxWidth: { container: "1200px" },
      borderRadius: { card: "16px" },
    },
  },
  plugins: [],
};

export default config;
