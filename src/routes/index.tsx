import { createFileRoute } from "@tanstack/react-router";
import posterAsset from "@/assets/el-gallo-poster.png.asset.json";
import { Flourish, CornerHeart, Divider } from "@/components/el-gallo-ornaments";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tattoos By El Gallo — Traditional American Tattooing" },
      {
        name: "description",
        content:
          "Bold, bright, and built to last. Traditional American tattoos by El Gallo. Walk-ins, flash, and custom appointments.",
      },
      { property: "og:title", content: "Tattoos By El Gallo — Traditional American Tattooing" },
      {
        property: "og:description",
        content: "Bold, bright, and built to last. Traditional American tattoos by El Gallo. Walk-ins, flash, and custom appointments.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen text-ink">
      <TopBar />
      <Hero />
      <MarqueeStrip />
      <About />
      <Portfolio />
      <Flash />
      <Booking />
      <Footer />
    </div>
  );
}

function TopBar() {
  return (
    <header className="relative z-20 border-b-2 border-blood/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-3">
          <span className="font-display text-2xl leading-none tracking-tight">
            El <span className="text-blood italic">Gallo</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 font-sans text-sm uppercase tracking-[0.18em] md:flex">
          <a href="#portfolio" className="hover:text-blood">Portfolio</a>
          <a href="#flash" className="hover:text-blood">Flash</a>
          <a href="#about" className="hover:text-blood">The Shop</a>
          <a href="#booking" className="hover:text-blood">Booking</a>
        </nav>
        <a
          href="#booking"
          className="hidden rounded-sm border-2 border-blood bg-blood px-4 py-2 font-sans text-xs uppercase tracking-[0.2em] text-paper transition hover:bg-blood-deep md:inline-block"
        >
          Book a Session
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pb-24 pt-16 md:grid-cols-12 md:gap-8 md:pt-20">
        <div className="relative md:col-span-7">
          <div className="mb-6 flex items-center gap-3 font-sans text-xs uppercase tracking-[0.35em] text-blood">
            <span className="h-px w-10 bg-blood" />
            Est. Traditional Tattooing
          </div>

          <Flourish className="mb-4 h-8 w-64 text-blood" />

          <h1 className="font-display text-[clamp(3.75rem,10vw,8.5rem)] font-normal leading-[0.9] tracking-tight">
            Tattoos
            <span className="mx-3 italic text-blood">by</span>
            <br />
            <span className="text-blood">El Gallo</span>
          </h1>

          <Flourish className="mt-4 h-8 w-64 -scale-y-100 text-blood" />

          <p className="mt-8 max-w-lg font-sans text-base leading-relaxed text-ink/80">
            Bold lines. Solid black. Bright color. Old-school American tattooing done
            the way it was meant to be — one clean stab at a time. Walk-ins welcome,
            appointments preferred.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#booking"
              className="rounded-sm border-2 border-blood bg-blood px-6 py-3 font-sans text-sm uppercase tracking-[0.2em] text-paper transition hover:bg-blood-deep"
            >
              Request a piece
            </a>
            <a
              href="#portfolio"
              className="rounded-sm border-2 border-ink px-6 py-3 font-sans text-sm uppercase tracking-[0.2em] text-ink transition hover:bg-ink hover:text-paper"
            >
              See the work
            </a>
          </div>

          <div className="mt-12 grid max-w-md grid-cols-3 gap-6 font-sans text-xs uppercase tracking-[0.2em] text-ink/70">
            <Stat kicker="Since" value="2016" />
            <Stat kicker="Pieces" value="1,200+" />
            <Stat kicker="Style" value="Traditional" />
          </div>
        </div>

        <div className="relative md:col-span-5">
          <div className="relative mx-auto max-w-sm">
            <div className="paper-frame bg-paper-deep p-3 shadow-[8px_10px_0_0_var(--ink)]">
              <CornerHeart className="absolute -left-[7px] -top-[7px] h-3 w-3 text-blood" />
              <CornerHeart className="absolute -right-[7px] -top-[7px] h-3 w-3 text-blood" />
              <CornerHeart className="absolute -bottom-[7px] -left-[7px] h-3 w-3 text-blood" />
              <CornerHeart className="absolute -bottom-[7px] -right-[7px] h-3 w-3 text-blood" />
              <img
                src={posterAsset.url}
                alt="Tattoos By El Gallo — traditional rooster flash poster"
                className="block h-auto w-full select-none"
                draggable={false}
              />
            </div>
            <div className="pointer-events-none absolute -right-6 -top-6 hidden font-display text-6xl italic text-blood/20 md:block">
              ¡Kikirikí!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ kicker, value }: { kicker: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] tracking-[0.3em]">{kicker}</div>
      <div className="mt-1 font-display text-2xl normal-case tracking-tight text-ink">
        {value}
      </div>
    </div>
  );
}

