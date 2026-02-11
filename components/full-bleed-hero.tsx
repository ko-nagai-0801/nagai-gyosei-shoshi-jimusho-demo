import Image from "next/image";
import Link from "next/link";

type HeroAction = {
  href: string;
  label: string;
  style?: "primary" | "secondary";
};

type FullBleedHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions: HeroAction[];
  backgroundImage?: string;
  imagePriority?: boolean;
};

export function FullBleedHero({
  eyebrow,
  title,
  description,
  actions,
  backgroundImage = "/images/hero/legal-townscape.svg",
  imagePriority = false,
}: FullBleedHeroProps) {
  return (
    <section className="hero-full-bleed relative overflow-hidden rounded-none text-[var(--ink)]">
      <Image
        src={backgroundImage}
        alt=""
        fill
        priority={imagePriority}
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(10,27,45,0.78)_0%,rgba(16,41,66,0.62)_48%,rgba(24,46,73,0.78)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(212,122,42,0.18)_0%,transparent_34%),radial-gradient(circle_at_85%_80%,rgba(139,176,209,0.28)_0%,transparent_42%)]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-20 md:px-8 md:py-24">
        <div className="max-w-4xl rounded-3xl border border-[#c7d4e6] bg-[rgba(248,252,255,0.9)] px-5 py-6 shadow-[0_20px_40px_rgba(12,29,47,0.28)] backdrop-blur-[3px] md:px-8 md:py-8">
          <p className="w-fit rounded-full border border-[#9fb2cb] bg-[#eaf1fa] px-4 py-1 text-xs font-semibold tracking-[0.14em] text-[#25486b]">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-3xl leading-tight text-[#162a43] sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[#314a66]">
            {description}
          </p>

          <div className="flex flex-wrap gap-3 pt-5">
            {actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={
                  action.style === "secondary"
                    ? "rounded-full border border-[#294f74] bg-[rgba(255,255,255,0.85)] px-5 py-3 text-sm font-semibold text-[#1f4263] transition hover:bg-[rgba(241,247,254,0.95)]"
                    : "rounded-full bg-[#274a6e] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95"
                }
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
