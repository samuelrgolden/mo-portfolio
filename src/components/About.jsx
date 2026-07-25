import PhotoSlot from "./PhotoSlot.jsx";
import TrustedBy from "./TrustedBy.jsx";

const PARAGRAPHS = [
  "I'm a Santa Clara marketing grad who loves bringing energy to rooms, crowds, and teams. After five-plus years in live sports entertainment, I've been on mic, on camera, and behind the decks for audiences of up to 65,000.",
  "My through-line is people. I built and trained a five-person hosting team at Santa Clara, I run an 8 person team at the longest running free music festival in the world, and I ran entertainment operations and a hype team for the 49ers while creating a free aviation career fair that drew 900+ attendees and 14 organizations.",
  "This August I start my sales career with Insight Global in San Diego — while partnering as a DJ with Dancing Dj Productions to continue bringing the same thing that's worked on every floor and field I've been on: say yes, stay humble, follow through.",
];

/* his mom's advice, quoted from his own LinkedIn post — stands unattributed */
const QUOTE = {
  text: "Say yes. Show up early. Stay humble. Be yourself.",
};

/* these slide in and pulse an accent glow as they land */
const CHIPS = [
  "65,000 crowds",
  "Jim Jennings Award",
  "Founded Aviation Exploration Day",
  "49ers Rookie of the Year",
  "Private Pilot",
];

export default function About() {
  return (
    /* one screen: the photo + copy row fills the space, the band sits at the foot */
    <section id="about" className="screen flex flex-col pb-3">
      <div className="shell flex min-h-0 flex-1 items-center py-10">
        {/* items-stretch: both columns share a top AND bottom edge, so the photo
            grows to finish level with the chips row. Column is wider than the
            copy needs, which pushes the text right. */}
        <div className="grid w-full grid-cols-1 items-stretch gap-10 lg:grid-cols-[minmax(0,370px)_1fr] lg:gap-14">
          {/* left: photo — fills the row height on desktop (bottom lands on the
              chips); keeps a 3/4 crop on mobile where the columns stack */}
          <div data-flight="about" className="reveal no-fade relative z-[20]">
            <PhotoSlot
              src="/m3.webp"
              alt="Maurice Lichaa"
              ratio={null}
              rounded="4px"
              className="aspect-[3/4] bg-[var(--panel)] lg:aspect-auto lg:h-full"
            />
          </div>

          {/* right two-thirds: heading, copy, quote, chips */}
          <div>
            <h2
              className="reveal display m-0 mb-6 leading-none text-[var(--ink)]"
              style={{ fontSize: "clamp(2.4rem,5vw,4.4rem)" }}
            >
              About<span className="dot">.</span>
            </h2>

            {PARAGRAPHS.map((p, i) => (
              <p
                key={i}
                className="reveal leading-[1.62] text-[var(--body)]"
                style={{
                  fontSize: "clamp(15px,1.15vw,17px)",
                  margin: `0 0 ${i === PARAGRAPHS.length - 1 ? 22 : 14}px`,
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

            <div className="flex flex-wrap gap-[10px]">
              {CHIPS.map((c, i) => (
                <span key={c} className="chip reveal chip-glow" style={{ transitionDelay: `${260 + i * 110}ms` }}>
                  {c}
                </span>
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
