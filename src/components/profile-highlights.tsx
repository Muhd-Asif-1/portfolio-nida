"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
  XIcon,
} from "@animateicons/react/lucide";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { HighlightBackground } from "@/components/highlight-background";
import { StoryContent } from "@/components/story-content";
import type { Highlight, HighlightStory } from "@/lib/highlights";
import { profile } from "@/lib/profile";
import { storyThemes } from "@/lib/story-themes";

const focusStyle =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-text";

const controlIcons = {
  close: XIcon,
  previous: ChevronLeftIcon,
  next: ChevronRightIcon,
  pause: PauseIcon,
  play: PlayIcon,
} as const;

function Icon({ name }: { name: keyof typeof controlIcons }) {
  const ControlIcon = controlIcons[name];
  const reduceMotion = useReducedMotion();

  return (
    <ControlIcon
      aria-hidden="true"
      size={name === "close" ? 24 : 20}
      duration={1}
      color="currentColor"
      isAnimated={reduceMotion === false}
    />
  );
}

function readingDuration(story: HighlightStory) {
  const copy = [
    story.title,
    story.lead,
    ...story.texts,
    story.itemsLabel,
    ...(story.items ?? []),
    story.footer,
    ...(story.logos?.map((logo) => logo.name) ?? []),
  ]
    .filter(Boolean)
    .join(" ");
  return Math.max(10, 3 + Math.ceil(copy.trim().split(/\s+/u).length / 3));
}

function storyStyle(story: HighlightStory) {
  return story.theme
    ? { ...storyThemes[story.theme], color: "var(--story-ink)" }
    : undefined;
}

function StoryProgress({
  playing,
  onComplete,
  duration,
}: {
  playing: boolean;
  onComplete: () => void;
  duration: number;
}) {
  const progress = useMotionValue(0);

  useEffect(() => {
    if (!playing) return;
    const controls = animate(progress, 1, {
      duration: (1 - progress.get()) * duration,
      ease: "linear",
      onComplete,
    });
    return () => controls.stop();
  }, [playing, progress, onComplete, duration]);

  return (
    <motion.span
      className="absolute inset-0 origin-left rounded-full bg-current"
      style={{ scaleX: progress }}
    />
  );
}

