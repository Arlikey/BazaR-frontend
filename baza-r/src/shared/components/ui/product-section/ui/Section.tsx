import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function Section({ title, children, className }: Props) {
  return (
    <section className="flex flex-col gap-4">
      <header className="flex items-end justify-between">
        <h2 className="text-[18px] font-medium">{title}</h2>
      </header>

      <div className={`flex flex-col ${className}`}>{children}</div>
    </section>
  );
}
