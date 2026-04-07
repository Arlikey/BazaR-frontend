import type { Review } from "../../../../../entities/review/model/review";
import CustomLink from "../../../../../shared/components/ui/CustomLink";
import { ReviewCard } from "./ReviewCard";

type Props = {
  reviews: Review[];
  totalCount: number;
  productSlug: string;
};

export function ProductReviewsBlock({
  reviews,
  totalCount,
  productSlug,
}: Props) {
  return (
    <section id="reviews" className="flex flex-col gap-4">
      <div className="flex flex-col gap-5">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {totalCount > 3 && (
        <CustomLink
          to={`/product/${productSlug}/reviews`}
          variant="default"
          className="text-accent self-start text-sm"
        >
          Дивитися всі відгуки ({totalCount})
        </CustomLink>
      )}
    </section>
  );
}
