import { useEffect, useState, type RefObject } from "react";

export function useIntersection(
  ref: RefObject<Element>,
  options?: IntersectionObserverInit,
) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, options]);

  return isVisible;
}
