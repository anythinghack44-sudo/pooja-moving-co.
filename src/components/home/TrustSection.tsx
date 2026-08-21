import { Quote } from "lucide-react";
import { useReveal } from "@/hooks/use-motion";
import { site, testimonials } from "@/lib/site";
import { Eyebrow, SectionShell, SplitHeading } from "@/components/ui-kit";
import trustFamily from "@/assets/trust-family.jpg";
import trustTeam from "@/assets/trust-team.jpg";

const facts = [
  { label: "Years of service", value: "8+" },
  { label: "Based in", value: "Delhi" },
  { label: "Core services", value: "4" },
  { label: "Open", value: "All week" },
];

export function TrustSection() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <SectionShell>
      <div ref={ref}>
        <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div className="relative">
            <div
              data-reveal
              data-image-reveal
              className="img-zoom aspect-4/3 overflow-hidden rounded-sm"
            >
              <img
                src={trustFamily}
                alt="A family standing happily in their new home surrounded by moving boxes"
                width={1200}
                height={1008}
                loading="lazy"
                className="size-full object-cover"
              />
            </div>

            <div
              data-reveal
              data-image-reveal
              className="img-zoom absolute -right-2 -bottom-14 hidden w-40 overflow-hidden rounded-sm border-4 border-background sm:block lg:-right-6 lg:w-52"
            >
              <img
                src={trustTeam}
                alt="Two uniformed Pooja Packers & Movers team members in front of their truck"
                width={912}
                height={1104}
                loading="lazy"
                className="size-full object-cover"
              />
            </div>

            <div
              data-reveal
              className="absolute -bottom-10 left-4 max-w-[16rem] rounded-sm border border-border bg-card p-6 shadow-[0_24px_60px_-40px_var(--color-ink)] sm:left-8"
            >
              <p className="font-display text-xl leading-snug text-foreground">
                “Your trust is our greatest reward.”
              </p>
              <p className="mt-3 text-xs tracking-[0.16em] text-muted-foreground uppercase">
                {site.name}
              </p>
            </div>
          </div>

          <div className="mt-20 lg:mt-0">
            <Eyebrow>Customer proof</Eyebrow>
            <SplitHeading
              text="Families and businesses keep sending us forward."
              accent={["forward."]}
              className="mt-6 text-4xl sm:text-5xl lg:text-[3.5rem]"
            />
            <p data-reveal className="mt-7 max-w-md">
              We do not chase volume. Most of our work comes from people who moved with us once and
              recommended us to someone they care about.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-4">
              {facts.map((f) => (
                <div key={f.label} data-reveal className="bg-card p-5">
                  <dt className="text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                    {f.label}
                  </dt>
                  <dd className="mt-2 font-display text-2xl text-foreground">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-24 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} data-reveal className="card-soft flex flex-col rounded-sm p-7">
              <Quote className="size-6 text-sand-deep" />
              <blockquote className="mt-5 flex-1 font-display text-xl leading-snug text-foreground">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-5">
                <span className="block text-sm font-semibold text-foreground">{t.name}</span>
                <span className="block text-xs tracking-wide text-muted-foreground">{t.detail}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p
          data-reveal
          className="mt-20 text-center font-display text-3xl text-foreground sm:text-4xl lg:text-5xl"
        >
          Careful people. Clear process. <span className="italic text-accent">Reliable movement.</span>
        </p>
      </div>
    </SectionShell>
  );
}
