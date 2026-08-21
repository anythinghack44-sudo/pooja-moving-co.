import { useEffect, useRef } from "react";
import { Phone, ShieldCheck, Users, MapPin, CalendarClock } from "lucide-react";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";
import { site } from "@/lib/site";
import { GhostAnchor, PrimaryLink, SplitHeading } from "@/components/ui-kit";
import heroTruck from "@/assets/hero-truck.jpg";

const trustCards = [
  { icon: CalendarClock, title: "8+ Years of Trust", copy: "Serving Delhi families since 2017" },
  { icon: ShieldCheck, title: "Safe & Secure Transport", copy: "Padded, strapped, and checked" },
  { icon: Users, title: "Trained Professionals", copy: "In-house, uniformed handling teams" },
  { icon: MapPin, title: "Delhi Based Service", copy: "Local roots, nationwide reach" },
];

export function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const words = el.querySelectorAll("[data-word]");
    const items = el.querySelectorAll("[data-hero-item]");
    const media = el.querySelector("[data-hero-media]");
    const cards = el.querySelectorAll("[data-hero-card]");

    const show = () => {
      [...words, ...items, ...cards].forEach((n) => ((n as HTMLElement).style.opacity = "1"));
      if (media) (media as HTMLElement).style.clipPath = "none";
    };

    if (prefersReducedMotion()) {
      show();
      return;
    }

    let disposed = false;
    let revert: (() => void) | undefined;

    loadGsap()
      .then(({ gsap }) => {
        if (disposed || !root.current) return;
        const ctx = gsap.context(() => {
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          tl.fromTo(
            "[data-hero-eyebrow]",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.7 },
          )
            .fromTo(
              words,
              { opacity: 0, yPercent: 70, filter: "blur(8px)" },
              {
                opacity: 1,
                yPercent: 0,
                filter: "blur(0px)",
                duration: 1.05,
                stagger: 0.055,
              },
              "-=0.35",
            )
            .fromTo(
              "[data-hero-item]",
              { opacity: 0, y: 22 },
              { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 },
              "-=0.6",
            )
            .fromTo(
              media,
              { clipPath: "inset(0% 0% 100% 0%)" },
              { clipPath: "inset(0% 0% 0% 0%)", duration: 1.25 },
              "-=0.9",
            )
            .fromTo(
              media?.querySelector("img") ?? [],
              { scale: 1.12 },
              { scale: 1, duration: 1.6, ease: "power2.out" },
              "<",
            )
            .fromTo(
              cards,
              { opacity: 0, y: 26 },
              { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
              "-=0.9",
            );
        }, root.current);
        revert = () => ctx.revert();
      })
      .catch(show);

    return () => {
      disposed = true;
      revert?.();
    };
  }, []);

  return (
    <div ref={root} className="relative overflow-hidden pt-28 lg:pt-24">
      <div className="mx-auto w-full max-w-[1240px] px-6 md:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
          <div className="lg:pb-10">
            <p
              data-hero-eyebrow
              className="eyebrow flex items-center gap-3 opacity-0"
            >
              <span className="h-px w-8 bg-accent" aria-hidden />
              Safe · Reliable · Responsible
            </p>

            <SplitHeading
              as="h1"
              text="Moving, handled with care."
              accent={["care."]}
              className="mt-7 text-[13vw] leading-[0.95] sm:text-6xl lg:text-[5.1rem]"
            />

            <p data-hero-item className="mt-7 max-w-lg text-lg leading-relaxed opacity-0">
              Pooja Packers & Movers is a Delhi based relocation team that treats your belongings the
              way a family would — planned properly, packed patiently and delivered on time.
            </p>

            <div data-hero-item className="mt-9 flex flex-wrap gap-3 opacity-0">
              <PrimaryLink to="/contact">Plan Your Move</PrimaryLink>
              <GhostAnchor href={site.phoneHref}>
                <Phone className="size-4" />
                Call / WhatsApp
              </GhostAnchor>
            </div>

            <p data-hero-item className="mt-7 text-sm opacity-0">
              Speak to us directly ·{" "}
              <a href={site.phoneHref} className="font-semibold text-foreground hover:text-accent">
                {site.phoneDisplay}
              </a>
            </p>
          </div>

          <div className="relative lg:-mr-20 xl:-mr-32">
            <div
              data-hero-media
              className="relative aspect-4/3 overflow-hidden rounded-sm lg:aspect-5/4"
              style={{ clipPath: "inset(0% 0% 100% 0%)" }}
            >
              <img
                src={heroTruck}
                alt="Pooja Packers & Movers team loading labelled cartons into a white moving truck outside a Delhi home"
                width={1408}
                height={1104}
                className="size-full object-cover"
              />
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background to-transparent"
                aria-hidden
              />
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border lg:mt-20 lg:grid-cols-4">
          {trustCards.map(({ icon: Icon, title, copy }) => (
            <div
              key={title}
              data-hero-card
              className="group bg-card p-6 opacity-0 transition-colors duration-500 hover:bg-secondary/60 lg:p-7"
            >
              <Icon className="size-5 text-accent" />
              <h2 className="mt-5 font-display text-lg leading-snug text-foreground">{title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
