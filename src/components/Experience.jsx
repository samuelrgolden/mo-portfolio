import PhotoSlot from "./PhotoSlot.jsx";

/* Each object is one card. To add a photo, set `img` (and `alt`) —
   the placeholder disappears automatically.

   `logo` is the org's mark, badged in the top-right of the card body opposite
   the date. `logoH` is its height in px and is tuned PER LOGO on purpose — a
   wide oval and a tall monogram set to the same height look nothing alike, so
   these are matched by eye for equal weight, not by number. Same reasoning as
   the `h` values in TrustedBy.jsx. Drop `logo` to leave a card unbadged. */
const ROLES = [
  {
    org: "San Francisco Giants",
    role: "G-Team Entertainment Staff",
    date: "Mar 2024 – Present",
    desc: "On-camera activations, contests, and t-shirt tosses for crowds of 42,000+ at Oracle Park.",
    img: "/exp-giants.webp",
    alt: "Maurice hyping the crowd in Giants orange at Oracle Park",
    ratio: "4 / 5",
    logo: "/logos/giants-cap.svg",
    logoH: 27,
  },

  {
    org: "San Francisco 49ers",
    role: "Entertainment Operations / Hype Team",
    date: "Jul 2024 – Jan 2026",
    desc: "Led sponsor activations and hype-team logistics at Levi's. Awarded Rookie of the Year (2024).",
    img: "/exp-niners.webp",
    alt: "Maurice waving a MAKE NOISE flag in 49ers Hype Team red at Levi's Stadium",
    ratio: "4 / 5",
    logo: "/logos/49ers.svg",
    logoH: 23,
  },

  {
    org: "Santa Clara University",
    role: "Arena Host / Hypeman / DJ",
    date: "Sep 2022 – Present",
    desc: "Created the arena-host role at SCU, hosted 4,200+ crowds, and trained a five-person team.",
    img: "/exp-santa-clara.webp",
    alt: "Maurice working the court in a Santa Clara jersey",
    ratio: "4 / 5",
    logo: "/logos/santa-clara.svg",
    logoH: 28,
  },

  {
    org: "Gatsby Event Studios",
    role: "Professional DJ / MC",
    date: "Jun 2018 – 2026",
    desc: "DJ and emcee for hundreds of weddings, festivals, and private events.",
    img: "/exp-gatsby.webp",
    alt: "Maurice behind the decks at a Gatsby event",
    ratio: "4 / 5",
    /* the crest cropped off the full lockup — the wordmark under it was
       unreadable at badge size and duplicated the card title anyway */
    logo: "/logos/gatsby-mark.webp",
    logoH: 26,
  },

  {
    org: "Dancing DJ Productions",
    role: "Professional DJ / MC",
    date: "2026 – Present",
    desc: "Recently partnered with Dancing DJ Productions for the move to San Diego, keeping the private-event work going in Southern California.",
    img: "/exp-dancing-dj.webp",
    alt: "Maurice behind the decks at a private event",
    ratio: "4 / 5",
    logo: "/logos/dancing-dj.webp",
    logoH: 14,
    /* the only card with an outbound link — renders the PORTFOLIO button */
    portfolio: "https://dancingdjproductions.com/about-us/dj-mo/",
  },

  {
    org: "Stern Grove Festival",
    role: "Perimeter Leader",
    date: "Jun 2024 – Present",
    desc: "Runs perimeter operations for the longest-running free music festival in the world with over 10,000 weekly attendees.",
    img: "/exp-stern-grove.webp",
    alt: "Maurice in a Stern Grove Festival perimeter vest looking out over the redwood grove",
    ratio: "4 / 5",
    logo: "/logos/stern-grove.webp",
    logoH: 27,
  },

  {
    org: "GALLO",
    role: "Sales Leadership Development Intern",
    date: "Jun 2025 – Aug 2025",
    desc: "Full-time summer program in San Ramon learning the sales industry from a national brand.",
    img: "/exp-gallo.webp",
    alt: "Maurice with a glass of red wine in front of the illuminated GALLO sign",
    ratio: "4 / 5",
    /* Gallo's mark is a wordmark — there is no standalone icon — so it runs
       small and reads as a badge rather than a second title. */
    logo: "/logos/gallo.svg",
    logoH: 13,
  },

  {
    org: "Santa Cruz Warriors",
    role: "Arena Host",
    date: "Nov 2025 – Apr 2026",
    desc: "Ran on-court contests and promotions at the NBA G-League level.",
    img: "/exp-santa-cruz.webp",
    alt: "Maurice on the NBA G League court with a mic",
    logo: "/logos/santa-cruz-warriors.svg",
    logoH: 27,
  },

  {
    org: "NCVF Championship",
    role: "In-Game DJ",
    date: "Apr 2026",
    desc: "DJ'd the collegiate volleyball championship for ~9,000 attendees, plus the player afterparty.",
    img: "/exp-ncvf.webp",
    alt: "Maurice at the NCVF Collegiate Challenge DJ booth",
    logo: "/logos/ncvf.webp",
    logoH: 26,
  },
];

