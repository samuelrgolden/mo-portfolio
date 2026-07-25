import { useEffect, useState } from "react";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Recognition", href: "#recognition" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => window.innerWidth > 768 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--paper)_88%,transparent)] backdrop-blur-[10px]">
      {/* edge-to-edge: logo hard left, links hard right */}
      <div className="edge flex h-[var(--nav-h)] items-center justify-between">
        <a href="#top" className="display text-[26px] leading-none tracking-[0.02em] text-[var(--ink)] transition-colors hover:text-[var(--ac)]">
          M<span className="text-[var(--ac)]">L.</span>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="navlink">
              {l.label}
            </a>
          ))}
        </nav>

        {/* right group — Resume button (desktop) + hamburger (mobile), mirrors Lily's nav */}
        <div className="flex items-center gap-4">
          <a
            href="/maurice-lichaa-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center rounded-[2px] border-2 border-[var(--ink)] px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.06em] text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)] md:inline-flex"
          >
            Resume<span className="dot">.</span>
          </a>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center text-[var(--ink)] md:hidden"
          >
            <span className="relative block h-[14px] w-[20px]">
              <span className={`absolute left-0 h-[2px] w-full bg-current transition-all duration-300 ${open ? "top-[6px] rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-[6px] h-[2px] w-full bg-current transition-all duration-200 ${open ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute left-0 h-[2px] w-full bg-current transition-all duration-300 ${open ? "top-[6px] -rotate-45" : "top-[12px]"}`} />
            </span>
          </button>
        </div>
      </div>

      <div className={`overflow-hidden border-t bg-[var(--paper)] transition-[max-height] duration-300 md:hidden ${open ? "max-h-80 border-[var(--line)]" : "max-h-0 border-transparent"}`}>
        <nav className="edge flex flex-col py-1">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-[var(--line)] py-3.5 text-[14px] font-semibold uppercase tracking-[0.06em] text-[var(--ink)] transition-colors last:border-b-0 hover:text-[var(--ac)]"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/maurice-lichaa-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="border-b border-[var(--line)] py-3.5 text-[14px] font-semibold uppercase tracking-[0.06em] text-[var(--ac)] transition-colors last:border-b-0 hover:text-[var(--ink)]"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
