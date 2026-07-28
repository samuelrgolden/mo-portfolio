/* Real logos, in colour. `h` tunes each one optically — logos have wildly
   different aspect ratios, so a single height makes wide wordmarks (Giants,
   Gallo) dominate and tall marks (Santa Clara) disappear. Tune per logo. */
const ORGS = [
  { name: "San Francisco Giants", src: "/logos/giants.svg", h: 40 },
  { name: "San Francisco 49ers", src: "/logos/49ers.svg", h: 46 },
  { name: "Santa Clara Broncos", src: "/logos/santa-clara.svg", h: 52 },
  { name: "Santa Cruz Warriors", src: "/logos/santa-cruz-warriors.svg", h: 52 },
  { name: "Stern Grove Festival", src: "/logos/stern-grove.webp", h: 52 },
  { name: "Gatsby Event Studios", src: "/logos/gatsby.webp", h: 50 },
  { name: "GALLO", src: "/logos/gallo.svg", h: 24 },
  { name: "NCVF", src: "/logos/ncvf.webp", h: 54 },
];

function Group({ hidden = false }) {
  return (
    <ul className="marquee-group" {...(hidden ? { "aria-hidden": "true" } : {})}>
      {ORGS.map((o) => (
        <li key={o.name} className="marquee-item">
          <img
            src={o.src}
            alt={hidden ? "" : o.name}
            style={{ height: `${o.h}px` }}
            className="w-auto max-w-[190px] object-contain"
            loading="lazy"
            draggable="false"
          />
        </li>
      ))}
    </ul>
  );
}

export default function TrustedBy() {
  return (
    /* relative z-30 keeps this band ABOVE the flight-path plane (z-25) so the
       Cessna flies *under* the logos as it passes through About. */
    <div className="relative z-30 border-t border-[var(--line)] bg-[var(--panel)] py-7">
      <p className="kicker mb-5 text-center">Trusted by &amp; working with</p>
      {/* 4 identical groups: the track must still span the screen at the moment
          it loops, and one group is narrower than a desktop viewport.
          Must match `--copies` in .marquee-track. */}
      <div className="marquee">
        <div className="marquee-track">
          <Group />
          <Group hidden />
          <Group hidden />
          <Group hidden />
        </div>
      </div>
    </div>
  );
}
