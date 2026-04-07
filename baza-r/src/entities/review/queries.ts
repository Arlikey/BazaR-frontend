import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { reviewApi } from "./api/reviewApi";
import { toReview, type CreateReviewDto } from "./model/review";

export function useAddReview() {
  return useMutation({
    mutationFn: (data: CreateReviewDto) => reviewApi.addReview(data),
  });
}

export function useProductReviews(productId: string) {
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => reviewApi.getReviews(productId),
    select: (data) => ({
      ...data,
      items: data.items.map(toReview),
    }),
  });
}

export function useVoteReviewHelpful() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      reviewId,
      isHelpful,
    }: {
      reviewId: string;
      isHelpful: boolean;
    }) => reviewApi.voteHelpful(reviewId, isHelpful),
    onError: (err) => {
        console.log(err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
}
