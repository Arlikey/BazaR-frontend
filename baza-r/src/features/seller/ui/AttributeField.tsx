import type { AttributeTemplateItem } from "../api/sellerProductApi";
import { useFormContext, Controller } from "react-hook-form";
import type { CreateProductFormData } from "../model/createProduct.schema";
import { useEffect } from "react";

type Props = {
  item: AttributeTemplateItem;
  index: number;
};

export function AttributeField({ item, index }: Props) {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<CreateProductFormData>();

  useEffect(() => {
    setValue(`attributes.${index}.attributeId`, item.attributeId);
  }, [item.attributeId, index, setValue]);
  const error = errors.attributes?.[index];

  const baseInput =
    "w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-base outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors";
  const label = (
    <label className="mb-1.5 block text-sm font-medium text-neutral-700">
      {item.name}
      {item.isRequired && <span className="ml-1 text-red-500">*</span>}
    </label>
  );

  return (
    <div className="flex flex-col">
      {label}

      {item.valueType === 1 && (
        <input
          {...register(`attributes.${index}.textValue`)}
          className={baseInput}
          placeholder={item.name}
        />
      )}

      {item.valueType === 2 && (
        <input
          type="number"
          {...register(`attributes.${index}.numberValue`, {
            valueAsNumber: true,
          })}
          className={baseInput}
          placeholder="0"
        />
      )}

      {item.valueType === 3 && (
        <Controller
          control={control}
          name={`attributes.${index}.boolValue`}
          render={({ field }) => (
            <button
              type="button"
              onClick={() => field.onChange(!field.value)}
              className={[
                "flex h-10 w-full items-center gap-3 rounded-xl border px-4 text-base transition-colors",
                field.value
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-neutral-200 text-neutral-500 hover:bg-neutral-50",
              ].join(" ")}
            >
              <span
                className={[
                  "flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors",
                  field.value
                    ? "border-accent bg-accent"
                    : "border-neutral-300",
                ].join(" ")}
              >
                {field.value && (
                  <span className="h-2 w-2 rounded-full bg-white" />
                )}
              </span>
              {field.value ? "Так" : "Ні"}
            </button>
          )}
        />
      )}

      {item.valueType === 4 && (
        <select
          {...register(`attributes.${index}.optionId`)}
          className={baseInput}
        >
          <option value="">— Оберіть —</option>
          {item.options?.map((o) => (
            <option key={o.id} value={o.id}>
              {o.value}
            </option>
          ))}
        </select>
      )}

      {item.valueType === 5 && (
        <Controller
          control={control}
          name={`attributes.${index}.optionIds`}
          defaultValue={[]}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              {item.options?.map((o) => {
                const checked = field.value?.includes(o.id) ?? false;
                return (
                  <label
                    key={o.id}
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        const next = e.target.checked
                          ? [...(field.value ?? []), o.id]
                          : (field.value ?? []).filter((id) => id !== o.id);
                        field.onChange(next);
                      }}
                      className="accent-accent h-4 w-4 rounded"
                    />
                    <span className="text-base">{o.value}</span>
                  </label>
                );
              })}
            </div>
          )}
        />
      )}

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error.textValue?.message ??
            error.numberValue?.message ??
            error.optionId?.message ??
            "Помилка"}
        </p>
      )}
    </div>
  );
}
