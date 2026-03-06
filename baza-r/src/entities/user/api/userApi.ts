import { api } from "../../../shared/api/client";
import type { User } from "../model/types";

const mockUser: User = {
  id: 1,
  firstName: "Катерина",
  lastName: "Іванова",
  email: "v1kmessage@gmail.com",
  phone: "+380931234567",
  language: "uk",
};

export const userApi = {
  // me: () => api<User>("/auth/me"),
  me: (): Promise<User> => {
    const isLoggedIn = localStorage.getItem("mock_logged_in") === "true";
    if (!isLoggedIn) return Promise.reject({ status: 401 });
    return Promise.resolve(mockUser);
  },
};