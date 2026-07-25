import PhotoSlot from "./PhotoSlot.jsx";

const EMAIL = "Itsdjwild@gmail.com";
const DJSITE = "https://dancingdjproductions.com/about-us/dj-mo/";
const LINKEDIN = "https://www.linkedin.com/in/maurice-mo-lichaa";

/* The three ↗ rows. Swap any `href`/`label` — e.g. point the third at
   Instagram once there's a handle to use. */
const LINKS = [
  { label: "Email me", meta: EMAIL, href: `mailto:${EMAIL}` },
  { label: "Résumé", meta: "PDF, one page", href: "/maurice-lichaa-resume.pdf", external: true },
  { label: "Dancing DJ Productions", meta: "DJ · MC · Host", href:DJSITE, external: true },
];

function Arrow() {
  return (
    <svg className="arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="screen flex flex-col justify-center bg-[var(--ink)] py-[76px] text-[var(--paper)] md:py-20">
      <div className="shell grid w-full grid-cols-1 items-center gap-12 md:grid-cols-[360px_1fr] md:gap-20">
        {/* left: grad photo + LinkedIn */}
        <div className="reveal no-fade">
          <div data-flight="end" className="relative z-[20]">
            <PhotoSlot src="/contact-grad.webp" alt="Maurice at his Santa Clara University graduation" ratio="4 / 5" rounded="4px" />
          </div>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-dark mt-5 w-full justify-center"
          >
            LinkedIn <Arrow />
          </a>
        </div>

        {/* right: big text + arrow links */}
        <div>
          <p className="reveal kicker mb-4 text-[color-mix(in_srgb,var(--paper)_55%,transparent)]">Contact</p>
          <h2 className="reveal display m-0 leading-[0.98] text-[var(--paper)]" style={{ fontSize: "clamp(2.6rem,5.5vw,4.6rem)" }}>
            Let's talk.
          </h2>
          <p className="reveal mt-5 max-w-[460px] text-[15.5px] leading-[1.6] text-[color-mix(in_srgb,var(--paper)_72%,transparent)]" style={{ transitionDelay: "80ms" }}>
            Booking an event, filling a game-day spot, or just want to connect? I'd love to hear from you.
          </p>

          <div className="mt-9">
            {LINKS.map((l, i) => (
              <a
                key={l.label}
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="arrow-link reveal"
                style={{ transitionDelay: `${120 + i * 90}ms` }}
              >
                <span className="flex flex-col gap-0.5">
                  <span className="text-[16px] font-semibold">{l.label}</span>
                  <span className="text-[12.5px] text-[color-mix(in_srgb,var(--paper)_55%,transparent)]">{l.meta}</span>
                </span>
                <Arrow />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
