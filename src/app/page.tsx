import { ProfileHighlights } from "@/components/profile-highlights";
import { ProfileIntro } from "@/components/profile-intro";
import { highlights } from "@/lib/highlights";
import { profile } from "@/lib/profile";
import portrait from "../../public/nida_portrait.jpeg";

export default function Home() {
  return (
    <main aria-label="Nida Maryam’s portfolio" className="flex-1 pl-16 lg:pl-0">
      <ProfileIntro
        photo={portrait}
        stats={profile.stats}
        bio={profile.bio}
        dashboardServices={profile.dashboardServices}
      />
      <ProfileHighlights highlights={highlights} />
    </main>
  );
}
