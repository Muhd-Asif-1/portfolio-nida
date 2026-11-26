"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import type { HighlightStory } from "@/lib/highlights";

const reveal = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

export function StoryContent({
  story,
  label,
}: {
  story: HighlightStory;
  label: string;
}) {
  const reduceMotion = useReducedMotion();
  const ItemList = story.itemStyle === "steps" ? motion.ol : motion.ul;

  return (
    <motion.div
      className="story-copy"
      initial={reduceMotion === false ? "hidden" : false}
      animate="visible"
      transition={{ staggerChildren: reduceMotion ? 0 : 0.08 }}
      variants={{ hidden: {}, visible: {} }}
    >
      {story.theme && (
        <motion.p
          variants={reveal}
          aria-hidden="true"
          className="story-page-label"
        >
          {label}
          <span>✦</span>
        </motion.p>
      )}
      {story.lead && (
        <motion.p variants={reveal} className="story-lead">
          {story.lead}
        </motion.p>
      )}
      <motion.h2
        variants={reveal}
        className="story-copy-heading text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
      >
        {story.title}
      </motion.h2>
      {story.texts.map((text, index) => (
        <motion.p
          variants={reveal}
          key={`${index}-${text}`}
          className="whitespace-pre-line"
        >
          {text}
        </motion.p>
      ))}
      {story.itemsLabel && (
        <motion.p variants={reveal} className="story-items-label">
          {story.itemsLabel}
        </motion.p>
      )}
      {story.items && (
        <ItemList
          className={`story-items story-items-${story.itemStyle ?? "list"}`}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: reduceMotion ? 0 : 0.08 },
            },
          }}
        >
          {story.items.map((item) => (
            <motion.li variants={reveal} key={item}>
              {item}
            </motion.li>
          ))}
        </ItemList>
      )}
      {story.footer && (
        <motion.p variants={reveal} className="story-footer">
          {story.footer}
        </motion.p>
      )}
      {story.logos && (
        <motion.ul variants={reveal} className="story-logos">
          {story.logos.map((logo) => (
            <li key={logo.name}>
              <Image
                src={logo.src}
                alt=""
                width={56}
                height={56}
                sizes="56px"
                className="size-14 rounded-lg bg-white object-contain p-1"
              />
              <span>{logo.name}</span>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
}
