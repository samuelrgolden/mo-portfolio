import { useEffect, useState } from "react";
import PhotoSlot from "./PhotoSlot.jsx";

/* Each object is one card. To add a photo, set `img` (and `alt`) —
   the placeholder disappears automatically.

   `logo` is the org's mark, badged in the top-right of the card body opposite
   the date. `logoH` is its height and is tuned PER LOGO on purpose — a wide
   oval and a tall monogram set to the same height look nothing alike, so these
   are matched by eye for equal weight, not by number. Same reasoning as the `h`
   values in TrustedBy.jsx. Written as px-at-a-16px-root and divided by 16 at
   the point of use, so the badge scales with the root font size like everything
   else. Drop `logo` to leave a card unbadged. */
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

];

/* NCVF lives outside ROLES because it doesn't get dealt into the columns with
   the rest — it shares the collage's bottom row with the Professionally card,
   sitting in the fourth column slot directly under Santa Cruz Warriors while
   Professionally takes the three column widths to its left. Everything else
   about it is an ordinary collage card. */
const LAST = {
  org: "NCVF Championship",
  role: "In-Game DJ",
  date: "Apr 2026",
  desc: "DJ'd the collegiate volleyball championship for ~9,000 attendees, plus the player afterparty.",
  img: "/exp-ncvf.webp",
  alt: "Maurice at the NCVF Collegiate Challenge DJ booth",
  logo: "/logos/ncvf.webp",
  logoH: 26,
};

/* The feature card, called out from the collage because it's the job, not a
   gig — sales at Insight Global starting Aug 2026. Same card language as the
   rest of Experience (date/logo row, org, role, desc), plus a photo column and
   a big "Professionally" flag that the small cards don't get. */
const PROFESSIONAL = {
  org: "Insight Global",
  role: "Sales Associate",
  date: "Aug 2026 – Present",
  desc: "Starting a sales career in San Diego, joining Alyssa McNeely's team after graduating from Santa Clara University.",
  img: "/m3.webp",
  alt: "Maurice Lichaa professional headshot",
  logo: "/logos/insight-global.png",
  logoH: 26,
};

/* One card in the collage. `i` is the card's index in ROLES, used only for the
   staggered reveal delay. */
function RoleCard({ r, i }) {
  return (
    <article className="reveal no-fade exp-card relative z-[20]" style={{ transitionDelay: `${(i % 4) * 70}ms` }}>
      <PhotoSlot
        src={r.img}
        alt={r.alt || r.org}
        ratio={r.ratio || "16 / 9"}
        rounded="0"
        className="border-0 border-b border-[var(--line)]"
      />
      <div className="p-3 sm:p-[1.125rem]">
        {/* date + org badge share a row: the logo sits opposite the date
            in the same spot on every card, and the title below keeps the
            card's full width instead of wrapping around a mark. The date
            gets min-w-0 so a long range wraps rather than shoving the
            logo out of the card. */}
        <div className="mb-1.5 flex items-center justify-between gap-2 sm:mb-2 sm:gap-3">
          <p className="m-0 min-w-0 text-[0.59375rem] font-semibold uppercase tracking-[0.06em] text-[var(--ac)] sm:text-[0.6875rem]">{r.date}</p>
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
              style={{ "--logo-h": `${r.logoH / 16}rem` }}
              className="exp-logo w-auto max-w-[4.75rem] shrink-0 object-contain"
              loading="lazy"
              draggable="false"
            />
          )}
        </div>
        <h3 className="display m-0 mb-1 text-[0.9375rem] leading-[1.1] text-[var(--ink)] sm:text-[1.3125rem]">{r.org}</h3>
        <p className="mb-[0.4375rem] text-[0.65625rem] font-semibold text-[var(--muted)] sm:mb-[0.625rem] sm:text-[0.78125rem]">{r.role}</p>
        <p className="m-0 text-[0.6875rem] leading-[1.5] text-[var(--body)] sm:text-[0.8125rem] sm:leading-[1.55]">{r.desc}</p>
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
  );
}

/* How many collage columns are showing — 4 at lg (64rem), 2 below. Has to be
   read in JS rather than left to CSS: the cards are dealt into the columns
   round-robin (see below), and you cannot deal a list in JSX without knowing
   how many piles there are. Mirrors the `lg:` breakpoint. */
