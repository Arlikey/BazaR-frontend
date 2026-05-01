import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createReviewSchema,
  type CreateReviewFormValues,
} from "./review.schema";
import { useMe } from "@/entities/user/queries";

export function useCreateReviewForm() {
  const { data: user } = useMe();

  const form = useForm<CreateReviewFormValues>({
    resolver: zodResolver(createReviewSchema),
    mode: "onChange",

    defaultValues: {
      rating: 0,
      comment: "",
      advantages: "",
      disadvantages: "",
      name: user ? `${user.firstName} ${user.lastName}` : "",
      email: user?.email ?? "",
      images: [],
    },
  });

  return form;
}
