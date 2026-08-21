import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border bg-background/85 py-3 backdrop-blur-md"
          : "border-b border-transparent py-6",
      )}
    >
      <div className="mx-auto grid w-full max-w-[1240px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 md:px-10">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary">
            <span className="font-display text-lg leading-none text-primary-foreground">P</span>
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-lg leading-tight text-foreground">
              Pooja Packers <span className="text-accent">&</span> Movers
            </span>
            <span className="hidden text-[11px] tracking-[0.18em] text-muted-foreground uppercase sm:block">
              {site.altName}
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100 group-data-[status=active]:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 xl:flex">
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <Phone className="size-3.5" />
              {site.phoneDisplay}
            </a>
            <Link
              to="/contact"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-primary"
            >
              Get a Quote
            </Link>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full border border-border text-foreground lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-x-0 top-[72px] bottom-0 z-40 animate-fade-in border-t border-border bg-background px-6 py-8 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="border-b border-border py-4 font-display text-3xl text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 flex flex-col gap-3">
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border py-3.5 text-sm font-semibold text-foreground"
            >
              <Phone className="size-4" /> {site.phoneDisplay}
            </a>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="rounded-full bg-accent py-3.5 text-center text-sm font-semibold text-accent-foreground"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
