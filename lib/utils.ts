import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTagColor(category: string): string {
  const map: Record<string, string> = {
    backend: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    frontend: "bg-purple-500/10 text-purple-300 border-purple-500/20",
    mobile: "bg-orange-500/10 text-orange-300 border-orange-500/20",
    infra: "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",
    ai: "bg-accent/10 text-accent border-accent/20",
    data: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
  };
  return map[category] ?? "bg-white/5 text-text-muted border-white/10";
}
