import {
  useProductReviews,
  useProductReviewsSummary,
} from "../../../../../entities/review/queries";
import Block from "../../../../../shared/components/ui/Block";
import { ProductReviewsBlock } from "./ProductReviewsBlock";
import { ReviewsSummaryBlock } from "./ReviewsSummaryBlock";

type Props = {
  productId: string;
  productSlug: string;
};

export function ReviewsSection({ productId, productSlug }: Props) {
  const { data: reviews } = useProductReviews(productId);
  const { data: summary } = useProductReviewsSummary(productId);

  return (
    <section id="reviews" className="scroll-mt-(--scroll-offset)">
      <Block className="flex gap-5 p-6">
        <ReviewsSummaryBlock reviewsSummary={summary} productId={productId} />

        <ProductReviewsBlock
          reviews={reviews?.items ?? []}
          totalCount={summary?.reviewsCount ?? 0}
          productSlug={productSlug}
          productId={productId}
        />
      </Block>
    </section>
  );
}
