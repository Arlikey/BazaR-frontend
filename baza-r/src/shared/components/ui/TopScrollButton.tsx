import { useState, useEffect } from "react";
import { Button } from "./Button";
import IconWrapper from "./IconWrapper";
import { ArrowIcon } from "../icons/ui/ArrowIcon";

const THRESHOLD = 400;

export function TopScrollButton() {
  const [visible, setVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY;
      const scrolledUp = currentY < lastScrollY;
      const pastThreshold = currentY > THRESHOLD;

      setVisible(scrolledUp && pastThreshold);
      setLastScrollY(currentY);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <Button
      className={`border-accent fixed right-6 bottom-20 md:bottom-12 z-50 shadow-lg transition duration-300 hover:bg-white ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
      rounded="pill"
      size="icon"
      variant="outline"
      color="secondary"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <IconWrapper className="-rotate-90">
        <ArrowIcon />
      </IconWrapper>
    </Button>
  );
}
