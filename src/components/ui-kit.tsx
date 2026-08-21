import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Splits a heading into animatable words. `accent` words render orange italic. */
export function SplitHeading({
  text,
  accent = [],
  as: Tag = "h2",
  className,
}: {
  text: string;
  accent?: string[];
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <Tag className={className}>
      {words.map((word, i) => {
        const isAccent = accent.includes(word);
        return (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <span
              data-word
              className={cn(
                "inline-block",
                isAccent && "italic text-accent",
              )}
            >
              {word}
            </span>
            {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        );
      })}
    </Tag>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p data-reveal className={cn("eyebrow flex items-center gap-3", className)}>
      <span className="h-px w-8 bg-accent" aria-hidden />
      {children}
    </p>
  );
}

const baseBtn =
  "arrow-shift inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300";

export function PrimaryLink({
  to,
  children,
  className,
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(baseBtn, "bg-primary text-primary-foreground hover:bg-accent", className)}
    >
      {children}
      <ArrowRight className="size-4" />
    </Link>
  );
}

export function GhostAnchor({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        baseBtn,
        "border border-border bg-transparent text-foreground hover:border-accent hover:text-accent",
        className,
      )}
    >
      {children}
    </a>
  );
}

export function LearnMore({ to, label = "Learn More" }: { to: string; label?: string }) {
  return (
    <Link
      to={to}
      className="arrow-shift inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-accent"
    >
      {label}
      <ArrowRight className="size-4" />
    </Link>
  );
}

export function IconChip({ children }: { children: ReactNode }) {
  return (
    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sand text-foreground">
      {children}
    </span>
  );
}

export function SectionShell({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("px-6 py-24 md:px-10 lg:py-32", className)}>
      <div className="mx-auto w-full max-w-[1240px]">{children}</div>
    </section>
  );
}
