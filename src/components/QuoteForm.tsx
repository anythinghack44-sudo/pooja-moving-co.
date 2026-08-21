import { useState } from "react";
import { z } from "zod";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { services, site } from "@/lib/site";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s]{10,16}$/, "Please enter a valid phone number"),
  email: z.string().trim().email("Please enter a valid email").max(160).or(z.literal("")),
  service: z.string().min(1, "Please choose a service"),
  from: z.string().trim().min(2, "Where are we moving from?").max(120),
  to: z.string().trim().min(2, "Where are we moving to?").max(120),
  date: z.string().max(40),
  size: z.string().max(60),
  notes: z.string().trim().max(1000),
});

type Values = z.infer<typeof schema>;
type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = {
  name: "",
  phone: "",
  email: "",
  service: "",
  from: "",
  to: "",
  date: "",
  size: "",
  notes: "",
};

const fieldClass =
  "w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent";

export function QuoteForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (key: keyof Values) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Values;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-sm border border-border bg-card p-10 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-sand">
          <Check className="size-6 text-accent" />
        </span>
        <h3 className="mt-6 text-3xl">Thank you, {values.name.split(" ")[0]}.</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm">
          Your move details are noted. Our team will call you on {values.phone} to confirm the plan
          and share your free quote.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent"
          >
            <MessageCircle className="size-4" /> Send details on WhatsApp
          </a>
          <a
            href={site.phoneHref}
            className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Call {site.phoneDisplay}
          </a>
        </div>
        <button
          type="button"
          onClick={() => {
            setValues(empty);
            setSent(false);
          }}
          className="mt-6 text-xs tracking-[0.16em] text-muted-foreground uppercase transition-colors hover:text-accent"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-sm border border-border bg-card p-6 sm:p-9"
    >
      <h3 className="text-2xl">Tell us about your move</h3>
      <p className="mt-2 text-sm">
        Fill this in and we will call you back with a clear, free quote — no obligation.
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field label="Full name" error={errors.name}>
          <input
            className={fieldClass}
            value={values.name}
            onChange={set("name")}
            placeholder="Your name"
            maxLength={80}
          />
        </Field>
        <Field label="Phone number" error={errors.phone}>
          <input
            className={fieldClass}
            value={values.phone}
            onChange={set("phone")}
            placeholder="+91 00000 00000"
            inputMode="tel"
            maxLength={16}
          />
        </Field>
        <Field label="Email (optional)" error={errors.email}>
          <input
            className={fieldClass}
            value={values.email}
            onChange={set("email")}
            placeholder="you@example.com"
            maxLength={160}
          />
        </Field>
        <Field label="Service required" error={errors.service}>
          <select className={fieldClass} value={values.service} onChange={set("service")}>
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Moving from" error={errors.from}>
          <input
            className={fieldClass}
            value={values.from}
            onChange={set("from")}
            placeholder="Area, city"
            maxLength={120}
          />
        </Field>
        <Field label="Moving to" error={errors.to}>
          <input
            className={fieldClass}
            value={values.to}
            onChange={set("to")}
            placeholder="Area, city"
            maxLength={120}
          />
        </Field>
        <Field label="Preferred date" error={errors.date}>
          <input className={fieldClass} type="date" value={values.date} onChange={set("date")} />
        </Field>
        <Field label="Home / load size" error={errors.size}>
          <select className={fieldClass} value={values.size} onChange={set("size")}>
            <option value="">Select size</option>
            <option>1 BHK</option>
            <option>2 BHK</option>
            <option>3 BHK</option>
            <option>4 BHK or villa</option>
            <option>Office / commercial</option>
            <option>Vehicle only</option>
          </select>
        </Field>
        <Field label="Anything we should know?" error={errors.notes} full>
          <textarea
            className={`${fieldClass} min-h-28 resize-none`}
            value={values.notes}
            onChange={set("notes")}
            placeholder="Fragile items, lift availability, parking, timing…"
            maxLength={1000}
          />
        </Field>
      </div>

      <button
        type="submit"
        className="arrow-shift mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-accent-foreground transition-colors hover:bg-primary sm:w-auto"
      >
        Get My Free Quote
        <ArrowRight className="size-4" />
      </button>
      <p className="mt-4 text-xs text-muted-foreground">
        Prefer to talk? Call {site.phoneDisplay} — {site.hours}.
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  children,
  full,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <label className={full ? "sm:col-span-2" : undefined}>
      <span className="mb-2 block text-xs font-semibold tracking-[0.14em] text-foreground uppercase">
        {label}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
