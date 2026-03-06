import { useState, useRef, useEffect } from "react";
import Block from "../../../../shared/components/ui/Block";
import { Button } from "../../../../shared/components/ui/Button";

type Props = {
  html: string;
  collapsedHeight?: number;
};

export function ProductDescriptionBlock({
  html,
  collapsedHeight = 300,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (el) {
      setHasOverflow(el.scrollHeight > collapsedHeight);
    }
  }, [html, collapsedHeight]);

  return (
    <section className="flex flex-col gap-4">
      <Block rounded="xl" className="flex flex-col gap-4 px-8 py-6">
        <div className="relative">
          <div
            ref={contentRef}
            style={{ maxHeight: expanded ? undefined : collapsedHeight }}
            className="overflow-hidden transition-all duration-300"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {!expanded && hasOverflow && (
            <div className="from-surface pointer-events-none absolute right-0 bottom-0 left-0 h-16 bg-linear-to-t to-transparent" />
          )}
        </div>

        {hasOverflow && (
          <Button
            onClick={() => setExpanded((prev) => !prev)}
            color="default"
            className="hover:text-accent-hover w-fit text-base"
          >
            {expanded ? "Сховати" : "Показати ще"}
          </Button>
        )}
      </Block>
    </section>
  );
}
