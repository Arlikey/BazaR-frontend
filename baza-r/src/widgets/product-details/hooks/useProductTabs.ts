import { useState, useEffect, useRef } from "react";
import { PRODUCT_TABS } from "../config/product-tabs.config";

export function useProductTabs() {
  const [activeId, setActiveId] = useState(PRODUCT_TABS[0].id);
  const ticking = useRef(false);

  useEffect(() => {
    const getActiveId = () => {
      const scrollY = window.scrollY;
      const offset = window.innerHeight * 0.2;

      const sections = PRODUCT_TABS.map(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return null;
        return { id, top: el.getBoundingClientRect().top + scrollY };
      }).filter(Boolean) as { id: string; top: number }[];

      let current = sections[0]?.id ?? PRODUCT_TABS[0].id;
      for (const section of sections) {
        if (scrollY + offset >= section.top) {
          current = section.id;
        }
      }

      setActiveId(current);
    };

    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          getActiveId();
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    getActiveId();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { activeId };
}
