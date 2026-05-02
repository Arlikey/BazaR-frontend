import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../api/client";
import { useNavigate } from "react-router";
import { getRole, tokenStorage } from "../api/token.storage";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

export function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const tokens = await api<{
        accessToken: string;
        refreshToken: string;
        userId: string;
      }>("/api/auth/login", { method: "POST", body: JSON.stringify(data) });
      tokenStorage.set(tokens);

      const role = getRole();
      if (role !== "Admin") {
        tokenStorage.clear();
        setError("root", {
          message: "Доступ заборонено. Потрібна роль адміна.",
        });
        return;
      }

      navigate("/");
    } catch {
      setError("root", { message: "Невірний email або пароль" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-sm">
        <h1 className="text-xl font-bold mb-6">Baza-R Admin</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Email
            </label>
            <input
              {...register("email")}
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Пароль
            </label>
            <input
              {...register("password")}
              type="password"
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {errors.root && (
            <p className="text-red-500 text-sm">{errors.root.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-accent text-white py-2 rounded-lg text-sm font-medium hover:bg-accent-hover disabled:opacity-50"
          >
            {isSubmitting ? "Вхід..." : "Увійти"}
          </button>
        </form>
      </div>
    </div>
  );
}
