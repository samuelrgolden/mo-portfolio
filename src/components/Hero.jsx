import PhotoSlot from "./PhotoSlot.jsx";

/* The talents line. Edit each word's `color` here — use a design token
   (var(--ink) = black, var(--ac) = red, var(--gold) = gold, var(--gold-ink)
   = deep gold) or any hex like "#862633".
   `href` jumps to the section that actually carries the proof for that word —
   Pilot's story is the licence card in Recognition, not an Experience role. */
const TALENTS = [
  { word: "Sales", color: "var(--ink)", href: "#experience" }, // black
  { word: "DJ", color: "var(--ac)", href: "#experience" }, // red
  { word: "Pilot", color: "var(--ink)", href: "#recognition" }, // black
  { word: "Host", color: "var(--ac)", href: "#experience" }, // red
];

/* the caption rows at the foot of the photo card */
const CARD = [
  { label: "Based", value: "San Diego, CA" },
  { label: "Education", value: "BS Marketing, SCU '26" },
  { label: "Full-time", value: "Sales at Insight Global", accent: true },
];

/* The caption rows, shared by the two places the card appears: inside the photo
   card from md up, and as a standalone card on phones (where the photo sheds
   its frame). One definition so the rows can never drift apart. */
function CardRows() {
  return CARD.map((row, i) => (
    <div
      key={row.label}
      className={`flex items-baseline justify-between gap-3 py-2 ${i < CARD.length - 1 ? "border-b border-[var(--line)]" : ""}`}
    >
      <dt className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-[var(--kicker)]">{row.label}</dt>
      <dd className={`m-0 text-right text-[0.875rem] font-semibold ${row.accent ? "text-[var(--ac)]" : "text-[var(--ink)]"}`}>
        {row.value}
      </dd>
    </div>
  ));
}

export default function Hero() {
  return (
    <section id="top" className="screen flex flex-col justify-start pb-8 pt-4 md:pb-20 md:pt-8">
      {/* Masthead frame — mirrors Lily: a kicker row bracketed by solid hairlines that
          run full-bleed to the screen edges, while the labels sit at the nav gutter.
          The relocation line now lives in the centre. */}
      <div className="h-px w-full bg-[var(--line-strong)]" />
      <div className="edge relative flex items-center justify-between gap-4 py-2.5 md:py-3.5">
        <span className="kicker !text-[var(--ink)]">Maurice &ldquo;Mo&rdquo; Lichaa</span>
        <span className="kicker absolute left-1/2 hidden -translate-x-1/2 whitespace-nowrap !tracking-[0.4em] md:block">
          San Francisco <span className="text-[var(--gold-ink)]">&rarr;</span> San Diego
        </span>
        <span className="kicker whitespace-nowrap">The DJ Wild</span>
      </div>

      {/* screen in thirds — items-stretch so the text column matches the card's height.
          Below md the same three children restack as photo → copy → CTAs; the
          `hero-*` classes in index.css own that and stop at the md breakpoint. */}
      <div className="hero-grid edge mt-2 grid grid-cols-1 items-stretch gap-6 md:gap-10 lg:grid-cols-[2fr_1fr] lg:gap-12">
        {/* ---- left two-thirds: copy at top, CTAs pinned to the bottom ---- */}
        <div className="flex flex-col justify-between">
          {/* copy block shifted down 40px: text 1's bottom lands at text 2's old top,
              text 2 + 3 follow by the same amount so their spacing is unchanged */}
          <div className="hero-copy mt-10">
            <h1 className="reveal display hero-name m-0 whitespace-nowrap text-[var(--ink)]">
              Mo <span className="text-[var(--ac)]">Lichaa</span>
            </h1>

            <p className="display hero-talents m-0 mt-[1.875rem]">
              {TALENTS.map((t, i) => (
                <span key={t.word}>
                  {i > 0 && <span className="text-[var(--gold)]"> · </span>}
                  {/* the <a> IS the float wrapper — nesting one inside would give the
                      link a static box while the word drifted away from it */}
                  <a href={t.href} className="talent-float talent-link" style={{ "--i": i }}>
                    <span className="talent-mask">
                      <span
                        className="reveal talent"
                        style={{ color: t.color, transitionDelay: `${260 + i * 150}ms` }}
                      >
                        {t.word}
                      </span>
                    </span>
                  </a>
                </span>
              ))}
            </p>

            <p
              className="reveal hero-lede m-0 mt-8 leading-[1.6] text-[var(--body)]"
              style={{ transitionDelay: "820ms" }}
            >
              Santa Clara marketing grad, starting in sales with Insight Global this August.
              Five years of fan engagement for the Giants, the 49ers, and Santa Clara
              Athletics. Eight years hosting and behind the decks with Gatsby event studios, recently partnered with Dancing Dj Productions.
            </p>
          </div>

          {/* Phones only: the caption rows detach from the photo card (which sheds
              its frame there) and stand as their own card, filling the gap
              `justify-between` opens up between the talents line and the CTAs.
              Same rows, same chrome, same width as the photo above it. */}
          {/* type steps down from the desktop card's — the rows are the same
              content at a smaller scale, so the card takes less of the screen */}
          <dl className="reveal my-2 w-[min(78vw,42svh)] self-center rounded-none border border-[var(--line)] bg-[#fbf9f3] px-3.5 py-0.5 shadow-[0_0.125rem_1.125rem_rgba(23,21,15,0.05)] [&>div]:py-1 [&_dd]:text-[0.65625rem] [&_dt]:text-[0.5rem] [&_dt]:tracking-[0.12em] md:hidden" style={{ transitionDelay: "860ms" }}>
            <CardRows />
          </dl>

          {/* CTAs — centered, pinned to the bottom so they line up with the card */}
          <div className="reveal hero-cta flex flex-wrap justify-center gap-5 pt-10" style={{ transitionDelay: "900ms" }}>
            <a href="#contact" data-flight="start" className="btn btn-fill relative z-[20]"><span>Contact</span></a>
            <a
              href="https://www.linkedin.com/in/maurice-mo-lichaa"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <span>Connect</span>
            </a>
          </div>
        </div>

        {/* ---- right third: the photo card. On phones `.hero-photo` strips the
             frame and moves it to the top of the stack (see index.css). ---- */}
        <div
          className="reveal hero-photo flex flex-col self-start rounded-2xl border border-[var(--line)] bg-[#fbf9f3] p-3 shadow-[0_0.125rem_1.125rem_rgba(23,21,15,0.05)]"
          style={{ transitionDelay: "160ms" }}
        >
          <PhotoSlot
            src="/m1.webp"
            alt="Maurice Lichaa at his Santa Clara University graduation"
            ratio="1 / 1"
            rounded="0.75rem"
            className="bg-[var(--panel)]"
          />
          <dl className="m-0 px-1 pt-3">
            <CardRows />
          </dl>
        </div>
      </div>
    </section>
  );
}
