"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@animate-ui/react/primitives/tooltip";
import type { IconHandle } from "@animateicons/react";
import { InstagramIcon, WhatsappIcon } from "@animateicons/react/huge";
import { LinkedinIcon } from "@animateicons/react/lucide";
import { useReducedMotion } from "motion/react";
import { useRef } from "react";

const socials = [
  {
    name: "WhatsApp",
    href: "https://wa.me/916235552323",
    Icon: WhatsappIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/nida-maryam-",
    Icon: LinkedinIcon,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/nidoooiii",
    Icon: InstagramIcon,
  },
] as const;

function SocialLink({ name, href, Icon }: (typeof socials)[number]) {
  const icon = useRef<IconHandle>(null);
  const reducedMotion = useReducedMotion();

  function startAnimation() {
    if (reducedMotion === false) icon.current?.startAnimation();
  }

  function stopAnimation() {
    icon.current?.stopAnimation();
  }

  return (
    <Tooltip side="right" sideOffset={12}>
      <TooltipTrigger asChild>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} — opens in a new tab`}
          onMouseEnter={startAnimation}
          onMouseLeave={stopAnimation}
          onFocus={startAnimation}
          onBlur={stopAnimation}
          className="flex size-11 items-center justify-center rounded-xl text-foreground hover:bg-profile-surface focus-visible:bg-profile-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text"
        >
          <Icon
            ref={icon}
            size={24}
            isAnimated={reducedMotion === false}
            aria-hidden="true"
            className="pointer-events-none"
          />
        </a>
      </TooltipTrigger>
      <TooltipContent className="rounded-lg border border-white/10 bg-profile-surface px-3 py-2 text-xs font-semibold text-foreground shadow-xl">
        {name}
      </TooltipContent>
    </Tooltip>
  );
}

export function SocialRail() {
  const reducedMotion = useReducedMotion();

  return (
    <TooltipProvider
      openDelay={150}
      closeDelay={100}
      transition={reducedMotion ? { duration: 0 } : undefined}
    >
      <nav
        aria-label="Social links"
        className="fixed left-2 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-3 sm:left-4"
      >
        {socials.map((social) => (
          <SocialLink key={social.name} {...social} />
        ))}
      </nav>
    </TooltipProvider>
  );
}