function MarqueeStrip() {
  const items = [
    "Bold Will Hold",
    "Traditional American",
    "Walk-Ins Welcome",
    "Custom Flash",
    "By Appointment",
    "El Gallo",
  ];
  return (
    <div className="border-y-2 border-blood bg-ink py-4 text-paper">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 font-display text-xl italic">
        {items.map((t, i) => (
          <span key={t} className="flex items-center gap-6">
            <span>{t}</span>
            {i < items.length - 1 && <span className="text-blood">✦</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader kicker="The Shop" title="One rooster. One machine." />
        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="font-display text-3xl leading-tight md:text-4xl">
              Tattoos <span className="italic text-blood">meant to age well</span> —
              heavy black, saturated color, and lines you can still read across the
              room in thirty years.
            </p>
            <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-ink/80">
              El Gallo works out of a small private studio, one client at a time.
              Everything is single-use, sterilized, and drawn by hand. No trends, no
              filler — just the classic vocabulary of American traditional: eagles,
              daggers, roses, panthers, hearts on fire.
            </p>
            <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-ink/80">
              If you have an idea, bring it. If you don&apos;t, the flash wall has plenty.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-3 md:col-span-5">
            {[
              ["01", "Single-needle & bold traditional"],
              ["02", "Sterile, single-use setups"],
              ["03", "One tattooer, one client"],
              ["04", "Deposits secure your date"],
            ].map(([n, t]) => (
              <li
                key={n}
                className="flex items-center gap-4 border-2 border-ink/80 bg-paper-deep px-5 py-4"
              >
                <span className="font-display text-2xl text-blood">{n}</span>
                <span className="font-sans text-sm uppercase tracking-[0.15em]">
                  {t}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const items = [
    { title: "Rose & Dagger", tag: "Forearm" },
    { title: "Panther Head", tag: "Thigh" },
    { title: "Swallow Pair", tag: "Chest" },
    { title: "Heart in Hand", tag: "Bicep" },
    { title: "Eagle Back", tag: "Back" },
    { title: "Skull & Rose", tag: "Calf" },
  ];
  return (
    <section id="portfolio" className="relative border-y-2 border-blood/50 bg-paper-deep py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader kicker="Portfolio" title="Recent work" />
        <p className="mt-4 max-w-xl font-sans text-sm uppercase tracking-[0.18em] text-ink/70">
          Pieces coming soon — El Gallo is preparing the gallery.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {items.map((it, i) => (
            <figure
              key={it.title}
              className="paper-frame group relative aspect-[3/4] overflow-hidden bg-paper"
            >
              <CornerHeart className="absolute -left-[6px] -top-[6px] h-2.5 w-2.5 text-blood" />
              <CornerHeart className="absolute -right-[6px] -top-[6px] h-2.5 w-2.5 text-blood" />
              <CornerHeart className="absolute -bottom-[6px] -left-[6px] h-2.5 w-2.5 text-blood" />
              <CornerHeart className="absolute -bottom-[6px] -right-[6px] h-2.5 w-2.5 text-blood" />
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
                <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-blood">
                  Plate № {String(i + 1).padStart(2, "0")}
                </span>
                <Flourish className="h-5 w-28 text-blood/70" />
                <span className="font-display text-2xl leading-tight">{it.title}</span>
                <span className="font-sans text-xs uppercase tracking-[0.25em] text-ink/60">
                  {it.tag}
                </span>
                <Flourish className="h-5 w-28 -scale-y-100 text-blood/70" />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Flash() {
  return (
    <section id="flash" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader kicker="Flash" title="Grab one off the wall." />
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              title: "Small",
              size: "Up to 3 in.",
              price: "$120",
              blurb: "Hearts, swallows, daggers, roses — pick from the sheet.",
            },
            {
              title: "Medium",
              size: "3 – 6 in.",
              price: "$260",
              blurb: "Classic single-panel flash. Bold outline, color fill.",
            },
            {
              title: "Large",
              size: "6 in. and up",
              price: "$480+",
              blurb: "Statement pieces, ribcage, thigh, half-sleeve fillers.",
            },
          ].map((tier) => (
            <div
              key={tier.title}
              className="relative border-2 border-ink bg-paper-deep p-8 shadow-[6px_8px_0_0_var(--blood)]"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-3xl">{tier.title}</h3>
                <span className="font-display text-3xl text-blood">{tier.price}</span>
              </div>
              <div className="mt-1 font-sans text-xs uppercase tracking-[0.25em] text-ink/60">
                {tier.size}
              </div>
              <Divider className="my-5 text-blood/60" />
              <p className="font-sans text-sm leading-relaxed text-ink/80">
                {tier.blurb}
              </p>
              <a
                href="#booking"
                className="mt-6 inline-block font-sans text-xs uppercase tracking-[0.25em] text-blood underline underline-offset-4 hover:text-blood-deep"
              >
                Claim this →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Booking() {
  return (
    <section id="booking" className="relative border-t-2 border-blood/50 bg-ink py-24 text-paper">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-12">
        <div className="md:col-span-6">
          <div className="mb-4 flex items-center gap-3 font-sans text-xs uppercase tracking-[0.35em] text-blood">
            <span className="h-px w-10 bg-blood" />
            Booking
          </div>
          <h2 className="font-display text-5xl leading-[0.95] text-paper md:text-6xl">
            Say the word.
            <br />
            <span className="italic text-blood">Let&apos;s make it permanent.</span>
          </h2>
          <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-paper/70">
            Fastest way to get on the books is a call or DM. Send a reference or a
            rough idea, body placement, and your rough size — El Gallo takes it from
            there.
          </p>

          <div className="mt-10 space-y-4 font-sans">
            <ContactRow label="Phone" value="(442) 677-3344" href="tel:+14426773344" />
            <ContactRow
              label="Instagram"
              value="@el_gallo_tattoo"
              href="https://instagram.com/el_gallo_tattoo"
            />
            <ContactRow label="Hours" value="Tue – Sat · 12–8pm" />
          </div>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="border-2 border-blood bg-paper p-6 text-ink md:col-span-6 md:p-8"
        >
          <div className="mb-6 flex items-center justify-between">
            <span className="font-display text-2xl">Request Form</span>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-blood">
              № 001
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Name" placeholder="Your name" />
            <Field label="Phone or email" placeholder="Best way to reach you" />
            <Field label="Placement" placeholder="Arm, thigh, ribs…" />
            <Field label="Approx. size" placeholder="e.g. 4 in." />
          </div>
          <label className="mt-4 block">
            <span className="mb-1 block font-sans text-[10px] uppercase tracking-[0.25em] text-ink/70">
              Idea
            </span>
            <textarea
              rows={4}
              placeholder="Rose with a dagger, black and red, forearm…"
              className="w-full border-2 border-ink/80 bg-paper-deep px-3 py-2 font-sans text-sm outline-none focus:border-blood"
            />
          </label>
          <button
            type="submit"
            className="mt-6 w-full rounded-sm border-2 border-blood bg-blood px-6 py-3 font-sans text-sm uppercase tracking-[0.25em] text-paper transition hover:bg-blood-deep"
          >
            Send request
          </button>
          <p className="mt-3 font-sans text-[10px] uppercase tracking-[0.2em] text-ink/50">
            Deposit required to confirm — you&apos;ll hear back within 48 hours.
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="mb-1 block font-sans text-[10px] uppercase tracking-[0.25em] text-ink/70">
        {label}
      </span>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full border-2 border-ink/80 bg-paper-deep px-3 py-2 font-sans text-sm outline-none focus:border-blood"
      />
    </label>
  );
}

function ContactRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-baseline justify-between border-b border-paper/20 pb-3">
      <span className="text-[10px] uppercase tracking-[0.3em] text-paper/50">
        {label}
      </span>
      <span className="font-display text-2xl text-paper">{value}</span>
    </div>
  );
  return href ? (
    <a href={href} className="block transition hover:opacity-80">
      {inner}
    </a>
  ) : (
    inner
  );
}

function SectionHeader({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="max-w-3xl">
      <div className="mb-3 flex items-center gap-3 font-sans text-xs uppercase tracking-[0.35em] text-blood">
        <span className="h-px w-10 bg-blood" />
        {kicker}
      </div>
      <h2 className="font-display text-5xl leading-[0.95] md:text-6xl">{title}</h2>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t-2 border-blood bg-paper py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 text-center">
        <Flourish className="h-6 w-40 text-blood" />
        <div className="font-display text-2xl">
          Tattoos By <span className="italic text-blood">El Gallo</span>
        </div>
        <div className="font-sans text-[11px] uppercase tracking-[0.3em] text-ink/60">
          Ph. (442) 677-3344 · @el_gallo_tattoo
        </div>
        <div className="mt-2 font-sans text-[10px] uppercase tracking-[0.25em] text-ink/40">
          © {new Date().getFullYear()} El Gallo Tattoo. Bold will hold.
        </div>
      </div>
    </footer>
  );
}