import Block from "../../../../../shared/components/ui/Block";

type Props = {
  description: string;
};

export function DescriptionSection({ description }: Props) {
  return (
    <section className="scroll-mt-(--scroll-offset)">
      <Block className="flex flex-col gap-5 p-4 md:p-6 lg:flex-row">
        <div className="w-full lg:w-1/3">
          <h2 className="sticky top-(--scroll-offset) text-2xl">Опис</h2>
        </div>

        <div className="flex flex-1 flex-col gap-6">{description}</div>
      </Block>
    </section>
  );
}
