import Image from "next/image";
import Link from "next/link";
import { profile } from "@/lib/profile";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 shrink-0 border-b border-[#363636] bg-[#0c1014]">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[59px] w-full max-w-[975px] items-center justify-between gap-4 px-5 tracking-[-0.1504px]"
      >
        <Link
          href="/"
          aria-label="Nida Maryam — home"
          className="flex min-h-11 shrink-0 items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-text"
        >
          <Image
            src="/nida-logo-transparent.png"
            alt="Nida"
            width={1993}
            height={789}
            sizes="104px"
            loading="eager"
            className="h-auto w-[104px] invert"
          />
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="flex min-h-11 items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-text"
          >
            <span className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold leading-4 text-white">
              Contact
            </span>
          </a>
          <a
            href={profile.resumeUrl}
            download="Nida-Maryam-CV.pdf"
            className="flex min-h-11 items-center rounded-sm text-sm text-[#85a1ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-text"
          >
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
}
