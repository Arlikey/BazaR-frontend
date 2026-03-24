import type { ReactNode } from "react";
import CustomLink from "../../CustomLink";

type Props = {
  title: string;
  subtitle: string;
  href: string;
  image: ReactNode;
  className?: string;
};

export function PromoTile({ title, subtitle, href, image, className }: Props) {
  return (
    <div className={`overflow-hidden rounded-xl ${className ?? ""}`}>
      <div className="flex h-full items-center justify-between p-5 pr-12.5 pb-10">
        <div className="text-inverse flex h-full max-w-105 flex-1 flex-col justify-between gap-7.5 leading-[150%]">
          <div className="flex max-w-90 flex-col items-start justify-start">
            <div className="text-xl font-medium">
              Добірка подарунків у розділі
            </div>
            <div className="line-clamp-2 text-xl font-medium">{subtitle}</div>
          </div>
          <div className="flex flex-col items-center justify-between gap-7.5">
            <div className="font-[Days_One] text-3xl 2xl:text-[40px] leading-[150%]">
              {title}
            </div>

            <CustomLink
              to={href}
              variant="primary"
              className="text-md h-9 px-10 font-medium"
            >
              Перейти
            </CustomLink>
          </div>
        </div>

        <div className="min-w-30">{image}</div>
      </div>
    </div>
  );
}
