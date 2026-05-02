import {
  useApproveReview,
  usePendingReviews,
  useRejectReview,
} from "../api/reviewApi";

export function AdminPendingReviews() {
  const { data, isLoading } = usePendingReviews();
  const { mutate: approve } = useApproveReview();
  const { mutate: reject } = useRejectReview();

  if (isLoading) return <div>Loading...</div>;

  if (!data?.items?.length) {
    return <div>Немає відгуків на модерації</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {data.items.map((review) => (
        <div
          key={review.reviewId}
          className="flex gap-3 rounded-xl bw-thin border-neutral-100 bg-white p-4"
        >
          <div className="flex flex-col flex-1 justify-between">
            <div>
              <p className="font-medium">{review.authorDisplayName}</p>
              <p className="text-sm text-neutral-400">ID товару: {review.productId}</p>
            </div>

            <span>Рейтинг: {review.rating}</span>
            <p>{review.body}</p>
            {review.advantages && <p>Переваги: {review.advantages}</p>}
            {review.disadvantages && <p>Недоліки: {review.disadvantages}</p>}
          </div>

          <div className="flex h-fit gap-2">
            <button
              onClick={() => approve(review.reviewId)}
              className="rounded-md bg-accent px-4 py-2 text-white"
            >
              Прийняти
            </button>

            <button
              onClick={() => reject(review.reviewId)}
              className="rounded-md bg-promotion px-4 py-2 text-white"
            >
              Відхилити
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
