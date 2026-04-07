import { api } from "../../../shared/api/client";
import type { CreateReviewDto, ReviewsResponse } from "../model/review";

export const reviewApi = {
  addReview: (data: CreateReviewDto) =>
    api("/api/customer/product-reviews", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getReviews: (productId: string) =>
    api<ReviewsResponse>(`/api/products/${productId}/reviews`),
  voteHelpful: (reviewId: string, isHelpful: boolean) =>
    api(`/api/customer/product-reviews/${reviewId}/vote`, {
      method: "POST",
      body: JSON.stringify({ isHelpful }),
    }),
};
