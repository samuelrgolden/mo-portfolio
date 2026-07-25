import { useEffect, useRef, useState } from "react";

/* ============================================================
   The flight path — one Cessna that flies the whole page.
   Modelled on the sam-portfolio throughline: an SVG bezier
   anchored to real element positions, red drawing in behind the
   plane as you scroll, black dashes ahead. The plane banks along
   the tangent and tucks BEHIND the photo, logos, cards, and pilot
   card (they sit at z-20; this SVG is z-10), finally disappearing
   into the grad photo.

   Route: Contact button → behind the About photo → down under the
   logo band → Experience title → S behind the Experience cards →
   Recognition title → down through the Private-Pilot card → into
   the grad photo. Desktop only, aria-hidden.
   ============================================================ */

const STROKE = 3;
const LEAD = 0.6; // fraction of viewport height where the plane rides

// Traced from cessna.jpg — top-down silhouette, nose pointing DOWN (= +y,
// the direction of travel at rest). viewBox 524 × 373, centre (262, 186.5).
const CESSNA =
  "M 262.0 6.5 L 264.5 8.0 L 268.0 50.5 L 277.5 34.0 L 284.0 33.5 L 336.0 41.5 L 339.5 46.0 L 341.5 55.0 L 341.5 69.0 L 338.0 77.5 L 271.5 90.0 L 284.5 204.0 L 297.0 205.5 L 378.0 205.5 L 447.0 216.5 L 518.0 225.5 L 518.5 275.0 L 514.0 280.5 L 498.0 282.5 L 395.0 286.5 L 288.0 286.5 L 284.5 343.0 L 279.0 350.5 L 271.0 351.5 L 267.5 360.0 L 296.0 359.5 L 310.0 360.5 L 310.5 362.0 L 266.0 362.5 L 264.5 367.0 L 261.0 367.5 L 259.0 362.5 L 214.5 362.0 L 215.0 360.5 L 222.0 359.5 L 257.5 360.0 L 254.5 352.0 L 245.0 349.5 L 240.5 343.0 L 237.0 286.5 L 130.0 286.5 L 27.0 282.5 L 13.0 281.5 L 7.5 277.0 L 7.0 225.5 L 15.0 225.5 L 147.0 205.5 L 239.0 205.5 L 240.5 204.0 L 253.5 90.0 L 189.0 78.5 L 186.5 77.0 L 183.5 70.0 L 183.5 55.0 L 185.5 46.0 L 189.0 41.5 L 242.0 33.5 L 247.5 34.0 L 257.0 51.5 L 259.5 16.0 L 262.0 6.5 Z";
const PLANE_W = 42;
const PLANE_SCALE = PLANE_W / 524;

