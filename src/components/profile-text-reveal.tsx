"use client";

import { stagger, useAnimate, useReducedMotion } from "motion/react";
import { type ReactNode, useEffect } from "react";

export function ProfileTextReveal({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const [scope, animate] = useAnimate<HTMLElement>();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion !== false) return;

    // Start from readable text; server-rendered content never waits for motion.
    const animation = animate(
      "[data-text-reveal]",
      { opacity: [0.65, 1], y: [4, 0] },
      { duration: 0.4, delay: stagger(0.06), ease: [0.22, 1, 0.36, 1] },
    );
    const elements =
      scope.current.querySelectorAll<HTMLElement>("[data-text-reveal]");

    return () => {
      animation.stop();
      for (const element of elements) {
        element.style.removeProperty("opacity");
        element.style.removeProperty("transform");
      }
    };
  }, [animate, reducedMotion, scope]);

  return (
    <section ref={scope} aria-labelledby="profile-name" className={className}>
      {children}
    </section>
  );
}
