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
};

export function FullBleedHero({
  eyebrow,
  title,
  description,
  actions,
}: FullBleedHeroProps) {
  return (
    <section className="hero-full-bleed relative overflow-hidden rounded-none text-white">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,_#0a2740_0%,_#0f3658_45%,_#1f517c_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(193,138,54,0.32),_transparent_52%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0.28)_0%,_rgba(0,0,0,0.45)_100%)]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-20 md:px-8 md:py-24">
        <div className="max-w-4xl rounded-2xl border border-white/15 bg-black/20 px-5 py-6 shadow-[0_16px_36px_rgba(0,0,0,0.26)] backdrop-blur-[2px] md:px-8 md:py-8">
          <p className="w-fit rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs tracking-[0.14em] text-white/95">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-3xl leading-tight drop-shadow-[0_4px_14px_rgba(0,0,0,0.42)] sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] sm:text-base">
            {description}
          </p>

          <div className="flex flex-wrap gap-3 pt-5">
            {actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={
                  action.style === "secondary"
                    ? "rounded-full border border-white/65 bg-black/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/12"
                    : "rounded-full bg-[--accent] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95"
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
