import Image, { type StaticImageData } from "next/image";
import omasLogo from "../../public/brands/Omas Cafeteria.jpeg";
import rimsLogo from "../../public/brands/rims.png";
import urbanhubLogo from "../../public/brands/uhb.jpeg";

const brands = [
  { name: "Urbanhub Innovations", logo: urbanhubLogo },
  { name: "RIMS", logo: rimsLogo },
  { name: "Omas Cafeteria", logo: omasLogo },
] as const;

type ProfileIntroProps = {
  photo: StaticImageData;
  stats: readonly {
    label: "projects" | "clients" | "views";
    value: string;
  }[];
  bio: string;
};

export function ProfileIntro({ photo, stats, bio }: ProfileIntroProps) {
  return (
    <section
      aria-labelledby="profile-name"
      className="mx-auto my-10 grid w-[calc(100%-40px)] max-w-[680px] grid-cols-[88px_minmax(0,1fr)] items-center gap-x-5 gap-y-5 text-sm leading-[18px] tracking-[-0.1504px] sm:my-14 sm:w-[calc(100%-64px)] sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-x-7 sm:gap-y-0"
    >
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
          className="flex min-h-8 items-center text-2xl font-bold leading-[30px] tracking-[0.0703px]"
        >
          Nida Maryam
        </h1>
        <dl className="mt-4 flex flex-wrap gap-x-4 gap-y-2 sm:mt-1">
          {stats.map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-1 sm:flex-row">
              <dt className="order-2">{label}</dt>
              <dd className="order-1 font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="col-span-2 min-w-0 sm:col-span-1 sm:col-start-2 sm:self-start sm:pt-5">
        <p className="text-profile-muted">
          Social Media Marketer | Content Creator | Administrative Assistant
        </p>
        <p className="mt-1 whitespace-pre-line text-foreground">{bio}</p>
        <div className="flex items-center pb-1 pt-[14px]">
          <div className="flex h-9 w-[94px] shrink-0 -space-x-[9px] pr-1">
            {brands.map(({ name, logo }) => (
              <div
                key={name}
                className="relative size-9 shrink-0 overflow-hidden rounded-full border-2 border-background bg-white"
              >
                <Image
                  src={logo}
                  alt={name}
                  fill
                  sizes="32px"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
          <p className="min-w-0">
            Worked with{" "}
            <span className="font-semibold">Urbanhub Innovations</span>,{" "}
            <span className="font-semibold">Omas Cafeteria</span> + 10 more
          </p>
        </div>
      </div>

      <div className="col-span-2 grid grid-cols-2 gap-2 pb-3 pt-1 sm:pt-6">
        {/* Destinations will be enabled when the CV and email are supplied. */}
        <button
          type="button"
          disabled
          title="CV will be added later"
          className="flex min-h-11 items-center justify-center rounded-xl bg-[#4a5df9] px-5 py-[13px] text-center font-semibold text-white disabled:cursor-default"
        >
          Download CV
        </button>
        <button
          type="button"
          disabled
          title="Email address will be added later"
          className="flex min-h-11 items-center justify-center rounded-xl bg-[#25292e] px-5 py-[13px] text-center font-semibold text-white disabled:cursor-default"
        >
          Get in touch
        </button>
      </div>
    </section>
  );
}
