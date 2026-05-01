import type { ReviewsSummaryResponse } from "@/entities/review/model/review";
import { StarIcon } from "@/shared/components/icons/ui/StarIcon";
import CreateReviewButton from "@/features/review/ui/CreateReviewButton";
import { pluralize, PLURALS } from "@/shared/lib/pluralize";

type Props = {
  reviewsSummary: ReviewsSummaryResponse;
  productId: string;
};

export function ReviewsSummaryBlock({ reviewsSummary, productId }: Props) {
  const total = reviewsSummary.reviewsCount;

  const stars = [
    { star: 5, count: reviewsSummary.fiveStarsCount },
    { star: 4, count: reviewsSummary.fourStarsCount },
    { star: 3, count: reviewsSummary.threeStarsCount },
    { star: 2, count: reviewsSummary.twoStarsCount },
    { star: 1, count: reviewsSummary.oneStarCount },
  ];

  const getPercent = (count: number) => {
    return (count / total) * 100;
  };

  return (
    <div className="w-full lg:w-1/3">
      <div className="sticky top-(--scroll-offset) w-full space-y-3 lg:w-3/4">
        <h2 className="mb-6 text-2xl">Відгуки та питання</h2>
        {reviewsSummary.reviewsCount > 0 && (
          <>
            <div className="mb-4 text-lg">
              <p>
                Оцінка користувачів{" "}
                <span className="font-bold">
                  {reviewsSummary.averageRating}/
                </span>
                <span className="text-sm">5 </span>
                <StarIcon className="inline text-[#FFA900]" />
              </p>
              <span className="text-muted text-base">
                на основі{" "}
                <span className="text-black">
                  {reviewsSummary.reviewsCount}{" "}
                  {pluralize(reviewsSummary.reviewsCount, PLURALS.review)}
                </span>
              </span>
            </div>
            <ul className="mb-4 space-y-3">
              {stars.map(({ star, count }) => (
                <li key={star} className="flex items-center gap-3">
                  <span className="tabular-nums">{star}</span>

                  <StarIcon className="text-[#FFA900]" />

                  <div className="h-2 flex-1 rounded-xl bg-neutral-100/60">
                    <div
                      className="h-full rounded-xl bg-[#FFA900]"
                      style={{ width: `${getPercent(count)}%` }}
                    />
                  </div>

                  <span className="min-w-1/5 tabular-nums">{count}</span>
                </li>
              ))}
            </ul>
          </>
        )}
        <div className="w-full lg:w-5/6">
          <CreateReviewButton productId={productId} className="w-full">
            Написати відгук
          </CreateReviewButton>
        </div>
      </div>
    </div>
  );
}
