import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { navLinks, services, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto grid w-full max-w-[1240px] gap-12 px-6 py-20 md:px-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-primary">
              <span className="font-display text-lg leading-none text-primary-foreground">P</span>
            </span>
            <span className="font-display text-xl text-foreground">
              Pooja Packers <span className="text-accent">&</span> Movers
            </span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            Also operating as <span className="text-foreground">{site.altName}</span>. Delhi based
            relocation specialists moving homes, offices, vehicles and commercial goods across India.
          </p>
          <p className="mt-6 font-display text-lg text-foreground">{site.yearsLabel}</p>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-[0.2em] text-foreground uppercase">Pages</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-[0.2em] text-foreground uppercase">
            Services
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to="/services" className="transition-colors hover:text-accent">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-[0.2em] text-foreground uppercase">
            Reach us
          </h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
              <span>
                {site.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-accent" />
              <a href={site.phoneHref} className="transition-colors hover:text-accent">
                {site.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <MessageCircle className="mt-0.5 size-4 shrink-0 text-accent" />
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-accent"
              >
                WhatsApp us
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-accent" />
              <span>{site.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-primary">
        <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-2 px-6 py-5 text-xs text-primary-foreground/70 md:flex-row md:items-center md:justify-between md:px-10">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.altName}
          </p>
          <p className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <a href={site.phoneHref} className="transition-colors hover:text-primary-foreground">
              {site.phoneDisplay}
            </a>
            <span>Delhi Cantt, New Delhi 110010</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
