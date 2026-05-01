import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function Section({ title, children }: Props) {
  return (
    <section className="flex min-w-0 flex-col gap-4">
      <header className="flex items-end justify-between">
        <h2 className="text-[18px] font-medium">{title}</h2>
      </header>
      <div className="overflow-x-auto">{children}</div>
    </section>
  );
}
