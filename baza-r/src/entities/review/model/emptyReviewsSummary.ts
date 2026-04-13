import type { ReviewsSummaryResponse } from "./review";

export const EMPTY_REVIEWS_SUMMARY: ReviewsSummaryResponse = {
  productId: "",
  averageRating: 0,
  reviewsCount: 0,
  fiveStarsCount: 0,
  fourStarsCount: 0,
  threeStarsCount: 0,
  twoStarsCount: 0,
  oneStarCount: 0,
};
