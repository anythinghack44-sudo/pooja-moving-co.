import { createFileRoute } from "@tanstack/react-router";
import { Heart, Handshake, ShieldCheck, MapPin } from "lucide-react";
import { useReveal } from "@/hooks/use-motion";
import { site } from "@/lib/site";
import { Eyebrow, PrimaryLink, SectionShell, SplitHeading } from "@/components/ui-kit";
import { TrustSection } from "@/components/home/TrustSection";
import trustTeam from "@/assets/trust-team.jpg";
import carePacking from "@/assets/care-packing.jpg";
import heroTruck from "@/assets/hero-truck.jpg";

const title = "About Us — Delhi Based Movers Since 2017 | Pooja Packers & Movers";
const description =
  "Pooja Packers & Movers, also known as Pooja Package Transporter, is a Delhi based relocation team with 8+ years of careful home, office and vehicle moving.";

export const Route = createFileRoute("/about")({
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
  component: AboutPage,
});

const values = [
  {
    icon: Heart,
    title: "Care before speed",
    copy: "We would rather take an extra hour wrapping than explain a damaged item later.",
  },
  {
    icon: Handshake,
    title: "Honest quotes",
    copy: "What we quote is what you pay. No surprise charges on delivery day.",
  },
  {
    icon: ShieldCheck,
    title: "Accountability",
    copy: "One coordinator owns your move from survey to the final carton cleared.",
  },
  {
    icon: MapPin,
    title: "Local knowledge",
    copy: "Delhi lanes, lift rules, society timings — we plan around what actually happens.",
  },
];

function AboutPage() {
  const ref = useReveal<HTMLDivElement>();
  const storyRef = useReveal<HTMLDivElement>();

  return (
    <>
      <SectionShell className="pt-40 pb-10 lg:pt-44">
        <div ref={ref}>
          <Eyebrow>About us</Eyebrow>
          <SplitHeading
            as="h1"
            text="A Delhi family business that grew on careful hands."
            accent={["careful"]}
            className="mt-6 max-w-4xl text-4xl sm:text-5xl lg:text-[4.1rem]"
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
            <p data-reveal className="max-w-xl text-lg leading-relaxed">
              {site.name} — also operating as {site.altName} — has been moving homes, offices,
              vehicles and commercial goods out of Delhi for more than eight years. We started with
              one truck and a simple rule: pack it as if it were coming to our own home.
            </p>
            <p data-reveal className="max-w-md">
              Today the trucks and the team are bigger, but the rule has not changed. Most of our
              customers come from someone who moved with us before, which is the only marketing we
              have ever really trusted.
            </p>
          </div>
        </div>
      </SectionShell>

      <SectionShell className="pt-6">
        <div ref={storyRef} className="grid gap-6 md:grid-cols-3">
          {[
            { img: heroTruck, alt: "Loading cartons into a moving truck outside a Delhi home", w: 1408, h: 1104 },
            { img: trustTeam, alt: "Uniformed movers in front of their truck", w: 912, h: 1104 },
            { img: carePacking, alt: "A vase being wrapped in bubble wrap", w: 1600, h: 912 },
          ].map((m, i) => (
            <div
              key={m.alt}
              data-reveal
              data-image-reveal
              className={`img-zoom overflow-hidden rounded-sm ${i === 1 ? "aspect-3/4 md:mt-12" : "aspect-4/3"}`}
            >
              <img
                src={m.img}
                alt={m.alt}
                width={m.w}
                height={m.h}
                loading="lazy"
                className="size-full object-cover"
              />
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell className="border-y border-border bg-secondary/35">
        <ValuesBlock />
      </SectionShell>

      <TrustSection />

      <SectionShell className="border-t border-border bg-secondary/35 text-center">
        <div className="mx-auto max-w-2xl">
          <SplitHeading
            text="Let's plan your move together."
            accent={["together."]}
            className="text-4xl sm:text-5xl"
          />
          <p data-reveal className="mx-auto mt-6 max-w-md">
            Tell us where you are going and when. We will take it from there.
          </p>
          <div data-reveal className="mt-9 flex justify-center">
            <PrimaryLink to="/contact">Get a Free Quote</PrimaryLink>
          </div>
        </div>
      </SectionShell>
    </>
  );
}

function ValuesBlock() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <Eyebrow>What we stand on</Eyebrow>
        <SplitHeading
          text="Four habits we refuse to compromise."
          accent={["refuse"]}
          className="mt-6 text-4xl sm:text-5xl"
        />
      </div>
      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
        {values.map(({ icon: Icon, title: t, copy }) => (
          <div key={t} data-reveal>
            <Icon className="size-5 text-accent" />
            <h3 className="mt-4 text-xl">{t}</h3>
            <p className="mt-2 text-sm leading-relaxed">{copy}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
