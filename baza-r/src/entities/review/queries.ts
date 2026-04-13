import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { reviewApi } from "./api/reviewApi";
import { toReview, type CreateReviewDto } from "./model/review";
import { EMPTY_REVIEWS_SUMMARY } from "./model/emptyReviewsSummary";

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

export function useProductReviewsSummary(productId: string) {
  return useQuery({
    queryKey: ["reviews-summary", productId],
    queryFn: async () => {
      const data = await reviewApi.getReviewsSummary(productId);
      return data ?? EMPTY_REVIEWS_SUMMARY;
    },
    initialData: EMPTY_REVIEWS_SUMMARY,
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
}
