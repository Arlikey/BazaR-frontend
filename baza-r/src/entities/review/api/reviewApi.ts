import { api } from "@/shared/api/client";
import type {
  CreateReviewDto,
  ReviewsResponse,
  ReviewsSummaryResponse,
} from "../model/review";

export const reviewApi = {
  addReview: (data: CreateReviewDto) =>
    api("/api/customer/product-reviews", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getReviews: async (productId: string) =>
    await api<ReviewsResponse>(`/api/products/${productId}/reviews`),
  getReviewsSummary: async (productId: string) =>
    await api<ReviewsSummaryResponse>(
      `/api/products/${productId}/reviews/summary`,
    ),
  voteHelpful: (reviewId: string, isHelpful: boolean) =>
    api(`/api/customer/product-reviews/${reviewId}/vote`, {
      method: "POST",
      body: JSON.stringify({ isHelpful }),
    }),
};
