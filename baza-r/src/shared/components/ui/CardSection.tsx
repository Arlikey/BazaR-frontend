import type { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};

export default function CardSection({ className, children }: Props) {
  return (
    <section
      className={[
        "bg-on-light bw-thin rounded-xl border-neutral-100",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </section>
  );
}