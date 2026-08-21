import { ClipboardList, PackageOpen, Truck, Home } from "lucide-react";
import { useReveal } from "@/hooks/use-motion";
import { processSteps } from "@/lib/site";
import { Eyebrow, SectionShell, SplitHeading } from "@/components/ui-kit";
import stepSurvey from "@/assets/step-survey.jpg";
import stepPacking from "@/assets/step-packing.jpg";
import stepLoading from "@/assets/step-loading.jpg";
import stepDelivery from "@/assets/step-delivery.jpg";

const visuals = [
  { icon: ClipboardList, img: stepSurvey, alt: "A mover with a clipboard surveying a home before a move" },
  { icon: PackageOpen, img: stepPacking, alt: "Hands sealing and labelling a packed carton" },
  { icon: Truck, img: stepLoading, alt: "Movers carrying a wrapped mattress into a moving truck" },
  { icon: Home, img: stepDelivery, alt: "A mover unpacking and placing items in a new home" },
];

export function ProcessSection() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <SectionShell className="border-y border-border bg-secondary/35">
      <div ref={ref}>
        <div className="max-w-3xl">
          <Eyebrow>Our process</Eyebrow>
          <SplitHeading
            text="How we make your move smooth & stress-free"
            accent={["stress-free"]}
            className="mt-6 text-4xl sm:text-5xl lg:text-[3.9rem]"
          />
        </div>

        <div className="relative mt-16">
          <div
            className="absolute top-[38px] right-0 left-0 hidden border-t border-dashed border-sand-deep lg:block"
            aria-hidden
          />
          <ol className="grid gap-12 lg:grid-cols-4 lg:gap-8">
            {processSteps.map((step, i) => {
              const { icon: Icon, img, alt } = visuals[i]!;
              return (
                <li key={step.no} data-reveal className="relative lg:pr-4">
                  <div className="flex items-center gap-4 lg:block">
                    <span className="relative z-10 grid size-[76px] shrink-0 place-items-center rounded-full border border-border bg-background">
                      <Icon className="size-6 text-accent" />
                    </span>
                    <span className="font-display text-4xl text-sand-deep lg:mt-6 lg:block lg:text-3xl">
                      {step.no}
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl lg:mt-3">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed">{step.copy}</p>

                  <div
                    data-image-reveal
                    className="img-zoom mt-6 aspect-16/10 overflow-hidden rounded-sm border border-border"
                  >
                    <img
                      src={img}
                      alt={alt}
                      width={900}
                      height={700}
                      loading="lazy"
                      className="size-full object-cover"
                    />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </SectionShell>
  );
}
