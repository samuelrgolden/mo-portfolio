import PhotoSlot from "./PhotoSlot.jsx";
import TrustedBy from "./TrustedBy.jsx";

const PARAGRAPHS = [
  "I'm a Santa Clara marketing grad who loves bringing energy to rooms, crowds, and teams. After five-plus years in live sports entertainment, I've been on mic, on camera, and behind the decks for audiences of up to 65,000.",
  "My through-line is people. I built and trained a five-person hosting team at Santa Clara, I run an 8 person team at the longest running free music festival in the world, and I filled an inegral role in fan engagement with the 49ers while creating a free aviation career fair that drew 900+ attendees and 20+ organizations.",
  "This August I start my sales career at Insight Global, and with my move to San Diego I've partnered with dancing dj productions to continue doing what I love, bringing energy to private events."]

/* his mom's advice, quoted from his own LinkedIn post — stands unattributed */
const QUOTE = {
  text: "Say yes. Show up early. Stay humble. Be yourself.",
};

/* These slide in and pulse an accent glow as they land, then act as jump links.
   `href` points at whichever section actually tells that chip's story — four of
   the five are awards, so they land on Recognition rather than Experience. */
const CHIPS = [
  { label: "Crowds of 65,000", href: "#experience" },
  { label: "Jim Jennings Award", href: "#recognition" },
  { label: "Founded Aviation Exploration Day", href: "#recognition" },
  { label: "49ers Rookie of the Year", href: "#recognition" },
  { label: "Private Pilot", href: "#recognition" },
];

export default function About() {
  return (
    /* one screen: the photo + copy row fills the space, the band sits at the foot */
    <section id="about" className="screen flex flex-col pb-3">
      <div className="shell flex min-h-0 flex-1 items-center py-10">
        {/* items-stretch: both columns share a top AND bottom edge, so the photo
            grows to finish level with the chips row. Column is wider than the
            copy needs, which pushes the text right. */}
        <div className="grid w-full grid-cols-1 items-stretch gap-10 lg:grid-cols-[minmax(0,23.125rem)_1fr] lg:gap-14">
          {/* left: photo — fills the row height on desktop (bottom lands on the
              chips); keeps a 3/4 crop on mobile where the columns stack */}
          <div data-flight="about" className="reveal no-fade relative z-[20]">
            <PhotoSlot
              src="/m3.webp"
              alt="Maurice Lichaa"
              ratio={null}
              rounded="0.25rem"
              className="aspect-[3/4] bg-[var(--panel)] lg:aspect-auto lg:h-full"
            />
          </div>

          {/* right two-thirds: heading, copy, quote, chips */}
          <div>
            <h2
              className="reveal display m-0 mb-6 leading-none text-[var(--ink)]"
              style={{ fontSize: "clamp(2.4rem,5vw,4.4rem)" }}
            >
              About
            </h2>

            {PARAGRAPHS.map((p, i) => (
              <p
                key={i}
                className="reveal leading-[1.62] text-[var(--body)]"
                style={{
                  fontSize: "clamp(0.9375rem,1.15vw,1.0625rem)",
                  margin: `0 0 ${(i === PARAGRAPHS.length - 1 ? 22 : 14) / 16}rem`,
                  transitionDelay: `${60 + i * 60}ms`,
                }}
              >
                {p}
              </p>
            ))}

            <blockquote
              className="reveal m-0 mb-6 border-l-2 border-[var(--ac)] pl-5"
              style={{ transitionDelay: "220ms" }}
            >
              <p className="display m-0 text-[var(--ink)]" style={{ fontSize: "clamp(1.1rem,1.8vw,1.55rem)", lineHeight: 1.25 }}>
                “{QUOTE.text}”
              </p>
            </blockquote>

            <div className="flex flex-wrap gap-[0.625rem]">
              {CHIPS.map((c, i) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="chip reveal chip-glow"
                  style={{ transitionDelay: `${260 + i * 110}ms` }}
                >
                  {c.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* scrolling org band, pinned to the bottom of the screen */}
      <TrustedBy />
    </section>
  );
}
