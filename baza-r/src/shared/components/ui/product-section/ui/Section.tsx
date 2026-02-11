import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export function Section({ title, children }: Props) {
  return (
    <section className="flex flex-col gap-4">
      <header className="flex items-end justify-between">
        <h2 className="text-[18px] font-medium">{title}</h2>
      </header>

      <div className="flex flex-col">{children}</div>
    </section>
  );
}
