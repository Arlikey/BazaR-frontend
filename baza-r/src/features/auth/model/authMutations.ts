import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/authApi";
import { meQueryKey } from "../../../entities/user/queries";

export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: authApi.login,
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

export function useLogout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => qc.invalidateQueries({ queryKey: meQueryKey }),
  });
}
