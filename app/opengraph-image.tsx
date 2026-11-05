import { ogImage, ogSize } from "@/lib/og";
import { site } from "@/lib/site";

export const size = ogSize;
export const contentType = "image/png";
export const alt = `${site.name}, ${site.role}`;

export default function Image() {
  return ogImage(site.role, site.name, site.stack);
}
