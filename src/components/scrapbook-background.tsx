import { type StoryTheme, storyThemes } from "@/lib/story-themes";

const motifs: Record<StoryTheme, string> = {
  peach: "✿",
  lilac: "✦",
  butter: "✎",
  mint: "❋",
  sky: "↗",
  rose: "♡",
};

export function ScrapbookBackground({
  theme,
  cover = false,
}: {
  theme: StoryTheme;
  cover?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={`scrapbook-paper ${cover ? "scrapbook-cover" : "scrapbook-page"}`}
      style={storyThemes[theme]}
    >
      {cover ? (
        <span className="scrapbook-cover-sticker">{motifs[theme]}</span>
      ) : (
        <>
          <span className="scrapbook-tape scrapbook-tape-top" />
          <span className="scrapbook-doodle scrapbook-doodle-top">
            {motifs[theme]}
          </span>
          <span className="scrapbook-orbit" />
          <span className="scrapbook-doodle scrapbook-doodle-bottom">✧</span>
          <span className="scrapbook-checker" />
          <span className="scrapbook-tape scrapbook-tape-bottom" />
        </>
      )}
    </div>
  );
}
