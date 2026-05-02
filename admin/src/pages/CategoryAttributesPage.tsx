import { useNavigate, useParams } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod/v3";
import { categoryApi } from "../api/categoryApi";
import { attributeApi, valueTypeLabels } from "../api/attributeApi";
import { FormPageLayout } from "../layouts/FormPageLayout";

const schema = z.object({
  attributeId: z.string().min(1, "Оберіть атрибут"),
  isRequired: z.boolean(),
  isFilterable: z.boolean(),
  sortOrder: z.coerce.number().int().min(0),
  sectionName: z.string().min(1, "Назва секції обов'язкова"),
  sectionOrder: z.coerce.number().int().min(0),
});

type FormData = z.infer<typeof schema>;

export function CategoryAttributesPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: categoryApi.getAll,
  });

  const { data: attributes = [] } = useQuery({
    queryKey: ["attributes"],
    queryFn: attributeApi.getAll,
  });

  const { data: template = [], refetch } = useQuery({
    queryKey: ["category-template", id],
    queryFn: () => attributeApi.getCategoryTemplate(id!),
    enabled: !!id,
  });

  const category = categories.find((c) => c.id === id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      attributeId: "",
      isRequired: false,
      isFilterable: false,
      sortOrder: 0,
      sectionName: "",
      sectionOrder: 0,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: FormData) => attributeApi.assignToCategory(id!, data),
    onSuccess: () => {
      reset();
      refetch();
    },
  });

  return (
    <FormPageLayout
      onBack={() => navigate("/categories")}
      title={`Атрибути категорії ${category ? ` — ${category.name}` : ""}`}
    >
      {template.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            Прив'язані атрибути
          </h2>
          <div className="flex flex-col gap-2">
            {template.map((t) => {
              const attr = attributes.find((a) => a.id === t.attributeId);
              return (
                <div
                  key={t.attributeId}
                  className="flex items-center justify-between text-sm bg-gray-50 rounded-lg px-4 py-3"
                >
                  <span className="font-medium">
                    {attr?.name ?? t.attributeId}
                  </span>
                  <div className="flex gap-2 text-xs">
                    {t.isRequired && (
                      <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded-full">
                        Обов'язковий
                      </span>
                    )}
                    {t.isFilterable && (
                      <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                        Фільтрований
                      </span>
                    )}
                    <span className="text-gray-500">{t.sectionName}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-sm font-semibold text-gray-700 mb-4">
          Прив'язати атрибут
        </h2>
        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className="flex flex-col gap-4"
        >
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Атрибут
            </label>
            <select
              {...register("attributeId")}
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/80"
            >
              <option value="">— Оберіть атрибут —</option>
              {attributes.map((attr) => (
                <option key={attr.id} value={attr.id}>
                  {attr.name} ({valueTypeLabels[attr.valueType]})
                </option>
              ))}
            </select>
            {errors.attributeId && (
              <p className="text-red-500 text-xs mt-1">
                {errors.attributeId.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Назва секції
            </label>
            <input
              {...register("sectionName")}
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/80"
              placeholder="Основні характеристики"
            />
            {errors.sectionName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.sectionName.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Порядок атрибуту
              </label>
              <input
                {...register("sortOrder")}
                type="number"
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/80"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Порядок секції
              </label>
              <input
                {...register("sectionOrder")}
                type="number"
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/80"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" {...register("isRequired")} /> Обов'язковий
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" {...register("isFilterable")} />{" "}
              Фільтрований
            </label>
          </div>

          {mutation.isError && (
            <p className="text-red-500 text-sm">Помилка. Спробуйте ще раз.</p>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="px-4 py-2 text-sm rounded-lg bg-accent text-white hover:bg-accent-hover disabled:opacity-50"
            >
              {mutation.isPending ? "Збереження..." : "Прив'язати"}
            </button>
          </div>
        </form>
      </div>
    </FormPageLayout>
  );
}
