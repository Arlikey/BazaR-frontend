import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tokenStorage } from "./token.storage";
import { meQueryKey } from "../../../entities/user/queries";
import { useNavigate } from "react-router";
import { authApi } from "../api/authApi";
import { useAuthStore } from "../../../shared/model/auth.store";

export function useLogin() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (tokens) => {
      tokenStorage.set(tokens);
      qc.invalidateQueries({ queryKey: meQueryKey });
      useAuthStore.getState().setAuthenticated(true);
    },
  });
}

export function useRegister() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (tokens) => {
      tokenStorage.set(tokens);
      qc.invalidateQueries({ queryKey: meQueryKey });
    },
  });
}

export function useLogout() {
  const qc = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      tokenStorage.clear();
      qc.removeQueries({ queryKey: meQueryKey });
      useAuthStore.getState().setAuthenticated(false);
      navigate("/");
    },
    onError: (err) => {
      tokenStorage.clear();
      qc.removeQueries({ queryKey: meQueryKey });
      useAuthStore.getState().setAuthenticated(false);
      console.log("Logout error:", err);
      navigate("/");
    },
  });
}
