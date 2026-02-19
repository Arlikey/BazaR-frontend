import { useLayoutEffect } from "react";

type Options = {
  selector?: string;
  cssVarName?: string;
};

export function useHeaderOffset({
  selector = "[data-app-header]",
  cssVarName = "--top-offset",
}: Options = {}) {
  useLayoutEffect(() => {
    let disposed = false;
    let raf = 0;

    const setup = () => {
      const header = document.querySelector<HTMLElement>(selector);
      if (!header) return false;

      const setOffset = () => {
        const rect = header.getBoundingClientRect();
        document.documentElement.style.setProperty(
          cssVarName,
          `${Math.max(0, Math.round(rect.bottom))}px`,
        );
      };

      const onScrollOrResize = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(setOffset);
      };

      setOffset();

      const ro = new ResizeObserver(onScrollOrResize);
      ro.observe(header);

      window.addEventListener("scroll", onScrollOrResize, { passive: true });
      window.addEventListener("resize", onScrollOrResize);

      return () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        window.removeEventListener("scroll", onScrollOrResize);
        window.removeEventListener("resize", onScrollOrResize);
      };
    };

    let cleanup: void | (() => void);
    const tryInit = () => {
      if (disposed) return;
      const ok = setup();
      if (ok === false) {
        raf = requestAnimationFrame(tryInit);
      } else {
        cleanup = ok as unknown as () => void;
      }
    };

    tryInit();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      cleanup?.();
    };
  }, [selector, cssVarName]);
}