function useColumnCount() {
  const query = "(min-width: 64rem)";
  const [cols, setCols] = useState(() => (window.matchMedia(query).matches ? 4 : 2));
  useEffect(() => {
    const mq = window.matchMedia(query);
    const sync = () => setCols(mq.matches ? 4 : 2);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return cols;
}

export default function Experience() {
  const cols = useColumnCount();

  /* Deal the cards across the columns round-robin — card 0 to column 0, card 1
     to column 1, and so on — so ROLES order IS reading order: left to right
     along the top row, then down. CSS multi-column (the old `columns-4`) fills
     each column top-to-bottom before starting the next, which meant reordering
     the array moved cards somewhere unpredictable. Each column is its own flex
     stack, so cards still keep their natural heights and the collage still
     staggers. Original index rides along for the reveal delay. */
  const columns = Array.from({ length: cols }, () => []);
  ROLES.forEach((role, i) => columns[i % cols].push({ role, i }));

  return (
    <section id="experience" className="screen border-t border-[var(--line)] bg-[var(--paper)] py-[4.5rem] md:py-20">
      <div className="shell w-full">
        {/* opaque section-coloured panel (incl. the kicker) so the plane + line
            vanish cleanly behind the title rather than showing around the glyphs */}
        <div data-flight="exp-title" className="reveal no-fade relative z-[20] mb-8 bg-[var(--paper)] pb-2 pt-3 text-center">
          <p className="kicker mb-3">Teams &amp; venues</p>
          <h2 className="display m-0 leading-none text-[var(--ink)]" style={{ fontSize: "clamp(2.2rem,4vw,3.2rem)" }}>
            Experience
          </h2>
        </div>

        {/* Collage, not a grid: each column is a flex stack, so a card keeps its
            own height and a 4:5 photo doesn't have to be sliced to 16:9. Cards
            stagger naturally from the mixed aspects. */}
        {/* Two columns from the smallest screen up, not one: a single column made
            every card a full phone screen, so the wall read as a list you scroll
            forever rather than a collage. Padding and type step down to match —
            an 18px pad and a 21px title inside a ~160px card is mostly padding. */}
        <div data-flight="exp-grid" className="flex items-start gap-3 sm:gap-5">
          {columns.map((column, ci) => (
            <div key={ci} className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-5">
              {column.map(({ role, i }) => (
                <RoleCard key={role.org} r={role} i={i} />
              ))}
            </div>
          ))}
        </div>

        {/* The collage's bottom row. Professionally takes three of the four
            column widths and NCVF takes the fourth, so NCVF lands directly
            under Santa Cruz Warriors and the row reads as part of the wall
            above rather than a banner sitting beneath it — same gaps, same
            column rhythm, same card chrome (.exp-card). Below lg the wall is
            two columns, so Professionally spans both and NCVF drops to the
            column under it. items-start keeps each card its natural height
            instead of stretching the shorter one to match. */}
        <div className="mt-3 grid grid-cols-2 items-start gap-3 sm:mt-5 sm:gap-5 lg:grid-cols-4">
          <article className="reveal no-fade exp-card relative z-[20] col-span-2 lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,15rem)_1fr]">
              <PhotoSlot
                src={PROFESSIONAL.img}
                alt={PROFESSIONAL.alt}
                ratio="3 / 4"
                rounded="0"
                className="border-0 border-b border-[var(--line)] sm:border-b-0 sm:border-r"
              />
              <div className="flex flex-col justify-center p-4 sm:p-6">
                <p
                  className="display m-0 mb-2 leading-none text-[var(--ac)]"
                  style={{ fontSize: "clamp(1.5rem,3.2vw,2.375rem)" }}
                >
                  Professionally
                </p>
                <div className="mb-1.5 flex items-center justify-between gap-2 sm:mb-2 sm:gap-3">
                  <p className="m-0 min-w-0 text-[0.59375rem] font-semibold uppercase tracking-[0.06em] text-[var(--ac)] sm:text-[0.6875rem]">{PROFESSIONAL.date}</p>
                  <img
                    src={PROFESSIONAL.logo}
                    alt=""
                    aria-hidden="true"
                    style={{ "--logo-h": `${PROFESSIONAL.logoH / 16}rem`, maxWidth: "7.5rem" }}
                    className="exp-logo w-auto shrink-0 object-contain"
                    loading="lazy"
                    draggable="false"
                  />
                </div>
                <h3 className="display m-0 mb-1 text-[1.1875rem] leading-[1.1] text-[var(--ink)] sm:text-[1.5625rem]">{PROFESSIONAL.org}</h3>
                <p className="mb-[0.4375rem] text-[0.65625rem] font-semibold text-[var(--muted)] sm:mb-[0.625rem] sm:text-[0.78125rem]">{PROFESSIONAL.role}</p>
                <p className="m-0 max-w-[34rem] text-[0.6875rem] leading-[1.5] text-[var(--body)] sm:text-[0.8125rem] sm:leading-[1.55]">{PROFESSIONAL.desc}</p>
              </div>
            </div>
          </article>

          {/* i=3 so its reveal delay matches the other fourth-column cards.
              Hidden below lg: the card only has a home in the four-column
              bottom row: in the two-column stack it lands as a lone half-width
              card under Professionally, which is the thing worth cutting. */}
          <div className="hidden lg:-mt-50 lg:block"><RoleCard r={LAST} i={3} /></div>
        </div>
      </div>
    </section>
  );
}
