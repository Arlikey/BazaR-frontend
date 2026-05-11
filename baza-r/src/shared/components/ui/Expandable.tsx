import { useState, useRef, useEffect, type ReactNode } from "react";
import { Button } from "./Button";
import { ArrowIcon } from "../icons/ui/ArrowIcon";
import IconWrapper from "./IconWrapper";

type Props = {
  children: ReactNode;
  collapsedHeight?: number;
  labelMore?: string;
  labelLess?: string;
};

export function Expandable({
  children,
  collapsedHeight = 400,
  labelMore = "Показати ще",
  labelLess = "Приховати",
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [fullHeight, setFullHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setFullHeight(el.scrollHeight);
    setHasOverflow(el.scrollHeight > collapsedHeight);
  }, [collapsedHeight, children]);

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={ref}
        className="relative overflow-hidden transition-[max-height] duration-500 ease-in-out"
        style={{ maxHeight: expanded ? fullHeight : collapsedHeight }}
      >
        {children}
        {!expanded && hasOverflow && (
          <div className="from-surface pointer-events-none absolute right-0 bottom-0 left-0 h-16 bg-linear-to-t to-transparent" />
        )}
      </div>

      {hasOverflow && (
        <Button
          onClick={() => setExpanded((p) => !p)}
          color="default"
          className="hover:text-accent w-fit gap-2 text-base"
        >
          {expanded ? labelLess : labelMore}
          <IconWrapper className={`rotate-90 ${expanded && "rotate-270"}`}>
            <ArrowIcon />
          </IconWrapper>
        </Button>
      )}
    </div>
  );
}
