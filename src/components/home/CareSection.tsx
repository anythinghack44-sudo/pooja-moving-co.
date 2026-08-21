import { Layers, Shield, Boxes, MoveVertical, Lock } from "lucide-react";
import { useReveal } from "@/hooks/use-motion";
import { Eyebrow, SectionShell, SplitHeading } from "@/components/ui-kit";
import carePacking from "@/assets/care-packing.jpg";
import careWrap from "@/assets/care-wrap.jpg";
import careSecure from "@/assets/care-secure.jpg";
import stepPacking from "@/assets/step-packing.jpg";
import stepLoading from "@/assets/step-loading.jpg";

const panels = [
  {
    icon: Layers,
    title: "Quality materials",
    copy: "Multi-wall cartons, bubble wrap, stretch film and padded blankets — never reused, never improvised.",
    img: carePacking,
    alt: "Bubble wrap, kraft paper and tape laid out for packing a ceramic vase",
  },
  {
    icon: Shield,
    title: "Fragile-first wrapping",
    copy: "Glass, crockery and art are wrapped individually, cushioned and marked so they are handled differently.",
    img: careWrap,
    alt: "Hands wrapping a wooden chair in protective film and padding",
  },
  {
    icon: Boxes,
    title: "Labelled by room",
    copy: "Every carton is sealed and labelled with its room and contents, so unpacking follows your plan.",
    img: stepPacking,
    alt: "A packed carton being sealed and labelled by hand",
  },
  {
    icon: MoveVertical,
    title: "Correct lifting",
    copy: "Trained pairs, trolleys and ramps — heavy furniture leaves your floors and walls untouched.",
    img: stepLoading,
    alt: "Two movers carrying a wrapped mattress up a truck ramp",
  },
  {
    icon: Lock,
    title: "Secured transport",
    copy: "Loads are stacked to balance, strapped down and checked before the truck moves an inch.",
    img: careSecure,
    alt: "Padded furniture and cartons strapped inside a moving truck",
  },
];

export function CareSection() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <SectionShell>
      <div ref={ref}>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div>
            <Eyebrow>Care & handling</Eyebrow>
            <SplitHeading
              text="The details that decide whether things arrive intact."
              accent={["intact."]}
              className="mt-6 text-4xl sm:text-5xl lg:text-[3.6rem]"
            />
            <p data-reveal className="mt-7 max-w-md">
              Careful moving is not one big promise, it is five small habits repeated on every job.
              This is what our teams do the same way, every single time.
            </p>
          </div>

          <div
            data-reveal
            data-image-reveal
            className="img-zoom aspect-16/9 overflow-hidden rounded-sm"
          >
            <img
              src={carePacking}
              alt="Close-up of a ceramic vase being wrapped in bubble wrap on a wooden table"
              width={1600}
              height={912}
              loading="lazy"
              className="size-full object-cover"
            />
          </div>
        </div>

        <div className="mt-14 -mx-6 overflow-x-auto px-6 pb-2 md:mx-0 md:overflow-visible md:px-0">
          <div className="grid w-max grid-flow-col auto-cols-[78vw] gap-5 sm:auto-cols-[46vw] md:w-auto md:grid-flow-row md:grid-cols-5 md:auto-cols-auto">
            {panels.map(({ icon: Icon, title, copy, img, alt }) => (
              <article key={title} data-reveal className="card-soft img-zoom rounded-sm">
                <div data-image-reveal className="aspect-4/3 overflow-hidden">
                  <img
                    src={img}
                    alt={alt}
                    width={900}
                    height={700}
                    loading="lazy"
                    className="size-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <Icon className="size-5 text-accent" />
                  <h3 className="mt-4 text-lg leading-snug">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed">{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
