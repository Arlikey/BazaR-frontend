import { useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod/v3";
import { useEffect, useState } from "react";
import { categoryApi } from "@api/categoryApi";
import { CascadingCategorySelect } from "@components/categories/CascadingCategorySelect";
import { FormPageLayout } from "@layouts/FormPageLayout";
import { slugify } from "@utils/slugify";

const schema = z.object({
  name: z.string().min(1, "Назва обов'язкова"),
  slug: z.string().min(1, "Slug обов'язковий"),
  parentCategoryId: z
    .string()
    .transform((v) => (v === "" ? null : v))
    .nullable(),
  sortOrder: z.coerce.number().int().min(0),
});

type FormData = z.infer<typeof schema>;

export function CategoryCreatePage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [parentId, setParentId] = useState<string | null>(null);

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: categoryApi.getAll,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", parentCategoryId: null, sortOrder: 0 },
  });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data: FormData) => categoryApi.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
      navigate("/categories");
    },
  });

  const nameValue = useWatch({ control, name: "name" });

  useEffect(() => {
    if (nameValue) setValue("slug", slugify(nameValue));
  }, [nameValue, setValue]);

  return (
    <FormPageLayout
      title="Нова категорія"
      onBack={() => navigate("/categories")}
    >
      <form
        onSubmit={handleSubmit((data) => mutate(data))}
        className="flex flex-col gap-5"
      >
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Назва
          </label>
          <input
            {...register("name")}
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/80"
            placeholder="Назва категорії"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Slug
          </label>
          <input
            {...register("slug")}
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/80"
            placeholder="Slug категорії"
          />
          {errors.slug && (
            <p className="mt-1 text-xs text-red-500">{errors.slug.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Батьківська категорія
          </label>
          <CascadingCategorySelect
            categories={categories}
            value={parentId}
            onChange={(id) => {
              setParentId(id);
              setValue("parentCategoryId", id ?? "");
            }}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Порядок сортування
          </label>
          <input
            {...register("sortOrder")}
            type="number"
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/80"
          />
        </div>

        {isError && (
          <p className="text-sm text-red-500">Помилка. Спробуйте ще раз.</p>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/categories")}
            className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
          >
            Скасувати
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg bg-accent px-4 py-2 text-sm text-white hover:bg-accent-hover disabled:opacity-50"
          >
            {isPending ? "Збереження..." : "Створити"}
          </button>
        </div>
      </form>
    </FormPageLayout>
  );
}
