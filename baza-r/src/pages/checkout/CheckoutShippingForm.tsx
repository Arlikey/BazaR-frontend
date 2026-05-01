import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Block from "@/shared/components/ui/Block";
import InputField from "@/shared/components/ui/InputField";
import { CheckoutStep } from "./CheckoutStep";
import { checkoutApi } from "@/entities/checkout/api/checkoutApi";
import { useShippingMethods } from "@/entities/checkout/hooks/useShippingMethods";
import type { ShippingMethod } from "@/entities/checkout/model/methods";
import { SHIPPING_METHOD_MAP } from "@/entities/checkout/model/mapper";
import type { CheckoutLine } from "@/entities/checkout/model/types";

type Props = {
  checkoutId: string;
  lines: CheckoutLine[];
};

export function CheckoutShippingForm({ checkoutId, lines }: Props) {
  const qc = useQueryClient();

  const { data, isLoading } = useShippingMethods();
  const options = data?.methods ?? [];

  const [method, setMethod] = useState<string | null>(null);

  const [form, setForm] = useState({
    country: "Україна",
    region: "",
    city: "",
    postalCode: "",
    warehouseCode: "",
    warehouseName: "",
    street: "",
    house: "",
    apartment: "",
    comment: "",
  });

  const { mutate: updateShipping } = useMutation<void, Error, void>({
    mutationFn: async () => {
      if (!method) return;
      const mappedMethod = SHIPPING_METHOD_MAP[method] ?? 0;
      console.log(form);
      await Promise.all(
        lines.map((line) =>
          checkoutApi.updateShipping(checkoutId, line.id, {
            method: mappedMethod,
            country: form.country,
            region: form.region,
            city: form.city,
            postalCode: form.postalCode,
            warehouseCode: form.warehouseCode,
            warehouseName: form.warehouseName,
            street: form.street,
            house: form.house,
            apartment: form.apartment,
            comment: form.comment,
          }),
        ),
      );
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["checkout", checkoutId] });
    },
  });

  function handleChange(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleMethodSelect(type: string) {
    setMethod(type);
  }

  useEffect(() => {
    if (options.length > 0 && !method) {
      setMethod(options[0].type);
    }
  }, [options]);

  if (isLoading) {
    return <div>Loading shipping methods...</div>;
  }

  console.log(form);

  return (
    <div className="flex flex-col gap-3">
      <CheckoutStep number={2} title="Доставка" />

      <div className="flex flex-col gap-2">
        {options.map((opt: ShippingMethod) => {
          const isSelected = method === opt.type;

          return (
            <Block
              key={opt.type}
              className="flex cursor-pointer flex-col gap-4 p-4 pl-6 transition"
              onClick={() => handleMethodSelect(opt.type)}
            >
              <div className="flex items-center gap-4">
                <div className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                  <div
                    className={`h-5 w-5 rounded-full border-2 transition ${
                      isSelected ? "border-accent" : "border-neutral-300"
                    }`}
                  />

                  {isSelected && (
                    <div className="bg-accent absolute h-2.5 w-2.5 rounded-full" />
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-0.5">
                  <span className="text-base">{opt.title}</span>

                  <span className="text-sm text-neutral-400">
                    {opt.description}
                  </span>

                  <span className="text-xs text-neutral-400">
                    {opt.estimatedDaysMin}-{opt.estimatedDaysMax} дні
                  </span>
                </div>

                <span className="text-sm font-medium">
                  {opt.baseFee === 0
                    ? "Безкоштовно"
                    : `${opt.baseFee} ${opt.currency}`}
                </span>
              </div>

              {isSelected && (
                <div
                  className="flex flex-col gap-3 pl-9"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="grid grid-cols-2 gap-3">
                    <InputField
                      placeholder="Країна"
                      value={form.country}
                      onChange={(e) => handleChange("country", e.target.value)}
                      onBlur={() => updateShipping()}
                    />

                    <InputField
                      placeholder="Місто"
                      value={form.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      onBlur={() => updateShipping()}
                    />
                  </div>

                  {isNovaPoshta(opt.type) && (
                    <>
                      <InputField
                        placeholder="Відділення або поштомат"
                        value={form.warehouseName}
                        onChange={(e) =>
                          handleChange("warehouseName", e.target.value)
                        }
                        onBlur={() => updateShipping()}
                      />
                      <InputField
                        placeholder="Код відділення або поштомату"
                        value={form.warehouseCode}
                        onChange={(e) =>
                          handleChange("warehouseCode", e.target.value)
                        }
                        onBlur={() => updateShipping()}
                      />
                    </>
                  )}

                  {!isNovaPoshta(opt.type) && (
                    <div className="grid grid-cols-2 gap-3">
                      <InputField
                        placeholder="Регіон"
                        value={form.region}
                        onChange={(e) => handleChange("region", e.target.value)}
                        onBlur={() => updateShipping()}
                      />
                      <InputField
                        placeholder="Поштовий індекс"
                        value={form.postalCode}
                        onChange={(e) =>
                          handleChange("postalCode", e.target.value)
                        }
                        onBlur={() => updateShipping()}
                      />
                      <InputField
                        placeholder="Вулиця"
                        value={form.street}
                        onChange={(e) => handleChange("street", e.target.value)}
                        onBlur={() => updateShipping()}
                      />
                      <InputField
                        placeholder="Будинок"
                        value={form.house}
                        onChange={(e) => handleChange("house", e.target.value)}
                        onBlur={() => updateShipping()}
                      />
                      <InputField
                        placeholder="Квартира"
                        value={form.apartment}
                        onChange={(e) =>
                          handleChange("apartment", e.target.value)
                        }
                        onBlur={() => updateShipping()}
                        className="col-span-2"
                      />
                    </div>
                  )}

                  <InputField
                    placeholder="Коментар до замовлення"
                    value={form.comment}
                    onChange={(e) => handleChange("comment", e.target.value)}
                    onBlur={() => updateShipping()}
                  />
                </div>
              )}
            </Block>
          );
        })}
      </div>
    </div>
  );
}

function isNovaPoshta(type: string) {
  return type.startsWith("NovaPoshta");
}
