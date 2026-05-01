import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod/v3";
import { attributeApi, type AttributeDto } from "@api/attributeApi";
import { FormPageLayout } from "@layouts/FormPageLayout";

const schema = z.object({
  name: z.string().min(1, "Назва обов'язкова"),
  code: z.string().min(1, "Код обов'язковий"),
  valueType: z.coerce.number().int().min(1).max(5),
  unit: z.string().nullable(),
  isSystem: z.boolean(),
});

type FormData = z.infer<typeof schema>;

export function AttributeFormPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      code: "",
      valueType: 1,
      unit: null,
      isSystem: false,
    },
  });

  const valueType = watch("valueType");

  const mutation = useMutation({
    mutationFn: (data: FormData) =>
      attributeApi.create({
        ...data,
        unit: data.unit || null,
        valueType: data.valueType as 1 | 2 | 3 | 4 | 5,
      }),
    onSuccess: (attr) => {
      qc.invalidateQueries({ queryKey: ["attributes"] });
      if (
        (attr as AttributeDto).valueType === 4 ||
        (attr as AttributeDto).valueType === 5
      ) {
        navigate(`/attributes/${(attr as AttributeDto).id}/options`);
      } else {
        navigate("/attributes");
      }
    },
  });

  return (
    <FormPageLayout
      title={"Новий атрибут"}
      onBack={() => navigate("/attributes")}
    >
        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className="flex flex-col gap-5"
        >
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Назва
            </label>
            <input
              {...register("name")}
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/80"
              placeholder="Оперативна пам'ять"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Код
            </label>
            <input
              {...register("code")}
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/80"
              placeholder="ram"
            />
            {errors.code && (
              <p className="text-red-500 text-xs mt-1">{errors.code.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Тип значення
            </label>
            <select
              {...register("valueType")}
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/80"
            >
              <option value={1}>Текст</option>
              <option value={2}>Число</option>
              <option value={3}>Булеве</option>
              <option value={4}>Вибір</option>
              <option value={5}>Мульти-вибір</option>
            </select>
            {(Number(valueType) === 4 || Number(valueType) === 5) && (
              <p className="text-xs text-blue-600 mt-1">
                Після збереження потрібно додати опції
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Одиниця виміру
            </label>
            <input
              {...register("unit")}
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/80"
              placeholder="GB, кг, см..."
            />
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("isSystem")} />
            Системний атрибут
          </label>

          {mutation.isError && (
            <p className="text-red-500 text-sm">Помилка. Спробуйте ще раз.</p>
          )}

          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={() => navigate("/attributes")}
              className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-50"
            >
              Скасувати
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="px-4 py-2 text-sm rounded-lg bg-accent text-white hover:bg-accent-hover disabled:opacity-50"
            >
              {mutation.isPending ? "Збереження..." : "Зберегти"}
            </button>
          </div>
        </form>
    </FormPageLayout>
  );
}
