import { useState, useEffect } from "react";
import { PRODUCT_TABS } from "../config/product-tabs.config";

export function useProductTabs() {
  const [activeHref, setActiveHref] = useState(PRODUCT_TABS[0].href);

  useEffect(() => {
    const getActiveHref = () => {
      const sections = PRODUCT_TABS.map(({ href }) => ({
        href,
        el: document.querySelector(href),
      })).filter((s): s is { href: string; el: Element } => s.el !== null);

      const offset = window.innerHeight * 0.2;

      let active = sections[0].href;

      for (const { href, el } of sections) {
        const top = el.getBoundingClientRect().top;
        if (top <= offset) {
          active = href;
        }
      }

      return active;
    };

    const handleScroll = () => {
      setActiveHref(getActiveHref());
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { activeHref };
}