// smooth vertical-flow bezier from (x1,y1) to (x2,y2)
function seg(x1, y1, x2, y2) {
  const my = (y1 + y2) / 2;
  return ` C ${x1.toFixed(1)} ${my.toFixed(1)}, ${x2.toFixed(1)} ${my.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

export default function FlightPath() {
  const [geo, setGeo] = useState(null);
  const [ready, setReady] = useState(false);
  const litRef = useRef(null);
  const planeRef = useRef(null);

  // Hold the whole path hidden until the load reveals have finished, then fade
  // it in. Before that the covers (button, photos, cards) are still animating up
  // from low opacity, so the plane/dashes would show through them.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setReady(true), reduced ? 0 : 1800);
    return () => clearTimeout(t);
  }, []);

  // ---- measure the page and build the path ----
  useEffect(() => {
    let lastSig = "";
    const build = () => {
      if (window.innerWidth < 768) return;
      const q = (k) => document.querySelector(`[data-flight="${k}"]`);
      const keys = ["start", "about", "exp-title", "exp-grid", "rec-title", "pilot", "end"];
      const els = keys.map(q);
      if (els.some((e) => !e)) return;
      const Y = window.scrollY;
      const R = (el) => {
        const r = el.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) return null;
        return { cx: r.left + r.width / 2, cy: r.top + r.height / 2 + Y, top: r.top + Y, bot: r.bottom + Y, left: r.left, right: r.right };
      };
      const [start, about, expTitle, expGrid, recTitle, pilot, end] = els.map(R);
      if (!start || !about || !expTitle || !expGrid || !recTitle || !pilot || !end) return;

      let d = `M ${start.cx.toFixed(1)} ${start.cy.toFixed(1)}`;
      // dive toward the About photo, then straight down behind it
      d += seg(start.cx, start.cy, about.cx, about.top + 14);
      d += ` L ${about.cx.toFixed(1)} ${(about.bot - 14).toFixed(1)}`;
      // out the bottom, down under the logo band, over to the Experience title
      d += seg(about.cx, about.bot - 14, expTitle.cx, expTitle.cy);
      // S-curve behind the Experience cards
      const gw = expGrid.right - expGrid.left;
      const gh = expGrid.bot - expGrid.top;
      const s1 = { x: expGrid.left + gw * 0.28, y: expGrid.top + gh * 0.26 };
      const s2 = { x: expGrid.left + gw * 0.72, y: expGrid.top + gh * 0.54 };
      const s3 = { x: expGrid.left + gw * 0.36, y: expGrid.bot - gh * 0.1 };
      d += seg(expTitle.cx, expTitle.cy, s1.x, s1.y);
      d += seg(s1.x, s1.y, s2.x, s2.y);
      d += seg(s2.x, s2.y, s3.x, s3.y);
      // over to the Recognition title, then down through the pilot card
      d += seg(s3.x, s3.y, recTitle.cx, recTitle.cy);
      d += seg(recTitle.cx, recTitle.cy, pilot.cx, pilot.top + 14);
      d += ` L ${pilot.cx.toFixed(1)} ${(pilot.bot - 14).toFixed(1)}`;
      // down into the grad photo, where the plane disappears
      d += seg(pilot.cx, pilot.bot - 14, end.cx, end.cy);

      const sig = d + "|" + document.documentElement.scrollHeight;
      if (sig === lastSig) return;
      lastSig = sig;
      setGeo({ d, w: document.documentElement.clientWidth, h: document.documentElement.scrollHeight });
    };

    build();
    const late = setTimeout(build, 1400); // after fonts + reveals settle
    let rt;
    const onReflow = () => {
      clearTimeout(rt);
      rt = setTimeout(build, 160);
    };
    window.addEventListener("resize", onReflow);
    const ro = new ResizeObserver(onReflow);
    ro.observe(document.body);
    return () => {
      clearTimeout(late);
      clearTimeout(rt);
      window.removeEventListener("resize", onReflow);
      ro.disconnect();
    };
  }, []);

  // ---- sample the path, then drive the line + plane on a scroll-follow lerp ----
  useEffect(() => {
    if (!geo) return undefined;
    const lit = litRef.current;
    const plane = planeRef.current;
    if (!lit) return undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const L = lit.getTotalLength();
    const N = 600;
    const pts = [];
    for (let i = 0; i <= N; i++) {
      const at = (L * i) / N;
      const pt = lit.getPointAtLength(at);
      pts.push({ l: at, x: pt.x, y: pt.y });
    }
    lit.style.strokeDasharray = `${L} ${L}`;
    lit.style.strokeDashoffset = `${L}`;
    lit.style.transition = "none";

    // plane at a given sample index + document point, banked to the tangent
    // (nose points +y at rest, so heading = atan2(-dx, dy))
    const place = (i, x, y) => {
      if (!plane) return;
      const a = pts[Math.max(0, i - 4)];
      const b = pts[Math.min(pts.length - 1, i + 4)];
      const deg = (Math.atan2(-(b.x - a.x), b.y - a.y) * 180) / Math.PI;
      plane.setAttribute("transform", `translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${deg.toFixed(2)})`);
    };

    if (reduced) {
      lit.style.strokeDashoffset = "0";
      place(0, pts[0].x, pts[0].y);
      return undefined;
    }

    // frontier: first sample crossing the cut line (path runs monotonically down)
    const apply = (cutY) => {
      let f;
      if (cutY <= pts[0].y) f = { l: 0, i: 0, x: pts[0].x, y: pts[0].y };
      else {
        const last = pts[pts.length - 1];
        if (cutY >= last.y) f = { l: L, i: pts.length - 1, x: last.x, y: last.y };
        else {
          f = { l: L, i: pts.length - 1, x: last.x, y: last.y };
          for (let k = 1; k < pts.length; k++) {
            if (pts[k].y >= cutY) {
              const a = pts[k - 1];
              const b = pts[k];
              const t = (cutY - a.y) / (b.y - a.y || 1);
              f = { l: a.l + (b.l - a.l) * t, i: k, x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
              break;
            }
          }
        }
      }
      lit.style.strokeDashoffset = String(Math.max(0, L - f.l));
      place(f.i, f.x, f.y);
    };

    // Take-off: without this the plane sits idle until the frontier line
    // (LEAD down the viewport) reaches the start point lower in the hero — a
    // dead zone of ~one-quarter screen. Seat the frontier ON the start at
    // scroll 0 and decay the extra offset away, so it moves on the first pixel
    // of scroll and eases into the normal mid-viewport ride (reads as a take-off).
    const leadPx = window.innerHeight * LEAD;
    const deadzone = Math.max(0, pts[0].y - leadPx);
    const TAU = Math.max(80, deadzone * 1.6);
    const cutFor = (sy) => sy + leadPx + deadzone * Math.exp(-sy / TAU);

    let target = cutFor(window.scrollY);
    let current = target;
    let raf = null;
    let lastT = 0;
    const EASE = 0.16;
    const tick = (now) => {
      const dt = lastT ? Math.min(64, now - lastT) : 16.6667;
      lastT = now;
      const diff = target - current;
      if (Math.abs(diff) < 0.4) {
        current = target;
        apply(current);
        raf = null;
        lastT = 0;
        return;
      }
      current += diff * (1 - Math.pow(1 - EASE, dt / 16.6667));
      apply(current);
      raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      target = cutFor(window.scrollY);
      if (!raf) {
        lastT = 0;
        raf = requestAnimationFrame(tick);
      }
    };
    apply(current);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [geo]);

  if (!geo) return null;
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[10] hidden md:block"
      aria-hidden="true"
      style={{ opacity: ready ? 1 : 0, transition: "opacity 0.7s ease" }}
    >
      <svg width={geo.w} height={geo.h} className="absolute left-0 top-0" style={{ overflow: "visible" }}>
        {/* the planned route — black dashes, ahead of the plane */}
        <path d={geo.d} fill="none" stroke="var(--ink)" strokeWidth={STROKE} strokeLinecap="round" strokeDasharray="3 9" opacity="0.5" />
        {/* the flown route — solid Santa Clara red, drawing in behind the plane */}
        <path
          ref={litRef}
          d={geo.d}
          fill="none"
          stroke="var(--ac)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          style={{ strokeDasharray: "0 999999" }}
        />
        {/* the Cessna — rides the frontier, banking along the tangent */}
        <g ref={planeRef}>
          <g transform={`scale(${PLANE_SCALE}) translate(-262 -186.5)`}>
            <path d={CESSNA} fill="#fbfaf6" stroke="var(--ink)" strokeWidth="17" strokeLinejoin="round" style={{ paintOrder: "stroke" }} />
          </g>
        </g>
      </svg>
    </div>
  );
}
