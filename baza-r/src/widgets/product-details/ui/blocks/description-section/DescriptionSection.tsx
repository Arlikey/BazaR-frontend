import Block from "@/shared/components/ui/Block";
import { Button } from "@/shared/components/ui/Button";
import { Expandable } from "@/shared/components/ui/Expandable";
import Skeleton from "@/shared/components/ui/loaders/Skeleton";
import { useRef } from "react";
import ReactMarkdown from "react-markdown";

type Props = {
  description: string | null;
};

export function DescriptionSection({ description }: Props) {
  if (!description) return null;

  return (
    <section className="scroll-mt-(--scroll-offset)">
      <Block className="flex flex-col gap-5 p-4 md:p-6 lg:flex-row">
        <div className="w-full lg:w-1/3">
          <h2 className="sticky top-(--scroll-offset) text-2xl">Опис</h2>
        </div>

        <div className="relative flex-1 flex-col">
          <Expandable labelMore="Читати повністю">
            <div className="prose max-w-full">
              <ReactMarkdown>{description}</ReactMarkdown>
            </div>
          </Expandable>
        </div>
      </Block>
    </section>
  );
}

export function DescriptionSkeletonSection() {
  return (
    <section className="scroll-mt-(--scroll-offset)">
      <Block className="flex flex-col gap-5 p-4 md:p-6 lg:flex-row">
        <div className="w-full lg:w-1/3">
          <h2 className="sticky top-(--scroll-offset) text-2xl">Опис</h2>
        </div>

        <Skeleton className="h-80 flex-1 rounded-lg" />
      </Block>
    </section>
  );
}
