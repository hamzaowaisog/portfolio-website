import { ImageResponse } from "next/og";
import { site } from "./site";

export const ogSize = { width: 1200, height: 630 };

// Shared Open Graph card: big title, small eyebrow and footer line.
export function ogImage(eyebrow: string, title: string, footer: string) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "linear-gradient(135deg, #070b14 0%, #0c1220 60%, #1a1430 100%)", color: "#f1f5f9" }}>
        <div style={{ display: "flex", fontSize: 26, color: "#22d3ee", letterSpacing: 4, textTransform: "uppercase" }}>{eyebrow}</div>
        <div style={{ display: "flex", fontSize: title.length > 40 ? 64 : 84, fontWeight: 700, lineHeight: 1.05, maxWidth: 1000 }}>{title}</div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#94a3b8" }}>
          <span>{footer}</span>
          <span>{site.name}</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