function StoryViewer({
  highlights,
  initialHighlight,
  onClose,
}: {
  highlights: readonly Highlight[];
  initialHighlight: number;
  onClose: () => void;
}) {
  const slides = highlights.flatMap((highlight, highlightIndex) =>
    highlight.stories.map((story, storyIndex) => ({
      highlight,
      highlightIndex,
      story,
      storyIndex,
    })),
  );
  const [index, setIndex] = useState(() =>
    highlights
      .slice(0, initialHighlight)
      .reduce((total, highlight) => total + highlight.stories.length, 0),
  );
  const reduceMotion = useReducedMotion();
  const [playback, setPlayback] = useState<"play" | "pause" | null>(null);
  const playing =
    playback === null ? reduceMotion === false : playback === "play";
  const [visible, setVisible] = useState(true);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const active = slides[index];
  const previous = slides[index - 1];
  const next = slides[index + 1];
  const groupStart = index - active.storyIndex;
  const previousGroup = highlights[active.highlightIndex - 1];
  const nextGroup = highlights[active.highlightIndex + 1];
  const advance = useCallback(() => {
    if (index === slides.length - 1) onClose();
    else setIndex((current) => current + 1);
  }, [index, slides.length, onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const trigger =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog?.showModal();
    closeRef.current?.focus();
    const updateVisibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      document.removeEventListener("visibilitychange", updateVisibility);
      dialog?.close();
      document.body.style.overflow = oldOverflow;
      trigger?.focus();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-label="Portfolio highlights"
      className="story-viewer fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden bg-background p-0 text-white backdrop:bg-black"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "Tab") {
          const controls = Array.from(
            event.currentTarget.querySelectorAll<HTMLElement>(
              "button:not(:disabled), a[href]",
            ),
          ).filter((element) => element.getClientRects().length > 0);
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          setIndex((current) => Math.max(0, current - 1));
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          advance();
        }
      }}
    >
      <div className="grid h-full grid-cols-1 items-center justify-center gap-5 px-0 sm:px-16 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
        {previousGroup && (
          <button
            type="button"
            aria-label={`Open ${previousGroup.title} highlight group`}
            style={storyStyle(previousGroup.stories[0])}
            onClick={() => setIndex(groupStart - previousGroup.stories.length)}
            className={`relative col-start-1 row-start-1 hidden aspect-9/16 w-[min(15vw,208px)] justify-self-end overflow-hidden rounded-lg opacity-40 hover:opacity-65 lg:block ${focusStyle}`}
          >
            <HighlightBackground
              background={previousGroup.stories[0].background}
              sizes="208px"
            />
            <span
              className={`absolute inset-0 ${previousGroup.stories[0].theme ? "bg-white/10" : "bg-black/30"}`}
            />
            <span className="absolute inset-x-3 top-1/2 -translate-y-1/2 text-center text-sm font-semibold">
              {previousGroup.title}
            </span>
          </button>
        )}

        <div className="relative col-start-1 row-start-1 flex h-full min-w-0 items-center justify-center justify-self-center sm:h-auto lg:col-start-2">
          <button
            type="button"
            aria-label="Previous story"
            disabled={!previous}
            onClick={() => setIndex(index - 1)}
            className={`absolute -left-12 z-10 hidden size-8 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 disabled:invisible sm:flex ${focusStyle}`}
          >
            <Icon name="previous" />
          </button>

          <article
            data-story-theme={active.story.theme}
            style={storyStyle(active.story)}
            className="relative isolate h-full w-screen overflow-hidden bg-profile-surface sm:h-[min(920px,calc(100dvh-48px),calc((100vw-128px)*16/9))] sm:w-auto sm:aspect-9/16 sm:rounded-lg"
          >
            <div className="pointer-events-none absolute inset-0 -z-20">
              <HighlightBackground
                background={active.story.background}
                sizes="(min-width: 640px) 520px, 100vw"
              />
            </div>
            {!active.story.theme && (
              <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-black/65 via-black/30 to-black/75" />
            )}

            <div className="px-4 pt-[max(16px,env(safe-area-inset-top))]">
              <nav
                className="flex gap-1"
                aria-label="Stories in this highlight"
              >
                {active.highlight.stories.map((story, storyIndex) => (
                  <button
                    key={story.id}
                    type="button"
                    aria-label={`View ${story.title}`}
                    aria-current={
                      storyIndex === active.storyIndex ? "step" : undefined
                    }
                    onClick={() =>
                      setIndex(index - active.storyIndex + storyIndex)
                    }
                    className={`group flex h-5 flex-1 items-center ${focusStyle}`}
                  >
                    <span className="relative h-0.5 w-full overflow-hidden rounded-full bg-current/25">
                      {storyIndex < active.storyIndex && (
                        <span className="absolute inset-0 bg-current" />
                      )}
                      {storyIndex === active.storyIndex && (
                        <StoryProgress
                          key={`${active.highlight.id}-${story.id}`}
                          playing={playing && visible}
                          onComplete={advance}
                          duration={readingDuration(active.story)}
                        />
                      )}
                    </span>
                  </button>
                ))}
              </nav>
              <div className="flex items-center gap-2.5 text-sm">
                <Image
                  src="/nida_portrait.jpeg"
                  alt=""
                  width={32}
                  height={32}
                  className="size-8 rounded-full object-cover"
                />
                <span className="min-w-0 flex-1 truncate font-semibold">
                  {active.highlight.title}
                </span>
                <button
                  type="button"
                  aria-label={playing ? "Pause stories" : "Play stories"}
                  onClick={() => setPlayback(playing ? "pause" : "play")}
                  className={`flex size-11 shrink-0 items-center justify-center rounded-full hover:bg-current/10 ${focusStyle}`}
                >
                  <Icon name={playing ? "pause" : "play"} />
                </button>
                <button
                  ref={closeRef}
                  type="button"
                  aria-label="Close stories"
                  onClick={onClose}
                  className={`flex size-11 shrink-0 items-center justify-center rounded-full hover:bg-current/10 ${focusStyle}`}
                >
                  <Icon name="close" />
                </button>
              </div>
            </div>

            <section
              key={`${active.highlight.id}-${active.story.id}`}
              aria-label="Story content"
              // biome-ignore lint/a11y/noNoninteractiveTabindex: Keyboard users need to scroll this region on short screens.
              tabIndex={0}
              onFocus={() => setPlayback("pause")}
              className={`story-scroll absolute inset-x-0 bottom-24 top-24 overflow-y-auto px-6 py-5 sm:px-8 ${active.story.textAlign === "left" ? "text-left" : "text-center"}`}
              style={{ color: active.story.textColor }}
            >
              <div className="flex min-h-full flex-col justify-center">
                <p className="sr-only" aria-live="polite">
                  {active.highlight.title}, story {active.storyIndex + 1} of{" "}
                  {active.highlight.stories.length}
                </p>
                <StoryContent
                  story={active.story}
                  label={active.highlight.title}
                />
              </div>
            </section>

            <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 px-4 pb-[max(20px,env(safe-area-inset-bottom))] pt-4">
              <button
                type="button"
                aria-label="Previous story"
                disabled={!previous}
                onClick={() => setIndex(index - 1)}
                className={`flex size-11 shrink-0 items-center justify-center rounded-full border border-current/50 disabled:opacity-30 sm:hidden ${focusStyle}`}
              >
                <Icon name="previous" />
              </button>
              <a
                href={`mailto:${profile.email}`}
                className={`flex min-h-11 flex-1 items-center rounded-full border border-current/60 px-5 text-sm hover:bg-current/10 ${focusStyle}`}
              >
                Get in touch
              </a>
              <button
                type="button"
                aria-label={next ? "Next story" : "Finish stories"}
                onClick={advance}
                className={`flex size-11 shrink-0 items-center justify-center rounded-full border border-current/50 sm:hidden ${focusStyle}`}
              >
                <Icon name="next" />
              </button>
            </div>
          </article>

          <button
            type="button"
            aria-label={next ? "Next story" : "Finish stories"}
            onClick={advance}
            className={`absolute -right-12 z-10 hidden size-8 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 sm:flex ${focusStyle}`}
          >
            <Icon name="next" />
          </button>
        </div>

        {nextGroup && (
          <button
            type="button"
            aria-label={`Open ${nextGroup.title} highlight group`}
            style={storyStyle(nextGroup.stories[0])}
            onClick={() =>
              setIndex(groupStart + active.highlight.stories.length)
            }
            className={`relative col-start-3 row-start-1 hidden aspect-9/16 w-[min(15vw,208px)] overflow-hidden rounded-lg opacity-40 hover:opacity-65 lg:block ${focusStyle}`}
          >
            <HighlightBackground
              background={nextGroup.stories[0].background}
              sizes="208px"
            />
            <span
              className={`absolute inset-0 ${nextGroup.stories[0].theme ? "bg-white/10" : "bg-black/30"}`}
            />
            <span className="absolute inset-x-3 top-1/2 -translate-y-1/2 text-center text-sm font-semibold">
              {nextGroup.title}
            </span>
          </button>
        )}
      </div>
    </dialog>
  );
}

