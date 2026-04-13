import type { Review } from "../../../../../entities/review/model/review";
import CreateReviewButton from "../../../../../features/review/ui/CreateReviewButton";
import { ArrowIcon } from "../../../../../shared/components/icons/ui/ArrowIcon";
import Block from "../../../../../shared/components/ui/Block";
import { Button } from "../../../../../shared/components/ui/Button";
import CustomLink from "../../../../../shared/components/ui/CustomLink";
import IconWrapper from "../../../../../shared/components/ui/IconWrapper";
import { ReviewCard } from "./ReviewCard";

type Props = {
  reviews: Review[];
  totalCount: number;
  productSlug: string;
  productId?: string;
};

export function ProductReviewsBlock({
  reviews,
  totalCount,
  productSlug,
  productId,
}: Props) {
  const previewReviews = reviews.slice(0, 3);

  return (
    <section id="reviews" className="flex flex-1 flex-col gap-4">
      <Button
        className="border-accent text-accent hover:bg-accent w-fit border bg-transparent px-4 py-3 hover:text-white"
        rounded="md"
      >
        Відгуки ({totalCount})
      </Button>

      {totalCount > 0 ? (
        <div className="flex flex-col gap-5">
          {previewReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <Block className="p-10">
          <p className="font-semibold">Відгуків ще немає</p>
          <p className="text-muted mt-1 text-base">
            Станьте першим, хто поділиться своєю думкою!
          </p>
          <CreateReviewButton productId={productId!} className="mt-3">
            Залишити відгук
          </CreateReviewButton>
        </Block>
      )}

      {totalCount > 3 && (
        <CustomLink
          to={`/product/${productSlug}/reviews`}
          variant="default"
          className="text-accent ml-8 self-start text-base"
        >
          Дивитися всі відгуки{" "}
          <IconWrapper>
            <ArrowIcon />
          </IconWrapper>
        </CustomLink>
      )}
    </section>
  );
}
