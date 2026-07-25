import { useEffect, useState } from "react";
import PhotoSlot from "./PhotoSlot.jsx";

/* The collage: one tall card on the left, then wide featured cards on the right.
   The tall card is a slideshow — it opens on the first photo and cross-fades to
   the next every ~2.5s. Add/reorder objects in `photos` to change the rotation. */
const TALL = {
  title: "Private Pilot's License",
  meta: "Certified December 2022",
  photos: [
    { src: "/rec-pilot-m8.webp", alt: "Maurice, newly certified private pilot" },
    { src: "/rec-pilot-m9.webp", alt: "Maurice, private pilot" },
    { src: "/rec-pilot-m10.webp", alt: "Maurice, private pilot" },
    { src: "/rec-pilot-m11.webp", alt: "Maurice, private pilot" },
    { src: "/rec-pilot-m12.webp", alt: "Maurice, private pilot" },
    { src: "/rec-pilot.webp", alt: "Aerial view of San Francisco from the cockpit, shot by Maurice while flying" },
  ],
};

const FEATURED = [
  {
    title: "Jim Jennings Award",
    meta: "Santa Clara Athletics, 2026",
    blurb: "Presented annually to a non-student-athlete for service and dedication to the athletics department — awarded at the end-of-year banquet.",
    img: "/rec-jimjennings.webp",
    alt: "Jim Jennings Award graphic featuring Maurice in a Broncos jersey",
  },
  {
    title: "Aviation Exploration Day",
    meta: "Founder · 2025",
    blurb: "An eight-month personal project where I built a free career fair introducing the public to jobs in aviation. Drew 900+ attendees and 14 organizations.",
    img: "/rec-aviation.webp",
    alt: "Aviation Exploration Day 2025 event flyer",
  },
  {
    title: "Rookie of the Year",
    meta: "San Francisco 49ers · 2024",
    blurb: "Named the top first-year member of the 49ers game-day entertainment team, recognized for sponsor activations and hype-team logistics at Levi's Stadium.",
    img: "/exp-niners.webp",
    alt: "Maurice waving a MAKE NOISE flag in 49ers Hype Team red at Levi's Stadium",
  },
];

/* Auto-advancing cross-fade slideshow. Starts on photos[0], advances every
   `interval` ms, and holds still when the visitor prefers reduced motion. */
function PhotoRotator({ photos, interval = 2500, ratio = "4 / 5", rounded = "2px" }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (photos.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % photos.length), interval);
    return () => clearInterval(id);
  }, [photos.length, interval]);

  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: ratio, borderRadius: rounded }}>
      {photos.map((p, i) => (
        <img
          key={p.src}
          src={p.src}
          alt={p.alt || ""}
          loading={i === 0 ? "eager" : "lazy"}
          aria-hidden={i === idx ? undefined : true}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === idx ? 1 : 0 }}
        />
      ))}
    </div>
  );
}

function Caption({ title, meta }) {
  return (
    <div className="pt-3">
      <div className="mb-2 h-px w-full bg-[var(--line-strong)]" />
      <h3 className="display m-0 mb-[3px] text-[19px] leading-[1.15] text-[var(--ink)]">{title}</h3>
      <p className="m-0 text-[12.5px] font-medium text-[var(--muted)]">{meta}</p>
    </div>
  );
}

export default function Recognition() {
  return (
    <section id="recognition" className="screen flex flex-col justify-center border-t border-[var(--line)] bg-[var(--panel)] py-[72px] md:py-20">
      <div className="shell grid w-full grid-cols-1 gap-7 md:grid-cols-[minmax(0,380px)_1fr] md:gap-10">
        {/* left: heading + tall card */}
        <div className="reveal no-fade relative z-[20]">
          {/* opaque panel (incl. the kicker) so the plane + line vanish cleanly
              behind the title; pb-7 carries the old h2 spacing to the card */}
          <div data-flight="rec-title" className="relative z-[20] bg-[var(--panel)] pb-7 pt-1">
            <p className="kicker mb-3">Beyond the mic</p>
            <h2 className="display m-0 leading-none text-[var(--ink)]" style={{ fontSize: "clamp(2.2rem,4vw,3.2rem)" }}>
              Recognition<span className="dot">.</span>
            </h2>
          </div>
          <div data-flight="pilot">
            <PhotoRotator photos={TALL.photos} />
          </div>
          <Caption title={TALL.title} meta={TALL.meta} />
        </div>

        {/* right: three wide featured cards */}
        <div className="flex flex-col gap-6 md:gap-7">
          {FEATURED.map((f, i) => (
            <div
              key={f.title}
              className="reveal grid grid-cols-1 overflow-hidden rounded-[10px] border border-[var(--line)] bg-white sm:grid-cols-[1fr_minmax(0,200px)]"
              style={{ transitionDelay: `${80 + i * 90}ms` }}
            >
              <div className="flex flex-col justify-center p-6">
                <h3 className="display m-0 mb-1 text-[23px] leading-[1.1] text-[var(--ink)]">{f.title}</h3>
                <p className="m-0 mb-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--ac)]">{f.meta}</p>
                <p className="m-0 text-[13px] leading-[1.55] text-[var(--body)]">{f.blurb}</p>
              </div>
              <PhotoSlot src={f.img} alt={f.alt || f.title} label="Pic" ratio="1 / 1" rounded="0" className="h-full border-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
