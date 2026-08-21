import { BadgeIndianRupee, Clock, ClipboardCheck, Headphones, MessageCircle, Phone } from "lucide-react";
import { useReveal } from "@/hooks/use-motion";
import { site } from "@/lib/site";
import { QuoteForm } from "@/components/QuoteForm";
import { Eyebrow, SectionShell, SplitHeading } from "@/components/ui-kit";

const reassurance = [
  { icon: BadgeIndianRupee, title: "Free quote", copy: "Transparent pricing with no hidden add-ons." },
  { icon: Clock, title: "Quick response", copy: "We call back the same working day." },
  { icon: ClipboardCheck, title: "Clear planning", copy: "You know the plan before packing starts." },
  { icon: Headphones, title: "Expert support", copy: "Guidance from a team that moves daily." },
];

export function QuoteSection() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <SectionShell id="quote" className="border-t border-border bg-secondary/35">
      <div ref={ref} className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <Eyebrow>Get a free quote</Eyebrow>
          <SplitHeading
            text="Tell us the move. We will handle the rest."
            accent={["rest."]}
            className="mt-6 text-4xl sm:text-5xl lg:text-[3.6rem]"
          />
          <p data-reveal className="mt-7 max-w-md">
            Share a few details and our team will come back with a clear quote, a suggested date and
            an honest view of what your move needs.
          </p>

          <div className="mt-10 grid gap-7 sm:grid-cols-2">
            {reassurance.map(({ icon: Icon, title, copy }) => (
              <div key={title} data-reveal>
                <Icon className="size-5 text-accent" />
                <h3 className="mt-3 text-lg leading-snug">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed">{copy}</p>
              </div>
            ))}
          </div>

          <div data-reveal className="mt-10 rounded-sm border border-border bg-card p-7">
            <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
              Prefer to speak now?
            </p>
            <a
              href={site.phoneHref}
              className="mt-3 block font-display text-3xl text-foreground transition-colors hover:text-accent"
            >
              {site.phoneDisplay}
            </a>
            <p className="mt-2 text-sm">{site.hours}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent"
              >
                <Phone className="size-4" /> Call now
              </a>
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <MessageCircle className="size-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div data-reveal>
          <QuoteForm />
        </div>
      </div>
    </SectionShell>
  );
}
