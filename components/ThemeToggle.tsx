"use client";

import { Moon, Sun } from "lucide-react";

export function toggleTheme() {
  const root = document.documentElement;
  const next = root.dataset.theme === "light" ? "dark" : "light";
  if (next === "light") root.dataset.theme = "light";
  else delete root.dataset.theme;
  try {
    localStorage.setItem("theme", next);
  } catch {}
}

// Both icons render; CSS picks one, so server and client markup always match.
export default function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle light and dark theme"
      className="rounded-full p-2 text-text-muted transition-colors hover:bg-fg/5 hover:text-text-primary"
    >
      <Sun size={17} className="hidden [[data-theme=light]_&]:block" />
      <Moon size={17} className="block [[data-theme=light]_&]:hidden" />
    </button>
  );
}
