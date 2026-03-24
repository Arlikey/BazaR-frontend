import { FormProvider } from "react-hook-form";
import { useEffect, useRef } from "react";
import { useCatalogCategories } from "../../../widgets/catalog/model/useCategories";
import { useImageUpload } from "../model/useImageUpload";
import { useAttributeTemplate } from "../model/useAttributeTemplate";
import { useProductForm } from "../model/useProductForm";
import { CascadingCategorySelect } from "./CascadingCategorySelect";
import { AttributeField } from "./AttributeField";
import InputField from "../../../shared/components/ui/InputField";

const labelClass = "mb-1 block text-sm font-medium text-neutral-700";
const hintClass = "mb-1.5 text-xs text-neutral-400";
const sectionClass = "rounded-2xl border border-neutral-100 bg-white p-6 flex flex-col gap-5";

export function CreateProductForm() {
  const dropRef = useRef<HTMLLabelElement>(null);
  const { flat: categories } = useCatalogCategories();
  const { images, previews, handleFiles, removeImage } = useImageUpload();
  const { methods, categoryId, mutateAsync, isPending } = useProductForm(images);

  const { register, handleSubmit, setValue, formState: { errors } } = methods;
  const { template, templateWithOptions, sections } = useAttributeTemplate(categoryId);

  useEffect(() => {
    setValue("attributes", template.map((t) => ({ attributeId: t.attributeId })));
  }, [template, setValue]);

  const nameField = register("name");
  const descriptionField = register("description");
  const vendorCodeField = register("vendorCode");
  const barcodeField = register("barcode");
  const slugField = register("slug");

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit((data) => mutateAsync(data))} className="flex flex-col gap-6">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium">Новий товар</h1>
            <p className="mt-1 text-sm text-neutral-400">Заповніть інформацію про товар для публікації на маркетплейсі</p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => history.back()}
              className="rounded-xl border border-neutral-200 px-5 py-2.5 text-base transition-colors hover:bg-neutral-50"
            >
              Скасувати
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="bg-accent rounded-xl px-5 py-2.5 text-base font-medium text-white transition-opacity disabled:opacity-60"
            >
              {isPending ? "Збереження..." : "Створити товар"}
            </button>
          </div>
        </div>

        <div className="flex gap-6 items-start">

          <div className="flex flex-1 flex-col gap-6">

            <div className={sectionClass}>
              <h2 className="text-lg font-medium">Основна інформація</h2>

              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>Назва товару <span className="text-red-500">*</span></label>
                <p className={hintClass}>Вказуйте повну назву — бренд, модель, колір, розмір</p>
                <InputField
                  {...nameField}
                  error={errors.name?.message}
                  size="lg"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>Категорія <span className="text-red-500">*</span></label>
                <p className={hintClass}>Оберіть найточнішу підкатегорію для кращої видимості</p>
                <CascadingCategorySelect
                  categories={categories}
                  value={categoryId ?? null}
                  onChange={(id) => setValue("categoryId", id ?? "", { shouldValidate: true })}
                />
                {errors.categoryId && <p className="text-xs text-red-500">{errors.categoryId.message}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>Опис</label>
                <p className={hintClass}>Детально опишіть товар — матеріал, особливості, комплектацію</p>
                <textarea
                  {...descriptionField}
                  rows={5}
                  placeholder="Опишіть товар докладно..."
                  className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-base outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors resize-none"
                />
              </div>
            </div>

            <div className={sectionClass}>
              <div>
                <h2 className="text-lg font-medium">Ідентифікатори</h2>
                <p className="mt-1 text-sm text-neutral-400">Коди для обліку та пошуку товару</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Артикул</label>
                  <p className={hintClass}>Внутрішній код вашого товару</p>
                  <InputField
                    {...vendorCodeField}
                    placeholder="SKU-001"
                    size="lg"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Штрихкод</label>
                  <p className={hintClass}>EAN-13 або інший формат</p>
                  <InputField
                    {...barcodeField}
                    placeholder="4820000000000"
                    size="lg"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>Slug</label>
                <p className={hintClass}>URL-адреса товару — генерується автоматично з назви</p>
                <InputField
                  {...slugField}
                  placeholder="nazva-tovaru"
                  error={errors.slug?.message}
                  size="lg"
                />
              </div>
            </div>

            {sections.size > 0 && (
              <div className={sectionClass}>
                <div>
                  <h2 className="text-lg font-medium">Характеристики</h2>
                  <p className="mt-1 text-sm text-neutral-400">Заповніть технічні параметри товару</p>
                </div>
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
                        return <AttributeField key={item.attributeId} item={item} index={index} />;
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex w-80 shrink-0 flex-col gap-6">
            <div className={sectionClass}>
              <div>
                <h2 className="text-lg font-medium">Фото товару</h2>
                <p className="mt-1 text-sm text-neutral-400">Перше фото буде головним. До 10 зображень.</p>
              </div>

              <label
                ref={dropRef}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
                className="hover:border-accent hover:text-accent flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-neutral-200 py-8 text-neutral-400 transition-colors"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
                  <span className="text-2xl">↑</span>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">Перетягніть фото сюди</p>
                  <p className="text-xs text-neutral-400">або натисніть для вибору</p>
                </div>
                <p className="text-xs text-neutral-300">PNG, JPG, WEBP до 10 МБ</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </label>

              {previews.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {previews.map((src, i) => (
                    <div key={i} className="group relative aspect-square">
                      {i === 0 && (
                        <span className="absolute top-1 left-1 z-10 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] text-white">
                          Головне
                        </span>
                      )}
                      <img src={src} className="h-full w-full rounded-xl object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100 text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </form>
    </FormProvider>
  );
}