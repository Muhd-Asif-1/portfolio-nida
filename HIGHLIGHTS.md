# Editing highlights and stories

Edit the `highlights` array in `src/lib/highlights.tsx`. Reorder entries to reorder the circles. Each highlight needs a unique `id`, a `title`, a `cover`, and at least one entry in `stories`.

Each story has its own unique `id` within its highlight, a `title`, a `background`, and a `texts` array (which can be empty). Each text becomes a paragraph; `\n` adds a line break. Optional `textAlign` is `"left"` or `"center"` (default). Optional `textColor` accepts a CSS color.

Optional content fields appear in this order: `lead` (before the title), `texts`, `itemsLabel`, `items`, `footer`, and `logos`. Each logo has a `name` and local `src`. Keep IDs unique within a highlight.

The current six highlights use the supplied copy across eleven slides. Edit the array to update their wording, add slides, or change their order.

## Scrapbook themes and lists

Set `theme` to `"peach"`, `"lilac"`, `"butter"`, `"mint"`, `"sky"`, or `"rose"`. Themes control ink, heading fonts, controls, and the paper content card; palette values live in `src/lib/story-themes.ts`. Body text remains Helvetica. Use `scrapbook("peach")` for a matching code background or `scrapbook("peach", true)` for a cover.

```tsx
{
  id: "tools",
  title: "MY KIT",
  theme: "butter",
  background: scrapbook("butter"),
  texts: [],
  itemsLabel: "My digital sidekicks:",
  items: ["Canva", "Figma"],
  itemStyle: "chips", // "list" (default), "chips", or "steps"
  footer: "Your closing sentence goes here.",
}
```

Remove `theme` to return to the original dark-overlay presentation. Image, CSS, and custom JSX backgrounds continue to work, with or without a theme. Choose sufficient text/background contrast when mixing them.

## Background formats

Both covers and story backgrounds accept these formats:

```tsx
// Image: put files in public/stories/, then use a root-relative path.
{ type: "image", src: "/stories/photo.jpg", alt: "Describe the photo", position: "center top" }

// CSS: plain colors, gradients, patterns, etc.
{ type: "css", style: { background: "linear-gradient(145deg, #4a5df9, #14171a)" } }

// Code: JSX or your own component; fill the available space with size-full.
{ type: "custom", content: <div className="size-full bg-indigo-900" /> }
```

Custom backgrounds are decorative and should not contain interactive controls. Keep readable content in the story fields. The brand logos reuse the existing approved local assets.

## Playback and accessibility

Reading time is three seconds plus one second per three words (rounded up), with a ten-second minimum. It counts the title, lead, paragraphs, list label, list items, footer, and logo names. Pause/resume preserves elapsed time. Playback also pauses while the browser tab is hidden or when you focus the scrollable story content to read it with the keyboard.

Use the progress segments to select a story within a highlight, or the arrows to move across stories and highlights. Escape closes the viewer and restores focus to its highlight. Tab and Shift+Tab stay inside the viewer. Each new slide starts at the top of its content; short screens allow vertical scrolling.

Desktop side cards represent the previous and next highlight groups, independently of the active slide within a group. Clicking a side card opens that group's first slide. The first group has no left card; the last has no right card. Story arrows still move one slide at a time.

Text fades upward with a short stagger. Reduced-motion users see all content immediately, without entrance animations, and start with autoplay paused.
