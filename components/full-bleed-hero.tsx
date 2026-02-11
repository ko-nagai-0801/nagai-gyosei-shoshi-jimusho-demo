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
    <section className="hero-full-bleed relative overflow-hidden rounded-none text-[var(--ink)]">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,_#f3ead9_0%,_#f9f5ee_45%,_#efe5d3_100%)]" />
      <div className="absolute -left-28 top-8 h-72 w-72 rounded-full bg-[rgba(212,122,42,0.2)] blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[rgba(46,90,69,0.2)] blur-3xl" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-20 md:px-8 md:py-24">
        <div className="max-w-4xl rounded-3xl border border-[var(--line)] bg-[rgba(255,253,248,0.9)] px-5 py-6 shadow-[0_12px_28px_rgba(80,62,40,0.13)] backdrop-blur-[1px] md:px-8 md:py-8">
          <p className="w-fit rounded-full border border-[var(--line)] bg-[var(--base-soft)] px-4 py-1 text-xs font-semibold tracking-[0.14em] text-[var(--base)]">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-3xl leading-tight text-[var(--base-strong)] sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--ink-soft)]">
            {description}
          </p>

          <div className="flex flex-wrap gap-3 pt-5">
            {actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={
                  action.style === "secondary"
                    ? "rounded-full border border-[var(--base)] px-5 py-3 text-sm font-semibold text-[var(--base)] transition hover:bg-[var(--base-soft)]"
                    : "rounded-full bg-[var(--base)] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95"
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
