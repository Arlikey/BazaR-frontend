import { api } from "@/shared/api/client";
import type { User } from "../model/types";

export const userApi = {
  me: () => api<User>("/api/customer/me"),
};