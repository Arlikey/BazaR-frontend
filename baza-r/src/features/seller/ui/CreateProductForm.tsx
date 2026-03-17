import { FormProvider } from "react-hook-form";
import { useEffect, useRef } from "react";
import { useCatalogCategories } from "../../../widgets/catalog/model/useCategories";
import { useImageUpload } from "../model/useImageUpload";
import { useAttributeTemplate } from "../model/useAttributeTemplate";
import { useProductForm } from "../model/useProductForm";
import { CascadingCategorySelect } from "./CascadingCategorySelect";
import { AttributeField } from "./AttributeField";

const inputClass =
  "w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-base outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors";
const labelClass = "mb-1.5 block text-sm font-medium text-neutral-700";
const sectionClass =
  "rounded-2xl border border-neutral-100 bg-white p-6 flex flex-col gap-5";

export function CreateProductForm() {
  const dropRef = useRef<HTMLLabelElement>(null);
  const { flat: categories } = useCatalogCategories();
  const { images, previews, handleFiles, removeImage } = useImageUpload();
  const { methods, categoryId, mutateAsync, isPending } =
    useProductForm(images);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const { template, templateWithOptions, sections } =
    useAttributeTemplate(categoryId);

  useEffect(() => {
    setValue(
      "attributes",
      template.map((t) => ({ attributeId: t.attributeId })),
    );
  }, [template, setValue]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit((data) => mutateAsync(data))}
        className="flex flex-col gap-6"
      >
        <div className={sectionClass}>
          <h2 className="text-lg font-medium">Основна інформація</h2>

          <div className="flex flex-col gap-1">
            <label className={labelClass}>Назва товару *</label>
            <input
              {...register("name")}
              className={inputClass}
              placeholder="Назва товару"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className={labelClass}>Категорія *</label>
            <CascadingCategorySelect
              categories={categories}
              value={categoryId ?? null}
              onChange={(id) =>
                setValue("categoryId", id ?? "", { shouldValidate: true })
              }
            />
            {errors.categoryId && (
              <p className="text-sm text-red-500">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className={labelClass}>Опис</label>
            <textarea
              {...register("description")}
              rows={4}
              className={inputClass}
              placeholder="Опис товару..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Артикул</label>
              <input
                {...register("vendorCode")}
                className={inputClass}
                placeholder="SKU-001"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Штрихкод</label>
              <input
                {...register("barcode")}
                className={inputClass}
                placeholder="4820000000000"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className={labelClass}>Slug</label>
            <input
              {...register("slug")}
              className={inputClass}
              placeholder="mii-tovar"
            />
            {errors.slug && (
              <p className="text-sm text-red-500">{errors.slug.message}</p>
            )}
          </div>
        </div>

        {sections.size > 0 && (
          <div className={sectionClass}>
            <h2 className="text-lg font-medium">Характеристики</h2>
            {[...sections.entries()].map(([sectionName, items]) => (
              <div key={sectionName} className="flex flex-col gap-4">
                {sections.size > 1 && (
                  <h3 className="text-sm font-medium tracking-wide text-neutral-400 uppercase">
                    {sectionName}
                  </h3>
                )}
                <div className="grid grid-cols-2 gap-4">
                  {items.map((item) => {
                    const index = templateWithOptions.findIndex(
                      (t) => t.attributeId === item.attributeId,
                    );
                    return (
                      <AttributeField
                        key={item.attributeId}
                        item={item}
                        index={index}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className={sectionClass}>
          <h2 className="text-lg font-medium">Фото</h2>
          <label
            ref={dropRef}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFiles(e.dataTransfer.files);
            }}
            className="hover:border-accent hover:text-accent flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-neutral-200 py-10 text-neutral-400 transition-colors"
          >
            <span className="text-3xl">↑</span>
            <span className="text-sm">
              Перетягніть фото або натисніть для вибору
            </span>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </label>
          {previews.length > 0 && (
            <div className="grid grid-cols-4 gap-3">
              {previews.map((src, i) => (
                <div key={i} className="group relative aspect-square">
                  <img
                    src={src}
                    className="h-full w-full rounded-xl object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => history.back()}
            className="rounded-xl border border-neutral-200 px-6 py-2.5 text-base transition-colors hover:bg-neutral-50"
          >
            Скасувати
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="bg-accent rounded-xl px-6 py-2.5 text-base font-medium text-white transition-opacity disabled:opacity-60"
          >
            {isPending ? "Збереження..." : "Створити товар"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