export function ProfileHighlights({
  highlights,
}: {
  highlights: readonly Highlight[];
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const close = useCallback(() => setSelected(null), []);

  if (highlights.length === 0) return null;

  return (
    <section
      aria-label="Highlights"
      className="mx-auto mb-10 w-[calc(100%-40px)] max-w-[680px] sm:mb-14 sm:w-[calc(100%-64px)]"
    >
      <ul className="flex gap-3 overflow-x-auto px-1 py-2 [scrollbar-width:none] sm:gap-5">
        {highlights.map((highlight, index) => (
          <li key={highlight.id} className="w-[95px] shrink-0">
            <button
              type="button"
              aria-label={`Open ${highlight.title} highlight`}
              aria-haspopup="dialog"
              onClick={() => setSelected(index)}
              className={`group flex w-full cursor-pointer flex-col items-center gap-3 rounded-md py-1 text-xs font-semibold ${focusStyle}`}
            >
              <span className="flex size-[85px] items-center justify-center rounded-full border-2 border-profile-surface transition-colors group-hover:border-profile-muted motion-reduce:transition-none">
                <span className="relative block size-[72px] overflow-hidden rounded-full bg-profile-surface">
                  <HighlightBackground
                    background={highlight.cover}
                    sizes="72px"
                  />
                </span>
              </span>
              <span className="w-full truncate text-center">
                {highlight.title}
              </span>
            </button>
          </li>
        ))}
      </ul>
      {selected !== null && (
        <StoryViewer
          highlights={highlights}
          initialHighlight={selected}
          onClose={close}
        />
      )}
    </section>
  );
}
