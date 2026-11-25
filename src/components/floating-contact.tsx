import { SendIcon } from "@animateicons/react/lucide";
import Image from "next/image";
import { profile } from "@/lib/profile";
import portrait from "../../public/nida_portrait.jpeg";

export function FloatingContact() {
  return (
    <a
      href={`mailto:${profile.email}`}
      aria-label="Email Nida Maryam"
      title={profile.email}
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex min-h-14 w-[220px] items-center gap-2 rounded-full border border-white/5 bg-[#25292e] px-4 text-sm font-semibold text-foreground shadow-[0_4px_6px_rgba(0,0,0,0.2)] hover:bg-[#30353c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-text sm:right-8 sm:bottom-8"
    >
      <SendIcon size={20} duration={1} color="#ffffff" />
      <span>Contact</span>
      <Image
        src={portrait}
        alt=""
        width={28}
        height={28}
        sizes="28px"
        className="ml-auto size-7 rounded-full border border-white/15 object-cover object-top"
      />
    </a>
  );
}
