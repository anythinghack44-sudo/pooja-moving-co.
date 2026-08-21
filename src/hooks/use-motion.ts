import { useEffect, useRef } from "react";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Lenis smooth scrolling driven by the GSAP ticker so ScrollTrigger stays in sync.
 */
export function useSmoothScroll() {
  useEffect(() => {
    document.documentElement.classList.add("motion-ready");
    if (prefersReducedMotion()) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    Promise.all([import("lenis"), loadGsap()]).then(([lenisMod, { gsap, ScrollTrigger }]) => {
      if (disposed) return;
      const Lenis = lenisMod.default;
      const lenis = new Lenis({ duration: 1.1, smoothWheel: true });

      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);
}

/**
 * Reveals `[data-word]` (split headings) and `[data-reveal]` elements inside a
 * container as it scrolls into view. Falls back to instant visibility.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(deps: unknown[] = []) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const words = Array.from(root.querySelectorAll<HTMLElement>("[data-word]"));
    const blocks = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const images = Array.from(root.querySelectorAll<HTMLElement>("[data-image-reveal] > img"));

    const show = () => {
      [...words, ...blocks].forEach((el) => (el.style.opacity = "1"));
      images.forEach((el) => (el.style.transform = "none"));
    };

    if (prefersReducedMotion()) {
      show();
      return;
    }

    let disposed = false;
    let revert: (() => void) | undefined;

    loadGsap()
      .then(({ gsap }) => {
        if (disposed || !ref.current) return;
        const ctx = gsap.context(() => {
          if (words.length) {
            gsap.fromTo(
              words,
              { opacity: 0, yPercent: 60, filter: "blur(8px)" },
              {
                opacity: 1,
                yPercent: 0,
                filter: "blur(0px)",
                duration: 1,
                ease: "power3.out",
                stagger: 0.045,
                scrollTrigger: { trigger: root, start: "top 82%" },
              },
            );
          }
          if (blocks.length) {
            gsap.fromTo(
              blocks,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
                stagger: 0.09,
                scrollTrigger: { trigger: root, start: "top 80%" },
              },
            );
          }
          images.forEach((img) => {
            gsap.fromTo(
              img,
              { scale: 1.06 },
              {
                scale: 1,
                duration: 1.4,
                ease: "power2.out",
                scrollTrigger: { trigger: img, start: "top 88%" },
              },
            );
          });
        }, root);
        revert = () => ctx.revert();
      })
      .catch(show);

    return () => {
      disposed = true;
      revert?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
