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
        className="hero-background-motion object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(122deg,rgba(26,44,35,0.76)_0%,rgba(36,58,46,0.62)_48%,rgba(54,44,32,0.74)_100%)]" />
      <div className="hero-overlay-glow absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(212,122,42,0.2)_0%,transparent_36%),radial-gradient(circle_at_84%_76%,rgba(46,90,69,0.28)_0%,transparent_40%)]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-20 md:px-8 md:py-24">
        <div className="hero-panel-motion max-w-4xl rounded-3xl border border-[var(--line)] bg-[rgba(255,251,244,0.9)] px-5 py-6 shadow-[0_20px_40px_rgba(53,39,27,0.3)] backdrop-blur-[3px] md:px-8 md:py-8">
          <p className="hero-animate-eyebrow w-fit rounded-full border border-[var(--line)] bg-[var(--base-soft)] px-4 py-1 text-xs font-semibold tracking-[0.14em] text-[var(--base)]">
            {eyebrow}
          </p>
          <h1 className="hero-animate-title mt-4 max-w-3xl font-serif text-3xl leading-tight text-[var(--base-strong)] sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="hero-animate-description mt-4 max-w-2xl text-base leading-8 text-[var(--ink-soft)]">
            {description}
          </p>

          <div className="flex flex-wrap gap-3 pt-5">
            {actions.map((action, index) => (
              <Link
                key={action.href}
                href={action.href}
                style={{ animationDelay: `${210 + index * 70}ms` }}
                className={
                  action.style === "secondary"
                    ? "hero-action-fade rounded-full border border-[var(--base)] bg-[rgba(255,255,255,0.86)] px-5 py-3 text-sm font-semibold text-[var(--base)] transition hover:bg-[var(--base-soft)]"
                    : "hero-action-fade rounded-full bg-[var(--base)] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95"
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
