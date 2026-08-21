import { useEffect, useRef } from "react";
import { Clock, Route as RouteIcon, ShieldCheck, Headphones } from "lucide-react";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";
import { useReveal } from "@/hooks/use-motion";
import { Eyebrow, SectionShell, SplitHeading } from "@/components/ui-kit";

const INDIA_OUTLINE =
  "M120 150 L150 105 L185 80 L215 110 L250 120 L290 140 L320 130 L352 150 L368 175 L400 165 L410 190 L378 205 L355 215 L340 250 L330 285 L320 320 L300 360 L285 400 L270 440 L255 470 L235 440 L222 400 L210 360 L192 325 L175 290 L150 265 L125 250 L110 225 L128 205 L112 180 Z";

const DELHI = { x: 185, y: 175 };

const cities = [
  { name: "Chandigarh", x: 182, y: 143 },
  { name: "Jaipur", x: 163, y: 208 },
  { name: "Lucknow", x: 243, y: 192 },
  { name: "Ahmedabad", x: 152, y: 268 },
  { name: "Kolkata", x: 334, y: 253 },
  { name: "Mumbai", x: 191, y: 314 },
  { name: "Hyderabad", x: 250, y: 353 },
  { name: "Bangalore", x: 240, y: 408 },
];

const support = [
  { icon: RouteIcon, title: "Planned routes", copy: "Highway routes chosen for time and load safety." },
  { icon: Clock, title: "Committed timelines", copy: "Dispatch and delivery windows agreed upfront." },
  { icon: ShieldCheck, title: "Load checks", copy: "Straps and stacking verified before departure." },
  { icon: Headphones, title: "One point of contact", copy: "The same person with you from quote to delivery." },
];

const routeChips = [
  "Delhi → Mumbai",
  "Delhi → Bangalore",
  "Delhi → Hyderabad",
  "Delhi → Kolkata",
  "Delhi → Pune",
  "Delhi → Chennai",
];

function curve(to: { x: number; y: number }) {
  const mx = (DELHI.x + to.x) / 2;
  const my = (DELHI.y + to.y) / 2;
  const dx = to.x - DELHI.x;
  const dy = to.y - DELHI.y;
  const cx = mx - dy * 0.18;
  const cy = my + dx * 0.18;
  return `M${DELHI.x} ${DELHI.y} Q${cx} ${cy} ${to.x} ${to.y}`;
}

export function ReachSection() {
  const ref = useReveal<HTMLDivElement>();
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const paths = Array.from(el.querySelectorAll<SVGPathElement>("[data-route]"));
    const dots = Array.from(el.querySelectorAll<SVGGElement>("[data-city]"));
    if (prefersReducedMotion()) return;

    let disposed = false;
    let revert: (() => void) | undefined;

    loadGsap().then(({ gsap }) => {
      if (disposed || !mapRef.current) return;
      const ctx = gsap.context(() => {
        paths.forEach((p) => {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: `6 6`, strokeDashoffset: len, opacity: 1 });
        });
        gsap.set(dots, { opacity: 0, scale: 0.6, transformOrigin: "center" });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: mapRef.current, start: "top 72%" },
        });
        tl.to(paths, {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: "power2.inOut",
          stagger: 0.12,
        }).to(dots, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.09 }, "-=1.3");
      }, mapRef.current);
      revert = () => ctx.revert();
    });

    return () => {
      disposed = true;
      revert?.();
    };
  }, []);

  return (
    <SectionShell className="border-y border-border bg-secondary/35">
      <div ref={ref}>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <Eyebrow>Delhi to nationwide</Eyebrow>
            <SplitHeading
              text="Rooted in Delhi. Moving across India."
              accent={["India."]}
              className="mt-6 text-4xl sm:text-5xl lg:text-[3.7rem]"
            />
            <p data-reveal className="mt-7 max-w-md">
              Every move begins at our Delhi base and travels out on planned routes — to metros,
              tier-two cities and everywhere our customers are starting again.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {support.map(({ icon: Icon, title, copy }) => (
                <div key={title} data-reveal>
                  <Icon className="size-5 text-accent" />
                  <h3 className="mt-3 text-lg leading-snug">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed">{copy}</p>
                </div>
              ))}
            </div>

            <ul data-reveal className="mt-10 flex flex-wrap gap-2.5">
              {routeChips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-border bg-background px-4 py-2 text-xs font-medium tracking-wide text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </div>

          <div ref={mapRef} data-reveal className="relative">
            <svg
              viewBox="0 0 460 520"
              role="img"
              aria-label="Map of India showing transport routes from Delhi to major cities"
              className="mx-auto h-auto w-full max-w-[520px]"
            >
              <path
                d={INDIA_OUTLINE}
                fill="var(--color-background)"
                stroke="var(--color-sand-deep)"
                strokeWidth="1.5"
              />
              {cities.map((c) => (
                <path
                  key={`route-${c.name}`}
                  data-route
                  d={curve(c)}
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  opacity="0"
                />
              ))}
              {cities.map((c) => (
                <g key={c.name} data-city>
                  <circle cx={c.x} cy={c.y} r="3.4" fill="var(--color-accent)" />
                  <text
                    x={c.x + 8}
                    y={c.y + 3.5}
                    className="font-sans"
                    fontSize="10"
                    fill="var(--color-ink-soft)"
                  >
                    {c.name}
                  </text>
                </g>
              ))}
              <circle cx={DELHI.x} cy={DELHI.y} r="9" fill="var(--color-accent)" opacity="0.18" />
              <circle
                cx={DELHI.x}
                cy={DELHI.y}
                r="4.6"
                fill="var(--color-primary)"
                stroke="var(--color-background)"
                strokeWidth="1.6"
              />
              <text
                x={DELHI.x - 10}
                y={DELHI.y - 12}
                textAnchor="end"
                fontSize="12"
                fontWeight="600"
                fill="var(--color-ink)"
              >
                Delhi
              </text>
            </svg>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
