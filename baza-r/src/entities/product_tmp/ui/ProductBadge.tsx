type BadgeVariant = "discount" | "promo" | "exclusive" | "top";

const badgeConfig: Record<
  BadgeVariant,
  { label: (v?: number) => string; className: string }
> = {
  discount: {
    label: (v) => `-${v}%`,
    className: "bg-promotion/80 text-white px-5",
  },
  promo: {
    label: () => "АКЦІЯ",
    className: "bg-promotion/80 text-white px-5",
  },
  exclusive: {
    label: () => "ТІЛЬКИ В BAZA-R",
    className: "bg-accent text-black px-3",
  },
  top: {
    label: () => "ТОП ПРОДАЖІВ",
    className: "bg-premium text-black px-2",
  },
};

type Props = {
  variant: BadgeVariant;
  value?: number;
};

export function ProductBadge({ variant, value }: Props) {
  const config = badgeConfig[variant];
  return (
    <span
      className={`${config.className} rounded-full py-1 text-sm font-semibold`}
    >
      {config.label(value)}
    </span>
  );
}
