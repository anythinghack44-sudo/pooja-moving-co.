export type GsapBundle = {
  gsap: typeof import("gsap").gsap;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
};

let cache: Promise<GsapBundle> | null = null;

export function loadGsap(): Promise<GsapBundle> {
  if (!cache) {
    cache = Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([core, st]) => {
        const gsap = core.gsap ?? (core as unknown as { default: typeof core.gsap }).default;
        const ScrollTrigger = st.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
        return { gsap, ScrollTrigger };
      },
    );
  }
  return cache;
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
