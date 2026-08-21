import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { useReveal } from "@/hooks/use-motion";
import { site } from "@/lib/site";
import { QuoteForm } from "@/components/QuoteForm";
import { Eyebrow, SectionShell, SplitHeading } from "@/components/ui-kit";

const title = "Contact & Free Quote — Pooja Packers & Movers, Delhi";
const description =
  "Call +91 98711 65432 or send your move details for a free quote from Pooja Packers & Movers, Delhi Cantt. Open all week, 8 AM to 9 PM.";

export const Route = createFileRoute("/contact")({
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
  component: ContactPage;
});

function ContactPage() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <SectionShell className="pt-40 lg:pt-44">
      <div ref={ref} className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <Eyebrow>Contact us</Eyebrow>
          <SplitHeading
            as="h1"
            text="Let's get your move planned."
            accent={["planned."]}
            className="mt-6 text-4xl sm:text-5xl lg:text-[3.9rem]"
          />
          <p data-reveal className="mt-7 max-w-md text-lg leading-relaxed">
            Send us your details or simply call. We answer every enquiry ourselves — no call centre,
            no scripted quotes.
          </p>

          <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-border bg-border">
            <div data-reveal className="flex gap-4 bg-card p-6">
              <Phone className="mt-1 size-5 shrink-0 text-accent" />
              <div>
                <h2 className="text-xs font-semibold tracking-[0.16em] text-foreground uppercase">
                  Phone
                </h2>
                <a
                  href={site.phoneHref}
                  className="mt-2 block font-display text-2xl text-foreground transition-colors hover:text-accent"
                >
                  {site.phoneDisplay}
                </a>
              </div>
            </div>
            <div data-reveal className="flex gap-4 bg-card p-6">
              <MessageCircle className="mt-1 size-5 shrink-0 text-accent" />
              <div>
                <h2 className="text-xs font-semibold tracking-[0.16em] text-foreground uppercase">
                  WhatsApp
                </h2>
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block text-sm transition-colors hover:text-accent"
                >
                  Share photos of your items for a faster estimate
                </a>
              </div>
            </div>
            <div data-reveal className="flex gap-4 bg-card p-6">
              <MapPin className="mt-1 size-5 shrink-0 text-accent" />
              <div>
                <h2 className="text-xs font-semibold tracking-[0.16em] text-foreground uppercase">
                  Office
                </h2>
                <p className="mt-2 text-sm">
                  {site.addressLines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <div data-reveal className="flex gap-4 bg-card p-6">
              <Clock className="mt-1 size-5 shrink-0 text-accent" />
              <div>
                <h2 className="text-xs font-semibold tracking-[0.16em] text-foreground uppercase">
                  Hours
                </h2>
                <p className="mt-2 text-sm">{site.hours}</p>
              </div>
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
