import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0A0A0C",
          surface: "#111115",
          elevated: "#1A1A1F",
          border: "rgba(255,255,255,0.07)",
        },
        accent: {
          DEFAULT: "#00F260",
          dim: "rgba(0,242,96,0.15)",
          glow: "rgba(0,242,96,0.35)",
        },
        text: {
          primary: "#FAFAFA",
          muted: "#8A8A93",
          subtle: "#4A4A55",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "JetBrains Mono", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem,8vw,7rem)", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(2.25rem,5vw,4.5rem)", { lineHeight: "1.0", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(1.75rem,3.5vw,3rem)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        "display-sm": ["clamp(1.25rem,2.5vw,1.75rem)", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
      },
      spacing: {
        section: "clamp(5rem, 12vw, 10rem)",
      },
      maxWidth: {
        container: "1200px",
      },
      borderRadius: {
        card: "16px",
        tag: "6px",
      },
      boxShadow: {
        card: "0 0 0 1px rgba(255,255,255,0.07), 0 4px 32px rgba(0,0,0,0.4)",
        "card-hover": "0 0 0 1px rgba(0,242,96,0.25), 0 8px 48px rgba(0,0,0,0.6)",
        "accent-glow": "0 0 24px rgba(0,242,96,0.25)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in": "fadeIn 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "grid-drift": "gridDrift 20s linear infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        gridDrift: {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-80px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(ellipse at center, var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
