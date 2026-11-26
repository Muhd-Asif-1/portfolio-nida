# Editing highlights and stories

Edit the `highlights` array in `src/lib/highlights.tsx`. Reorder entries to reorder the circles. Each highlight needs a unique `id`, a `title`, a `cover`, and at least one entry in `stories`.

Each story has its own unique `id` within its highlight, a `title`, a `background`, and a `texts` array. Each text becomes a paragraph; `\n` adds a line break. Optional `textAlign` is `"left"` or `"center"` (default). Optional `textColor` accepts a CSS color. Keep text readable against the background; the viewer also adds a dark overlay.

Both covers and story backgrounds accept these formats:

```tsx
// Image: put files in public/stories/, then use a root-relative path.
{ type: "image", src: "/stories/photo.jpg", alt: "Describe the photo", position: "center top" }

// CSS: plain colors, gradients, patterns, etc.
{ type: "css", style: { background: "linear-gradient(145deg, #4a5df9, #14171a)" } }

// Code: JSX or your own component; fill the available space with size-full.
{ type: "custom", content: <div className="size-full bg-indigo-900" /> }
```

Custom backgrounds are decorative and should not contain interactive controls. Keep readable story content in `title` and `texts`. The initial entries use existing portfolio content and local artwork; replace or extend them here.

Stories advance every eight seconds. Use Pause to read at your own pace, the progress segments to select a story within a highlight, or the arrows to move across stories and highlights. Escape closes the viewer. Reduced-motion users start with autoplay paused. Playback also pauses while the browser tab is hidden.
