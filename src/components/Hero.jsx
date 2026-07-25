import PhotoSlot from "./PhotoSlot.jsx";

/* The talents line. Edit each word's `color` here — use a design token
   (var(--ink) = black, var(--ac) = red, var(--gold) = gold, var(--gold-ink)
   = deep gold) or any hex like "#862633". */
const TALENTS = [
  { word: "Sales", color: "var(--ink)" }, // black
  { word: "DJ", color: "var(--ac)" }, // red
  { word: "Pilot", color: "var(--ink)" }, // black
  { word: "Emcee", color: "var(--ac)" }, // red
];

/* the caption rows at the foot of the photo card */
const CARD = [
  { label: "Based", value: "San Diego, CA" },
  { label: "Education", value: "BS Marketing, SCU '26" },
  { label: "Currently", value: "Sales at Insight Global", accent: true },
];

export default function Hero() {
  return (
    <section id="top" className="screen flex flex-col justify-start pb-20 pt-8">
      {/* Masthead frame — mirrors Lily: a kicker row bracketed by solid hairlines that
          run full-bleed to the screen edges, while the labels sit at the nav gutter.
          The relocation line now lives in the centre. */}
      <div className="h-px w-full bg-[var(--line-strong)]" />
      <div className="edge relative flex items-center justify-between gap-4 py-3.5">
        <span className="kicker !text-[var(--ink)]">Maurice &ldquo;Mo&rdquo; Lichaa</span>
        <span className="kicker absolute left-1/2 hidden -translate-x-1/2 whitespace-nowrap !tracking-[0.4em] md:block">
          San Francisco <span className="text-[var(--gold-ink)]">&rarr;</span> San Diego
        </span>
        <span className="kicker whitespace-nowrap">The DJ Wild</span>
      </div>

      {/* screen in thirds — items-stretch so the text column matches the card's height */}
      <div className="edge mt-2 grid grid-cols-1 items-stretch gap-10 lg:grid-cols-[2fr_1fr] lg:gap-12">
        {/* ---- left two-thirds: copy at top, CTAs pinned to the bottom ---- */}
        <div className="flex flex-col justify-between">
          {/* copy block shifted down 40px: text 1's bottom lands at text 2's old top,
              text 2 + 3 follow by the same amount so their spacing is unchanged */}
          <div className="mt-10">
            <h1
              className="reveal display m-0 whitespace-nowrap text-[var(--ink)]"
              style={{ fontSize: "clamp(2.4rem,9.5vw,11rem)" }}
            >
              Mo <span className="text-[var(--ac)]">Lichaa.</span>
            </h1>

            <p
              className="display m-0 mt-[30px]"
              style={{ fontSize: "clamp(1.4rem,5.6vw,6.4rem)" }}
            >
              {TALENTS.map((t, i) => (
                <span key={t.word}>
                  {i > 0 && <span className="text-[var(--gold)]"> · </span>}
                  <span className="talent-float" style={{ "--i": i }}>
                    <span className="talent-mask">
                      <span
                        className="reveal talent"
                        style={{ color: t.color, transitionDelay: `${260 + i * 150}ms` }}
                      >
                        {t.word}
                      </span>
                    </span>
                  </span>
                </span>
              ))}
            </p>

            <p
              className="reveal m-0 mt-8 leading-[1.6] text-[var(--body)]"
              style={{ fontSize: "clamp(15px,1.35vw,19px)", transitionDelay: "820ms" }}
            >
              Santa Clara marketing grad, starting in sales with Insight Global this August.
              Five years on mic and behind the decks for the Giants, the 49ers, and Santa Clara
              Athletics — reading rooms of up to 65,000 people.
            </p>
          </div>

          {/* CTAs — centered, pinned to the bottom so they line up with the card */}
          <div className="reveal flex flex-wrap justify-center gap-5 pt-10" style={{ transitionDelay: "900ms" }}>
            <a href="#contact" data-flight="start" className="btn btn-fill relative z-[20]"><span>Contact<span className="dot">.</span></span></a>
            <a
              href="https://www.linkedin.com/in/maurice-mo-lichaa"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <span>Connect<span className="dot">.</span></span>
            </a>
          </div>
        </div>

        {/* ---- right third: the photo card ---- */}
        <div
          className="reveal flex flex-col self-start rounded-2xl border border-[var(--line)] bg-[#fbf9f3] p-3 shadow-[0_2px_18px_rgba(23,21,15,0.05)]"
          style={{ transitionDelay: "160ms" }}
        >
          <PhotoSlot
            src="/m1.webp"
            alt="Maurice Lichaa at his Santa Clara University graduation"
            ratio="1 / 1"
            rounded="12px"
            className="bg-[var(--panel)]"
          />
          <dl className="m-0 px-1 pt-3">
            {CARD.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-baseline justify-between gap-3 py-2 ${i < CARD.length - 1 ? "border-b border-[var(--line)]" : ""}`}
              >
                <dt className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--kicker)]">{row.label}</dt>
                <dd className={`m-0 text-right text-[14px] font-semibold ${row.accent ? "text-[var(--ac)]" : "text-[var(--ink)]"}`}>
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
