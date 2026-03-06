import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi, type LoginPayload } from "../api/authApi";
import { meQueryKey } from "../../../entities/user/queries";

// export function useLogin() {
//   const qc = useQueryClient();
//   return useMutation({
//     mutationFn: authApi.login,
//     onSuccess: () => qc.invalidateQueries({ queryKey: meQueryKey }),
//   });
// }

export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      localStorage.setItem("mock_logged_in", "true");
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: meQueryKey }),
  });
}

export function useRegister() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: authApi.register,
    onSuccess: () => qc.invalidateQueries({ queryKey: meQueryKey }),
  });
}

// export function useLogout() {
//   const qc = useQueryClient();
//   return useMutation({
//     mutationFn: authApi.logout,
//     onSuccess: () => qc.invalidateQueries({ queryKey: meQueryKey }),
//   });
// }

export function useLogout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem("mock_logged_in");
    },
    onSuccess: () => qc.removeQueries({ queryKey: meQueryKey }),
  });
}