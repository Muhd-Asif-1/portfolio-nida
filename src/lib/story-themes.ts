import type { CSSProperties } from "react";

export type StoryTheme = "peach" | "lilac" | "butter" | "mint" | "sky" | "rose";

type ThemeStyle = CSSProperties & Record<`--story-${string}`, string>;

export const storyThemes: Record<StoryTheme, ThemeStyle> = {
  peach: {
    "--story-paper": "#f9dfcb",
    "--story-ink": "#3d2927",
    "--story-accent": "#985034",
    "--story-heading-font": "Georgia, 'Times New Roman', serif",
    "--story-heading-style": "italic",
  },
  lilac: {
    "--story-paper": "#e6ddf5",
    "--story-ink": "#352940",
    "--story-accent": "#70508b",
    "--story-heading-font": "Helvetica, Arial, sans-serif",
    "--story-heading-style": "normal",
  },
  butter: {
    "--story-paper": "#f7edb8",
    "--story-ink": "#3e3523",
    "--story-accent": "#786027",
    "--story-heading-font": "'Trebuchet MS', Helvetica, Arial, sans-serif",
    "--story-heading-style": "normal",
  },
  mint: {
    "--story-paper": "#dcebdc",
    "--story-ink": "#293d33",
    "--story-accent": "#4b7054",
    "--story-heading-font": "Georgia, 'Times New Roman', serif",
    "--story-heading-style": "italic",
  },
  sky: {
    "--story-paper": "#dae9f4",
    "--story-ink": "#293744",
    "--story-accent": "#466b87",
    "--story-heading-font": "Helvetica, Arial, sans-serif",
    "--story-heading-style": "normal",
  },
  rose: {
    "--story-paper": "#f2dce0",
    "--story-ink": "#432d36",
    "--story-accent": "#85465d",
    "--story-heading-font": "Georgia, 'Times New Roman', serif",
    "--story-heading-style": "italic",
  },
};
