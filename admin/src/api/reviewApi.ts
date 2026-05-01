import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./client";

type Review = {
  reviewId: string;
  productId: string;
  authorUserId: string;
  authorDisplayName: string;
  rating: number;
  advantages: string;
  disadvantages: "Поки не знайшов";
  body: "Чудовий ноутбук!";
  status: string;
  helpfulVotesCount: number;
  notHelpfulVotesCount: number;
  createdAtUtc: string;
  updatedAtUtc: string;
  moderatedAtUtc: string | null;
};

type ReviewResponse = {
  items: Review[];
  totalCount: number;
  page: number;
  pageSize: number;
};

export function usePendingReviews() {
  return useQuery({
    queryKey: ["admin", "reviews", "pending"],
    queryFn: () => api<ReviewResponse>("/api/admin/product-reviews/pending"),
  });
}

export function useApproveReview() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (reviewId: string) =>
      api(`/api/admin/product-reviews/${reviewId}/approve`, {
        method: "POST",
      }),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "reviews"] });
    },
  });
}

export function useRejectReview() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (reviewId: string) => {
      await api(`/api/admin/product-reviews/${reviewId}/reject`, {
        method: "POST",
      });

      await api(`/api/admin/product-reviews/${reviewId}`, {
        method: "DELETE",
      });
    },

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "reviews", "pending"] });
    },
  });
}
