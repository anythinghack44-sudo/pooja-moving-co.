import { Check } from "lucide-react";
import { useReveal } from "@/hooks/use-motion";
import { services } from "@/lib/site";
import { Eyebrow, LearnMore, SectionShell, SplitHeading } from "@/components/ui-kit";
import serviceHome from "@/assets/service-home.jpg";
import serviceOffice from "@/assets/service-office.jpg";
import serviceVehicle from "@/assets/service-vehicle.jpg";
import serviceLogistics from "@/assets/service-logistics.jpg";

const [home, office, vehicle, logistics] = services;

export function ServicesSection() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <SectionShell id="services">
      <div ref={ref}>
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Eyebrow>What we move</Eyebrow>
            <SplitHeading
              text="Our services, built around real moves."
              accent={["real"]}
              className="mt-6 max-w-2xl text-4xl sm:text-5xl lg:text-[3.9rem]"
            />
          </div>
          <p data-reveal className="max-w-sm text-base lg:pb-3">
            Four core services, one standard of handling — whether it is a one-room flat in Delhi or a
            full commercial dispatch across India.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.02fr_1fr]">
          {/* Featured: Home Shifting */}
          <article data-reveal className="card-soft img-zoom group flex flex-col rounded-sm">
            <div data-image-reveal className="aspect-4/5 overflow-hidden sm:aspect-3/2 lg:aspect-4/5">
              <img
                src={serviceHome}
                alt="Two uniformed movers carefully lifting a wrapped sofa in a Delhi living room"
                width={1200}
                height={1408}
                loading="lazy"
                className="size-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-7 lg:p-9">
              <span className="eyebrow">Most requested</span>
              <h3 className="mt-4 text-3xl lg:text-[2.4rem]">{home.title}</h3>
              <p className="mt-3 max-w-md">{home.summary}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {home.details.map((d) => (
                  <li key={d} className="flex gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                    {d}
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-border pt-6">
                <LearnMore to="/services" />
              </div>
            </div>
          </article>

          {/* Stacked trio */}
          <div className="grid gap-6">
            <article data-reveal className="card-soft img-zoom grid gap-0 rounded-sm sm:grid-cols-[1.1fr_1fr]">
              <div data-image-reveal className="aspect-3/2 overflow-hidden sm:aspect-auto sm:h-full">
                <img
                  src={serviceOffice}
                  alt="Office desks and labelled cartons prepared for an office relocation"
                  width={1200}
                  height={800}
                  loading="lazy"
                  className="size-full object-cover"
                />
              </div>
              <div className="p-7">
                <h3 className="text-2xl">{office.title}</h3>
                <p className="mt-3 text-sm">{office.summary}</p>
                <div className="mt-6">
                  <LearnMore to="/services" />
                </div>
              </div>
            </article>

            <div className="grid gap-6 sm:grid-cols-2">
              {[
                { s: vehicle, img: serviceVehicle, alt: "Car carrier truck loaded with secured cars and a motorcycle" },
                {
                  s: logistics,
                  img: serviceLogistics,
                  alt: "Palletised cartons wrapped and stacked inside a logistics warehouse",
                },
              ].map(({ s, img, alt }) => (
                <article key={s.slug} data-reveal className="card-soft img-zoom flex flex-col rounded-sm">
                  <div data-image-reveal className="aspect-4/3 overflow-hidden">
                    <img
                      src={img}
                      alt={alt}
                      width={1008}
                      height={912}
                      loading="lazy"
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl">{s.title}</h3>
                    <p className="mt-2.5 text-sm">{s.summary}</p>
                    <div className="mt-5 pt-1">
                      <LearnMore to="/services" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
