import type { ReactNode } from "react";
import Block from "@/shared/components/ui/Block";

type PaymentGuaranteeItem = {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
};

type PaymentGuaranteeBlockProps = {
  items: PaymentGuaranteeItem[];
};

export function PaymentGuaranteeBlock({ items }: PaymentGuaranteeBlockProps) {
  return (
    <Block rounded="xl" className="flex flex-col gap-4 px-4 md:px-8 py-5 pr-25">
      {items.map((item) => (
        <div key={item.id} className="flex items-start gap-4">
          <div className="mt-0.5 shrink-0">{item.icon}</div>
          <p className="text-base">
            <span className="font-semibold">{item.title}.</span>{" "}
            {item.description}
          </p>
        </div>
      ))}
    </Block>
  );
}
