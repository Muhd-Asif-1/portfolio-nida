import Image from "next/image";
import Link from "next/link";

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
            src="/nida-maryam-logo-transparent.png"
            alt="Nida Maryam"
            width={2170}
            height={725}
            sizes="220px"
            loading="eager"
            className="h-12 w-[220px] object-contain invert"
          />
        </Link>
      </nav>
    </header>
  );
}
