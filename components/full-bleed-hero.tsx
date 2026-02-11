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
    <section className="hero-full-bleed relative overflow-hidden rounded-none bg-[--base] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(200,138,46,0.38),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(255,255,255,0.07)_0%,_transparent_50%)]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-20 md:px-8 md:py-24">
        <p className="w-fit rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs tracking-[0.14em] text-white/90">
          {eyebrow}
        </p>
        <h1 className="max-w-3xl font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
          {title}
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
          {description}
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          {actions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={
                action.style === "secondary"
                  ? "rounded-full border border-white/50 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  : "rounded-full bg-[--accent] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95"
              }
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
