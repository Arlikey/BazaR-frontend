import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod/v3";
import { categoryApi } from "../api/categoryApi";
import { CascadingCategorySelect } from "../components/categories/CascadingCategorySelect";
import { useState } from "react";
import { FormPageLayout } from "../layouts/FormPageLayout";

const schema = z.object({
  name: z.string().min(1, "Назва обов'язкова"),
  parentCategoryId: z
    .string()
    .transform((v) => (v === "" ? null : v))
    .nullable(),
  sortOrder: z.coerce.number().int().min(0),
});

type FormData = z.infer<typeof schema>;

export function CategoryFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [parentId, setParentId] = useState<string | null>(null);

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: categoryApi.getAll,
  });

  const editing = isEditing ? categories.find((c) => c.id === id) : null;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", parentCategoryId: null, sortOrder: 0 },
  });

  useEffect(() => {
    if (editing) {
      reset({
        name: editing.name,
        parentCategoryId: editing.parentCategoryId,
        sortOrder: editing.sortOrder,
      });
      setParentId(editing.parentCategoryId);
    }
  }, [editing?.id]);

  const handleParentChange = (id: string | null) => {
    setParentId(id);
    setValue("parentCategoryId", id ?? "");
  };

  const mutation = useMutation({
    mutationFn: (data: FormData) =>
      isEditing ? categoryApi.update(id!, data) : categoryApi.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
      navigate("/categories");
    },
  });

  const selectedCategory = parentId
    ? categories.find((c) => c.id === parentId)
    : null;

  return (
    <FormPageLayout
      title={isEditing ? "Редагувати категорію" : "Нова категорія"}
      onBack={() => navigate("/categories")}
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
            placeholder="Назва категорії"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Батьківська категорія
          </label>
          <CascadingCategorySelect
            categories={categories}
            value={parentId}
            onChange={handleParentChange}
            excludeId={id}
          />
          {selectedCategory && (
            <p className="text-xs text-gray-500 mt-1">
              Обрано:{" "}
              <span className="font-medium text-gray-700">
                {selectedCategory.name}
              </span>
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Порядок сортування
          </label>
          <input
            {...register("sortOrder")}
            type="number"
            className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/80"
          />
        </div>

        {mutation.isError && (
          <p className="text-red-500 text-sm">Помилка. Спробуйте ще раз.</p>
        )}

        <div className="flex gap-3 justify-end pt-2">
          <button
            type="button"
            onClick={() => navigate("/categories")}
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
