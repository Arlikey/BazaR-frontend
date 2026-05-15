import {
  useProductReviews,
  useProductReviewsSummary,
} from "@/entities/review/queries";
import Block from "@/shared/components/ui/Block";
import { ProductReviewsBlock } from "./ProductReviewsBlock";
import {
  ReviewsSummaryBlock,
  ReviewsSummarySkeletonBlock,
} from "./ReviewsSummaryBlock";
import Skeleton from "@/shared/components/ui/loaders/Skeleton";

type Props = {
  productId: string;
  productSlug: string;
};

export function ReviewsSection({ productId, productSlug }: Props) {
  const { data: reviews, isLoading: isReviewsLoading } =
    useProductReviews(productId);
  const { data: summary, isLoading: isSummaryLoading } =
    useProductReviewsSummary(productId);

  return (
    <section id="reviews" className="scroll-mt-(--scroll-offset)">
      <Block className="flex flex-col gap-5 p-4 md:p-6 lg:flex-row">
        {isSummaryLoading ? (
          <ReviewsSummarySkeletonBlock />
        ) : (
          <ReviewsSummaryBlock reviewsSummary={summary} productId={productId} />
        )}

        {isReviewsLoading ? (
          <div className="flex flex-1 flex-col gap-4">
            <Skeleton className="flex h-12 w-32 rounded-lg" />
            <Skeleton className="flex h-80 rounded-xl" />
          </div>
        ) : (
          <ProductReviewsBlock
            reviews={reviews?.items ?? []}
            totalCount={summary?.reviewsCount ?? 0}
            productSlug={productSlug}
            productId={productId}
          />
        )}
      </Block>
    </section>
  );
}
