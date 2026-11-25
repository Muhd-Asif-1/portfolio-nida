import { ProfileIntro } from "@/components/profile-intro";
import { profile } from "@/lib/profile";
import portrait from "../../public/nida_portrait.jpeg";

export default function Home() {
  return (
    <main aria-label="Nida Maryam’s portfolio" className="flex-1">
      <ProfileIntro
        photo={portrait}
        stats={profile.stats}
        bio={profile.bio}
        dashboardServices={profile.dashboardServices}
      />
    </main>
  );
}
