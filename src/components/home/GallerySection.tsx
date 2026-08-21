import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { useReveal } from "@/hooks/use-motion";
import { Eyebrow, SectionShell, SplitHeading } from "@/components/ui-kit";
import { cn } from "@/lib/utils";
import heroTruck from "@/assets/hero-truck.jpg";
import serviceHome from "@/assets/service-home.jpg";
import serviceOffice from "@/assets/service-office.jpg";
import serviceVehicle from "@/assets/service-vehicle.jpg";
import serviceLogistics from "@/assets/service-logistics.jpg";
import carePacking from "@/assets/care-packing.jpg";
import careWrap from "@/assets/care-wrap.jpg";
import careSecure from "@/assets/care-secure.jpg";
import stepLoading from "@/assets/step-loading.jpg";
import stepDelivery from "@/assets/step-delivery.jpg";
import trustFamily from "@/assets/trust-family.jpg";
import trustTeam from "@/assets/trust-team.jpg";

type Shot = {
  src: string;
  alt: string;
  title: string;
  meta: string;
  /** Grid emphasis inside the bento layout. */
  span?: string;
};

const shots: Shot[] = [
  {
    src: heroTruck,
    alt: "Branded Pooja Packers & Movers truck loaded outside a Delhi home",
    title: "Ready to roll",
    meta: "Dwarka, Delhi",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    src: carePacking,
    alt: "Hands wrapping a ceramic vase in bubble wrap",
    title: "Fragile-first packing",
    meta: "Care & handling",
  },
  {
    src: trustFamily,
    alt: "A family standing happily in their new home surrounded by boxes",
    title: "Move-in day",
    meta: "Gurugram",
  },
  {
    src: serviceHome,
    alt: "Movers wrapping a sofa in protective film",
    title: "Furniture protection",
    meta: "Home shifting",
  },
  {
    src: stepLoading,
    alt: "Two movers lifting a padded item into a truck",
    title: "Trained pairs",
    meta: "Loading",
  },
  {
    src: serviceOffice,
    alt: "Office desks and equipment packed for relocation",
    title: "Weekend office move",
    meta: "Okhla to Noida",
    span: "sm:col-span-2",
  },
  {
    src: careWrap,
    alt: "A chair being covered with a protective wrap",
    title: "Every surface covered",
    meta: "Care & handling",
  },
  {
    src: serviceVehicle,
    alt: "Cars secured on an enclosed vehicle carrier",
    title: "Vehicle carrier",
    meta: "Delhi to Bangalore",
  },
  {
    src: careSecure,
    alt: "Boxes strapped and stacked securely inside a truck",
    title: "Strapped and checked",
    meta: "Secured transport",
  },
  {
    src: trustTeam,
    alt: "Two uniformed movers standing beside their truck",
    title: "The same faces",
    meta: "Our crew",
  },
  {
    src: stepDelivery,
    alt: "A mover handing a carton to a customer at delivery",
    title: "Unpacked where you want it",
    meta: "Delivery & setup",
  },
  {
    src: serviceLogistics,
    alt: "Palletised commercial goods handled by a forklift",
    title: "Palletised cargo",
    meta: "Commercial logistics",
  },
];

export function GallerySection() {
  const ref = useReveal<HTMLDivElement>();
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: number) => setOpen((i) => (i === null ? i : (i + dir + shots.length) % shots.length)),
    [],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, step]);

  const active = open === null ? null : shots[open];

  return (
    <SectionShell id="gallery" className="bg-secondary/40">
      <div ref={ref}>
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Eyebrow>Gallery</Eyebrow>
            <SplitHeading
              text="Real moves. Real hands. Real care."
              accent={["care."]}
              className="mt-6 max-w-2xl text-4xl sm:text-5xl lg:text-[3.6rem]"
            />
          </div>
          <p data-reveal className="max-w-sm text-base lg:pb-3">
            Photographs from our own jobs across Delhi NCR and long-distance routes — packing,
            loading, delivery and the moments after.
          </p>
        </div>

        <div className="mt-14 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[210px] sm:grid-cols-4 sm:gap-4">
          {shots.map((shot, i) => (
            <button
              key={shot.src}
              type="button"
              data-reveal
              onClick={() => setOpen(i)}
              aria-label={`Open photo: ${shot.title}`}
              className={cn(
                "img-zoom group relative overflow-hidden rounded-sm bg-primary/5 text-left focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none",
                shot.span,
              )}
            >
              <img
                src={shot.src}
                alt={shot.alt}
                loading="lazy"
                className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-primary/85 via-primary/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="block text-base text-primary-foreground">{shot.title}</span>
                <span className="mt-0.5 block text-xs tracking-wide text-primary-foreground/70 uppercase">
                  {shot.meta}
                </span>
              </span>
              <span className="pointer-events-none absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-background/90 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <Expand className="size-3.5 text-primary" />
              </span>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className="fixed inset-0 z-100 flex flex-col bg-primary/95 backdrop-blur-sm"
          onClick={close}
        >
          <div className="flex items-center justify-between px-5 py-4 md:px-8">
            <p className="text-xs tracking-[0.2em] text-primary-foreground/70 uppercase">
              {(open ?? 0) + 1} / {shots.length}
            </p>
            <button
              type="button"
              onClick={close}
              aria-label="Close gallery"
              className="grid size-10 place-items-center rounded-full border border-primary-foreground/25 text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 items-center justify-center gap-3 px-3 pb-6 md:gap-6 md:px-8">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous photo"
              className="grid size-11 shrink-0 place-items-center rounded-full border border-primary-foreground/25 text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              <ArrowLeft className="size-4" />
            </button>

            <figure
              className="flex min-h-0 max-w-4xl flex-1 flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                key={active.src}
                src={active.src}
                alt={active.alt}
                className="animate-fade-in max-h-[70vh] w-auto max-w-full rounded-sm object-contain shadow-2xl"
              />
              <figcaption className="mt-5 text-center">
                <p className="text-xl text-primary-foreground">{active.title}</p>
                <p className="mt-1 text-xs tracking-[0.2em] text-primary-foreground/60 uppercase">
                  {active.meta}
                </p>
              </figcaption>
            </figure>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next photo"
              className="grid size-11 shrink-0 place-items-center rounded-full border border-primary-foreground/25 text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      )}
    </SectionShell>
  );
}
