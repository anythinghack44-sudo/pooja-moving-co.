import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useReveal } from "@/hooks/use-motion";
import { services } from "@/lib/site";
import {
  Eyebrow,
  PrimaryLink,
  SectionShell,
  SplitHeading,
} from "@/components/ui-kit";
import { ProcessSection } from "@/components/home/ProcessSection";
import serviceHome from "@/assets/service-home.jpg";
import serviceOffice from "@/assets/service-office.jpg";
import serviceVehicle from "@/assets/service-vehicle.jpg";
import serviceLogistics from "@/assets/service-logistics.jpg";

const title = "Services — Home, Office, Vehicle & Commercial Moving | Pooja Packers & Movers";
const description =
  "Home shifting, office relocation, vehicle transport and commercial logistics from Delhi. See what each Pooja Packers & Movers service includes.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  }),
  component: ServicesPage,
});

const imagery = [
  { img: serviceHome, alt: "Movers lifting a wrapped sofa during a household shift", w: 1200, h: 1408 },
  { img: serviceOffice, alt: "Office workstations and cartons ready for relocation", w: 1200, h: 800 },
  { img: serviceVehicle, alt: "Cars and a motorcycle secured on a vehicle carrier", w: 1008, h: 912 },
  {
    img: serviceLogistics,
    alt: "Wrapped pallets stacked inside a logistics warehouse",
    w: 1008,
    h: 912,
  },
];

function ServicesPage() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <>
      <SectionShell className="pt-40 pb-8 lg:pt-44">
        <div ref={ref} className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Eyebrow>Services</Eyebrow>
            <SplitHeading
              as="h1"
              text="Every kind of move, handled the same careful way."
              accent={["careful"]}
              className="mt-6 max-w-3xl text-4xl sm:text-5xl lg:text-[4.1rem]"
            />
          </div>
          <div data-reveal className="lg:pb-3">
            <PrimaryLink to="/contact">Get a Quote</PrimaryLink>
          </div>
        </div>
      </SectionShell>

      <SectionShell className="pt-8">
        <div className="grid gap-24">
          {services.map((s, i) => {
            const media = imagery[i]!;
            const flip = i % 2 === 1;
            return (
              <ServiceBlock
                key={s.slug}
                index={i}
                flip={flip}
                title={s.title}
                summary={s.summary}
                details={s.details}
                media={media}
              />
            );
          })}
        </div>
      </SectionShell>

      <ProcessSection />
    </>
  );
}

function ServiceBlock({
  index,
  flip,
  title,
  summary,
  details,
  media,
}: {
  index: number;
  flip: boolean;
  title: string;
  summary: string;
  details: readonly string[];
  media: { img: string; alt: string; w: number; h: number };
}) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <article
      ref={ref}
      className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
      id={title.toLowerCase().replace(/\s+/g, "-")}
    >
      <div
        data-reveal
        data-image-reveal
        className={`img-zoom aspect-4/3 overflow-hidden rounded-sm ${flip ? "lg:order-2" : ""}`}
      >
        <img
          src={media.img}
          alt={media.alt}
          width={media.w}
          height={media.h}
          loading="lazy"
          className="size-full object-cover"
        />
      </div>
      <div>
        <span className="eyebrow">0{index + 1}</span>
        <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[3rem]">{title}</h2>
        <p data-reveal className="mt-5 max-w-lg">
          {summary}
        </p>
        <ul className="mt-8 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
          {details.map((d) => (
            <li key={d} data-reveal className="flex gap-3 text-sm">
              <Check className="mt-0.5 size-4 shrink-0 text-accent" />
              {d}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
