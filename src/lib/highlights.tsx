import type { CSSProperties, ReactNode } from "react";
import { profile } from "@/lib/profile";

export type HighlightBackground =
  | { type: "image"; src: string; alt: string; position?: string }
  | { type: "css"; style: CSSProperties }
  | { type: "custom"; content: ReactNode };

export type HighlightStory = {
  id: string;
  title: string;
  background: HighlightBackground;
  texts: readonly string[];
  textAlign?: "left" | "center";
  textColor?: string;
};

export type Highlight = {
  id: string;
  title: string;
  cover: HighlightBackground;
  stories: readonly [HighlightStory, ...HighlightStory[]];
};

// Add, remove, or reorder highlights here. Each highlight can have multiple stories.
// Image paths start at public/, e.g. public/stories/photo.jpg -> /stories/photo.jpg.
// For a background made with JSX, use { type: "custom", content: <YourComponent /> }.
export const highlights: readonly Highlight[] = [
  {
    id: "about",
    title: "About me",
    cover: { type: "image", src: "/nida_portrait.jpeg", alt: "Nida Maryam" },
    stories: [
      {
        id: "intro",
        title: "Nida Maryam",
        background: {
          type: "image",
          src: "/nida_portrait.jpeg",
          alt: "Nida Maryam",
          position: "center top",
        },
        texts: profile.bio.split("\n"),
      },
    ],
  },
  {
    id: "services",
    title: "Services",
    cover: {
      type: "custom",
      content: (
        <div className="flex size-full items-center justify-center bg-linear-to-br from-[#a8b7ff] via-[#4a5df9] to-[#25292e] text-4xl text-white">
          ✦
        </div>
      ),
    },
    stories: [
      {
        id: "content",
        title: "Content & social",
        background: {
          type: "css",
          style: {
            background: "linear-gradient(145deg, #4a5df9, #14171a 85%)",
          },
        },
        texts: [
          "Social Media Management",
          "Content Planning & Creative Direction",
          "Website Content Writing",
        ],
      },
      {
        id: "video",
        title: "Video & campaigns",
        background: {
          type: "css",
          style: {
            background: "linear-gradient(160deg, #415868, #14171a 85%)",
          },
        },
        texts: ["Mobile Videography & Video Editing", "Marketing Campaigns"],
      },
      {
        id: "admin",
        title: "Admin & HR",
        background: {
          type: "css",
          style: {
            background: "linear-gradient(145deg, #526253, #14171a 85%)",
          },
        },
        texts: ["Administration & HR Coordination"],
      },
    ],
  },
  {
    id: "worked-with",
    title: "Worked with",
    cover: {
      type: "image",
      src: "/brands/uhb.jpeg",
      alt: "Urbanhub Innovations",
    },
    stories: [
      {
        id: "brands",
        title: "Worked with",
        background: {
          type: "custom",
          content: (
            <div className="size-full bg-[radial-gradient(ellipse_at_top,#526273,#14171a_75%)]" />
          ),
        },
        texts: ["Urbanhub Innovations", "RIMS", "Omas Cafeteria"],
      },
    ],
  },
];
