import type { ReactNode } from "react";
import Block from "../../../../shared/components/ui/Block";
import CustomLink from "../../../../shared/components/ui/CustomLink";

type DeliveryOption = {
  id: string;
  icon: ReactNode;
  label: string;
  sublabel?: string;
  date: string;
  price: string;
};

type DeliveryBlockProps = {
  city: string;
  cityHref?: string;
  options: DeliveryOption[];
};

export function DeliveryBlock({
  city,
  cityHref = "#",
  options,
}: DeliveryBlockProps) {
  return (
    <Block rounded="xl" className="flex flex-col gap-4 px-8 xl:pr-20 py-5 text-base">
      <div className="flex items-center gap-2">
        <span>Доставка в:</span>
        <CustomLink
          href={cityHref}
          variant="default"
          color="blue"
          className="font-medium"
        >
          {city}
        </CustomLink>
      </div>

      <div className="flex flex-col gap-4">
        {options.map((option) => (
          <div key={option.id} className="flex text-center justify-between gap-4">
            <div className="flex max-w-70 flex-2 items-center text-left gap-5">
              <div className="shrink-0">{option.icon}</div>
              <div className="flex flex-1 flex-col">
                <span>{option.label}</span>
                {option.sublabel && (
                  <CustomLink
                    href="#"
                    variant="default"
                    color="blue"
                    className="font-medium"
                  >
                    {option.sublabel}
                  </CustomLink>
                )}
              </div>
            </div>
            <span className="font-medium text-center flex-1">{option.date}</span>
            <span className="flex-1 text-right">{option.price}</span>
          </div>
        ))}
      </div>
    </Block>
  );
}
