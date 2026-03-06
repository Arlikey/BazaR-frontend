import { useLayoutEffect } from "react";

type Options = {
  selector?: string;
  cssVarName?: string;
  measure?: "bottom" | "height";
};

export function useElementOffset({
  selector = "[data-app-header]",
  cssVarName = "--top-offset",
  measure = "bottom",
}: Options = {}) {
  useLayoutEffect(() => {
    let disposed = false;
    let raf = 0;

    const setup = (): (() => void) | false => {
      const element = document.querySelector<HTMLElement>(selector);
      if (!element) return false;

      const setOffset = () => {
        const rect = element.getBoundingClientRect();
        const value =
          measure === "height" ? rect.height : Math.max(0, rect.bottom);
        document.documentElement.style.setProperty(
          cssVarName,
          `${Math.round(value)}px`,
        );
      };

      setOffset();

      const onScrollOrResize = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(setOffset);
      };

      const ro = new ResizeObserver(onScrollOrResize);
      ro.observe(element);

      window.addEventListener("scroll", onScrollOrResize, { passive: true });
      window.addEventListener("resize", onScrollOrResize);

      return () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        window.removeEventListener("scroll", onScrollOrResize);
        window.removeEventListener("resize", onScrollOrResize);
      };
    };

    let cleanup: (() => void) | undefined;

    const tryInit = () => {
      if (disposed) return;
      const result = setup();
      if (result === false) {
        raf = requestAnimationFrame(tryInit);
      } else {
        cleanup = result;
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
