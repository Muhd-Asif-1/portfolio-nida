import Image from "next/image";
import type { HighlightBackground as Background } from "@/lib/highlights";

export function HighlightBackground({
  background,
  sizes,
}: {
  background: Background;
  sizes: string;
}) {
  if (background.type === "image") {
    return (
      <Image
        src={background.src}
        alt={background.alt}
        fill
        sizes={sizes}
        className="object-cover"
        style={{ objectPosition: background.position }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden"
      style={background.type === "css" ? background.style : undefined}
    >
      {background.type === "custom" ? background.content : null}
    </div>
  );
}
