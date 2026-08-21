import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { CareSection } from "@/components/home/CareSection";
import { ReachSection } from "@/components/home/ReachSection";
import { GallerySection } from "@/components/home/GallerySection";
import { TrustSection } from "@/components/home/TrustSection";
import { QuoteSection } from "@/components/home/QuoteSection";

const title = "Pooja Packers & Movers — Delhi Packers, Movers & Transporters";
const description =
  "Delhi based packers and movers with 8+ years of trust. Home shifting, office relocation, vehicle transport and commercial logistics across India. Get a free quote.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <ProcessSection />
      <CareSection />
      <ReachSection />
      <GallerySection />
      <TrustSection />
      <QuoteSection />
    </>
  );
}
