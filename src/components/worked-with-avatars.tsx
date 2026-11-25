"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import Image, { type StaticImageData } from "next/image";
import { useId, useState } from "react";
import omasLogo from "../../public/brands/Omas Cafeteria.jpeg";
import rimsLogo from "../../public/brands/rims.png";
import urbanhubLogo from "../../public/brands/uhb.jpeg";

const brands = [
  { name: "Urbanhub Innovations", logo: urbanhubLogo },
  { name: "RIMS", logo: rimsLogo },
  { name: "Omas Cafeteria", logo: omasLogo },
] as const;

function BrandAvatar({
  name,
  logo,
  first,
  active,
  onActivate,
  onDeactivate,
}: {
  name: string;
  logo: StaticImageData;
  first: boolean;
  active: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const tooltipId = useId();
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const rotate = useSpring(useTransform(pointerX, [-18, 18], [-8, 8]), {
    stiffness: 100,
    damping: 15,
  });
  const translateX = useSpring(useTransform(pointerX, [-18, 18], [-6, 6]), {
    stiffness: 100,
    damping: 15,
  });

  return (
    <div
      className="relative size-9 shrink-0"
      style={{ zIndex: active ? 20 : undefined }}
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        pointerX.set(0);
        onActivate();
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "mouse") return;
        pointerX.set(0);
        if (!event.currentTarget.contains(document.activeElement)) {
          onDeactivate();
        }
      }}
    >
      <motion.button
        type="button"
        aria-label={name}
        aria-describedby={active ? tooltipId : undefined}
        className="relative block size-9 cursor-pointer rounded-full border-2 border-background bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text"
        animate={{ y: active && !reduceMotion ? "-30%" : 0 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 300, damping: 17 }
        }
        onFocus={() => {
          pointerX.set(0);
          onActivate();
        }}
        onBlur={onDeactivate}
        onClick={onActivate}
        onKeyDown={(event) => {
          if (event.key === "Escape") onDeactivate();
        }}
        onPointerMove={(event) => {
          if (reduceMotion || event.pointerType !== "mouse") return;
          const bounds = event.currentTarget.getBoundingClientRect();
          pointerX.set(event.clientX - bounds.left - bounds.width / 2);
        }}
      >
        <Image
          src={logo}
          alt=""
          fill
          sizes="32px"
          className="rounded-full object-contain"
        />
      </motion.button>

      <AnimatePresence>
        {active && (
          <div
            className={`absolute bottom-full pb-4 ${first ? "left-0" : "left-1/2 -translate-x-1/2"}`}
          >
            <motion.div
              id={tooltipId}
              role="tooltip"
              initial={{
                opacity: 0,
                y: reduceMotion ? 0 : 20,
                scale: reduceMotion ? 1 : 0.6,
              }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                opacity: 0,
                y: reduceMotion ? 0 : 12,
                scale: reduceMotion ? 1 : 0.6,
              }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 260, damping: 14 }
              }
              style={reduceMotion ? undefined : { rotate, x: translateX }}
              className="relative whitespace-nowrap rounded-md bg-black px-3 py-2 text-xs font-semibold text-white shadow-xl"
            >
              {name}
              <span className="absolute inset-x-3 -bottom-px h-px bg-linear-to-r from-transparent via-emerald-500 to-transparent" />
              <span className="absolute inset-x-6 -bottom-px h-px bg-linear-to-r from-transparent via-sky-500 to-transparent" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function WorkedWithAvatars() {
  const [activeBrand, setActiveBrand] = useState<string | null>(null);

  return (
    <div className="isolate flex h-9 w-[94px] shrink-0 -space-x-[9px] pr-1">
      {brands.map((brand, index) => (
        <BrandAvatar
          key={brand.name}
          {...brand}
          first={index === 0}
          active={activeBrand === brand.name}
          onActivate={() => setActiveBrand(brand.name)}
          onDeactivate={() =>
            setActiveBrand((current) =>
              current === brand.name ? null : current,
            )
          }
        />
      ))}
    </div>
  );
}
