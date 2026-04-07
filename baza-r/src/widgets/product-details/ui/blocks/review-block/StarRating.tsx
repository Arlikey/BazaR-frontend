import { StarIcon } from "../../../../../shared/components/icons/ui/StarIcon";

type StarRatingProps = {
  rating: number;
  size?: number;
  gap?: number;
  max?: number;
};

export function StarRating({
  rating,
  size = 16,
  gap = 2,
  max = 5,
}: StarRatingProps) {
  const stars = Array.from({ length: max });

  const filledWidth = rating * size + Math.floor(rating) * gap;

  return (
    <div
      className="relative inline-flex"
      style={{ gap }}
      role="img"
      aria-label={`Рейтинг ${rating} з ${max}`}
    >
      <div className="flex text-neutral-200" style={{ gap }}>
        {stars.map((_, i) => (
          <StarIcon key={i} size={size} />
        ))}
      </div>

      <div
        className="absolute inset-0 flex overflow-hidden text-[#FFA900]"
        style={{ width: filledWidth, gap }}
      >
        {stars.map((_, i) => (
          <StarIcon key={i} size={size} className="shrink-0" />
        ))}
      </div>
    </div>
  );
}
