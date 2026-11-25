"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";

export function NumberTicker({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const reducedMotion = useReducedMotion();
  const count = useMotionValue(value);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (!isInView || reducedMotion !== false) {
      count.set(value);
      return;
    }

    count.set(0);
    const animation = animate(count, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
    });

    return () => animation.stop();
  }, [count, isInView, reducedMotion, value]);

  return (
    <span ref={ref} className="inline-grid tabular-nums">
      <span className="sr-only">
        {value}
        {suffix}
      </span>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {value}
        {suffix}
      </span>
      <span aria-hidden="true" className="col-start-1 row-start-1">
        <motion.span>{rounded}</motion.span>
        {suffix}
      </span>
    </span>
  );
}