export default function Experience() {
  return (
    <section id="experience" className="screen border-t border-[var(--line)] bg-[var(--paper)] py-[72px] md:py-20">
      <div className="shell w-full">
        {/* opaque section-coloured panel (incl. the kicker) so the plane + line
            vanish cleanly behind the title rather than showing around the glyphs */}
        <div data-flight="exp-title" className="reveal no-fade relative z-[20] mb-8 bg-[var(--paper)] pb-2 pt-3 text-center">
          <p className="kicker mb-3">Teams &amp; venues</p>
          <h2 className="display m-0 leading-none text-[var(--ink)]" style={{ fontSize: "clamp(2.2rem,4vw,3.2rem)" }}>
            Experience
          </h2>
        </div>

        {/* Collage, not a grid: CSS multi-column lets each card keep its own
            height, so a 4:5 photo doesn't have to be sliced to 16:9. Cards
            stagger naturally from the mixed aspects. `break-inside-avoid`
            stops a card splitting across a column. */}
        {/* Two columns from the smallest screen up, not one: a single column made
            every card a full phone screen, so the wall read as a list you scroll
            forever rather than a collage. Padding and type step down to match —
            an 18px pad and a 21px title inside a ~160px card is mostly padding. */}
        <div data-flight="exp-grid" className="columns-2 gap-3 sm:gap-5 lg:columns-4">
          {ROLES.map((r, i) => (
            <article key={r.org} className="reveal no-fade exp-card relative z-[20] mb-3 break-inside-avoid sm:mb-5" style={{ transitionDelay: `${(i % 4) * 70}ms` }}>
              <PhotoSlot
                src={r.img}
                alt={r.alt || r.org}
                ratio={r.ratio || "16 / 9"}
                rounded="0"
                className="border-0 border-b border-[var(--line)]"
              />
              <div className="p-3 sm:p-[18px]">
                {/* date + org badge share a row: the logo sits opposite the date
                    in the same spot on every card, and the title below keeps the
                    card's full width instead of wrapping around a mark. The date
                    gets min-w-0 so a long range wraps rather than shoving the
                    logo out of the card. */}
                <div className="mb-1.5 flex items-center justify-between gap-2 sm:mb-2 sm:gap-3">
                  <p className="m-0 min-w-0 text-[9.5px] font-semibold uppercase tracking-[0.06em] text-[var(--ac)] sm:text-[11px]">{r.date}</p>
                  {r.logo && (
                    /* decorative: the org name is right below in the h3, so an alt
                       here would just make a screen reader say it twice.
                       Height rides a custom property so index.css can scale every
                       badge down together on phones — an inline height would win
                       against the media query. */
                    <img
                      src={r.logo}
                      alt=""
                      aria-hidden="true"
                      style={{ "--logo-h": `${r.logoH}px` }}
                      className="exp-logo w-auto max-w-[76px] shrink-0 object-contain"
                      loading="lazy"
                      draggable="false"
                    />
                  )}
                </div>
                <h3 className="display m-0 mb-1 text-[15px] leading-[1.1] text-[var(--ink)] sm:text-[21px]">{r.org}</h3>
                <p className="mb-[7px] text-[10.5px] font-semibold text-[var(--muted)] sm:mb-[10px] sm:text-[12.5px]">{r.role}</p>
                <p className="m-0 text-[11px] leading-[1.5] text-[var(--body)] sm:text-[13px] sm:leading-[1.55]">{r.desc}</p>
                {r.portfolio && (
                  <a
                    href={r.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-mini"
                  >
                    Portfolio
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M7 17 17 7M9 7h8v8" />
                    </svg>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
