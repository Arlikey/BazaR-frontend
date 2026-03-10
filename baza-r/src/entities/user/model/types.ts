export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  status: "Active" | "Inactive";
  roles: string[];
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
};
