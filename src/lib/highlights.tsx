import type { CSSProperties, ReactNode } from "react";
import { ScrapbookBackground } from "@/components/scrapbook-background";
import type { StoryTheme } from "@/lib/story-themes";

export type HighlightBackground =
  | { type: "image"; src: string; alt: string; position?: string }
  | { type: "css"; style: CSSProperties }
  | { type: "custom"; content: ReactNode };

export type HighlightStory = {
  id: string;
  title: string;
  background: HighlightBackground;
  texts: readonly string[];
  theme?: StoryTheme;
  lead?: string;
  items?: readonly string[];
  itemsLabel?: string;
  itemStyle?: "list" | "chips" | "steps";
  footer?: string;
  logos?: readonly { name: string; src: string }[];
  textAlign?: "left" | "center";
  textColor?: string;
};

export type Highlight = {
  id: string;
  title: string;
  cover: HighlightBackground;
  stories: readonly [HighlightStory, ...HighlightStory[]];
};

// Edit all highlight content here. Each highlight needs at least one story.
// Replace a scrapbook background with an image, CSS, or your own JSX at any time.
function scrapbook(theme: StoryTheme, cover = false): HighlightBackground {
  return {
    type: "custom",
    content: <ScrapbookBackground theme={theme} cover={cover} />,
  };
}

export const highlights: readonly Highlight[] = [
  {
    id: "intro",
    title: "Intro",
    cover: scrapbook("peach", true),
    stories: [
      {
        id: "hello",
        title: "Well, hello there! 👀",
        theme: "peach",
        background: scrapbook("peach"),
        textAlign: "left",
        texts: [
          "I'm Nida Maryam. A creative thinker, content enthusiast and someone who loves making things happen.",
          "I've spent the last 3 years exploring different sides of the professional world, from social media and marketing to administration and team coordination.",
        ],
      },
      {
        id: "my-thing",
        title: "Intro",
        theme: "peach",
        background: scrapbook("peach"),
        textAlign: "left",
        texts: [
          "Somewhere between planning campaigns, creating content and keeping things organised, I found my thing.",
          "And that's a little about me. Stick around, there's more to explore! ✨",
        ],
      },
    ],
  },
  {
    id: "services",
    title: "Services",
    cover: scrapbook("lilac", true),
    stories: [
      {
        id: "creative-services",
        title: "So, what can I bring to the table?",
        theme: "lilac",
        background: scrapbook("lilac"),
        textAlign: "left",
        texts: [],
        items: [
          "Social Media Management",
          "Content Creation",
          "Content Planning & Creative Direction",
          "Website Content Writing",
        ],
      },
      {
        id: "making-it-happen",
        title: "SERVICES",
        theme: "lilac",
        background: scrapbook("lilac"),
        textAlign: "left",
        texts: [],
        items: [
          "Mobile Videography & Editing",
          "Marketing Campaign Coordination",
          "Administration & HR Coordination",
        ],
        footer:
          "From the first idea to getting things done, I enjoy being part of the process",
      },
    ],
  },
  {
    id: "my-kit",
    title: "My Kit",
    cover: scrapbook("butter", true),
    stories: [
      {
        id: "digital-sidekicks",
        title: "A few things that make my work life easier!",
        theme: "butter",
        background: scrapbook("butter"),
        textAlign: "left",
        texts: [],
        itemsLabel: "My digital sidekicks:",
        itemStyle: "chips",
        items: [
          "Social Media & Meta Business Suite",
          "Canva",
          "CapCut",
          "Zoho",
          "Asana",
          "Clickup",
        ],
      },
      {
        id: "more-sidekicks",
        title: "MY KIT",
        theme: "butter",
        background: scrapbook("butter"),
        textAlign: "left",
        texts: [],
        itemStyle: "chips",
        items: [
          "Microsoft Todo",
          "Figma",
          "Lightroom",
          "Google Workspace",
          "Excel & Sheets",
        ],
        footer:
          "And, of course, a notebook full of random ideas. You never know when one might come in handy!",
      },
    ],
  },
  {
    id: "chapters",
    title: "Chapters",
    cover: scrapbook("mint", true),
    stories: [
      {
        id: "social-media-marketer",
        lead: "Three roles. Different responsibilities. Plenty of learning.",
        title: "Social Media Marketer",
        theme: "mint",
        background: scrapbook("mint"),
        textAlign: "left",
        texts: [
          "Where I got into content, campaigns and understanding audiences.",
        ],
      },
      {
        id: "administrative-assistant",
        title: "Administrative Assistant",
        theme: "mint",
        background: scrapbook("mint"),
        textAlign: "left",
        texts: ["A little more structure, coordination and people management."],
      },
      {
        id: "head-of-marketing",
        title: "Head of Marketing",
        theme: "mint",
        background: scrapbook("mint"),
        textAlign: "left",
        texts: [
          "Taking ideas further, working with teams and managing the bigger picture.",
        ],
      },
    ],
  },
  {
    id: "playbook",
    title: "Playbook",
    cover: scrapbook("sky", true),
    stories: [
      {
        id: "my-flow",
        title: "PLAYBOOK",
        theme: "sky",
        background: scrapbook("sky"),
        textAlign: "left",
        texts: [
          "I like having a plan. But I also love a good spontaneous idea!",
          "My usual flow looks something like this:",
        ],
        itemStyle: "steps",
        items: ["Think", "Plan", "Create", "Coordinate", "Execute"],
        footer:
          "I enjoy connecting the dots, bringing people together and making sure things actually happen.",
      },
    ],
  },
  {
    id: "brands",
    title: "Brands",
    cover: scrapbook("rose", true),
    stories: [
      {
        id: "collaborations",
        title: "BRANDS",
        theme: "rose",
        background: scrapbook("rose"),
        textAlign: "left",
        texts: [
          "A few names I've had the pleasure of working with.",
          "A little collection of brands, businesses and projects I've been part of.",
          "Every collaboration brings a new perspective, a new challenge and something to learn.",
        ],
        logos: [
          { name: "Urbanhub Innovations", src: "/brands/uhb.jpeg" },
          { name: "RIMS", src: "/brands/rims.png" },
          { name: "Omas Cafeteria", src: "/brands/Omas Cafeteria.jpeg" },
        ],
      },
    ],
  },
];
