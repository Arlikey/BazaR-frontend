export type ReviewPhoto = {
  id: string;
  src: string;
  alt?: string;
};

export type ReviewReply = {
  id: string;
  author: string;
  isSeller: boolean;
  text: string;
  date: string;
};

export type CreateReviewDto = {
  productId: string;
  rating: number;
  advantages?: string;
  disadvantages?: string;
  body: string;
};

export type ReviewApi = {
  reviewId: string;
  productId: string;
  authorUserId: string;
  authorDisplayName: string;
  rating: number;
  advantages: string | null;
  disadvantages: string | null;
  body: string;
  status: "Pending" | "Approved" | "Rejected";
  helpfulVotesCount: number;
  notHelpfulVotesCount: number;
  createdAtUtc: string;
  updatedAtUtc: string;
  moderatedAtUtc: string | null;
};

export type ReviewsResponse = {
  items: ReviewApi[];
  totalCount: number;
  page: number;
  pageSize: number;
};

export type ReviewsSummaryResponse = {
  productId: string;
  averageRating: number;
  reviewsCount: number;
  fiveStarsCount: number;
  fourStarsCount: number;
  threeStarsCount: number;
  twoStarsCount: number;
  oneStarCount: number;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  body: string;
  advantages?: string;
  disadvantages?: string;
  likes: number;
  dislikes: number;
  date: string;
};

export function toReview(api: ReviewApi): Review {
  return {
    id: api.reviewId,
    author: api.authorDisplayName,
    rating: api.rating,
    body: api.body,
    advantages: api.advantages ?? undefined,
    disadvantages: api.disadvantages ?? undefined,
    likes: api.helpfulVotesCount,
    dislikes: api.notHelpfulVotesCount,
    date: api.createdAtUtc,
  };
}
