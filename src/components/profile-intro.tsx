import Image, { type StaticImageData } from "next/image";
import { NumberTicker } from "@/components/number-ticker";
import { ProfileTextReveal } from "@/components/profile-text-reveal";
import { WorkedWithAvatars } from "@/components/worked-with-avatars";
import { profile } from "@/lib/profile";

type ProfileIntroProps = {
  photo: StaticImageData;
  stats: readonly {
    label: "projects" | "clients" | "views";
    value: number;
    suffix: string;
  }[];
  bio: string;
  dashboardServices: readonly { title: string; description: string }[];
};

export function ProfileIntro({
  photo,
  stats,
  bio,
  dashboardServices,
}: ProfileIntroProps) {
  return (
    <ProfileTextReveal className="mx-auto my-10 grid w-[calc(100%-40px)] max-w-[680px] grid-cols-[88px_minmax(0,1fr)] items-center gap-x-5 gap-y-5 text-sm leading-[18px] tracking-[-0.1504px] sm:my-14 sm:w-[calc(100%-64px)] sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-x-7 sm:gap-y-0">
      <div className="relative aspect-square overflow-hidden rounded-full bg-profile-surface sm:row-span-2">
        <Image
          src={photo}
          alt="Nida Maryam"
          fill
          sizes="(min-width: 640px) 150px, 88px"
          loading="eager"
          className="object-cover object-top"
        />
        <div className="pointer-events-none absolute inset-0 rounded-full border border-black/10" />
      </div>

      <div className="min-w-0 sm:self-start sm:pt-4">
        <h1
          id="profile-name"
          data-text-reveal
          className="flex min-h-8 items-center text-2xl font-bold leading-[30px] tracking-[0.0703px]"
        >
          Nida Maryam
        </h1>
        <dl className="mt-4 flex flex-wrap gap-x-4 gap-y-2 sm:mt-1">
          {stats.map(({ label, value, suffix }) => (
            <div key={label} className="flex flex-col gap-1 sm:flex-row">
              <dt className="order-2">{label}</dt>
              <dd className="order-1 font-semibold">
                <NumberTicker value={value} suffix={suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="col-span-2 min-w-0 sm:col-span-1 sm:col-start-2 sm:self-start sm:pt-5">
        <p className="text-profile-muted">
          Social Media Marketer | Content Creator | Administrative Assistant
        </p>
        <p
          data-text-reveal
          className="mt-1 whitespace-pre-line text-foreground"
        >
          {bio}
        </p>
        <div className="flex items-center pb-1 pt-[14px]">
          <WorkedWithAvatars />
          <p className="min-w-0">
            Worked with{" "}
            <span className="font-semibold">Urbanhub Innovations</span>,{" "}
            <span className="font-semibold">Omas Cafeteria</span> + 10 more
          </p>
        </div>
      </div>

      <div className="col-span-2 pt-1 sm:pt-6">
        <section
          aria-labelledby="dashboard-title"
          className="rounded-xl bg-[#282b33] px-4 py-[14px]"
        >
          <h2
            id="dashboard-title"
            className="flex items-center gap-1.5 text-sm font-semibold leading-5"
          >
            <svg
              aria-hidden="true"
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
              className="shrink-0 text-[#00b85b]"
            >
              <path
                d="M4 15 14 5M4 5h10v10"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            What I can help with
          </h2>
          <dl className="mt-2 space-y-1.5 text-sm leading-5">
            {dashboardServices.map(({ title, description }) => (
              <div key={title} data-text-reveal>
                <dt className="inline font-semibold">{title}: </dt>
                <dd className="inline text-[#a8a8a8]">{description}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="mt-2.5 grid grid-cols-2 gap-2 pb-3">
          <a
            href={profile.resumeUrl}
            download="Nida-Maryam-CV.pdf"
            className="flex min-h-11 items-center justify-center rounded-xl bg-[#4a5df9] px-3 py-[13px] text-center font-semibold whitespace-nowrap text-white hover:bg-[#4052df] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-text sm:px-5"
          >
            Download CV
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="flex min-h-11 items-center justify-center rounded-xl bg-[#25292e] px-3 py-[13px] text-center font-semibold whitespace-nowrap text-white hover:bg-[#30353c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-text sm:px-5"
          >
            Get in touch
          </a>
        </div>
      </div>
    </ProfileTextReveal>
  );
}
