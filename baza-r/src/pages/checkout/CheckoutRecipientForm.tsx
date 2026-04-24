import { useMutation, useQueryClient } from "@tanstack/react-query";
import Block from "../../shared/components/ui/Block";
import InputField from "../../shared/components/ui/InputField";
import { checkoutApi } from "../../entities/checkout/api/checkoutApi";
import { useState } from "react";
import { CheckoutStep } from "./CheckoutStep";
import type { CheckoutLine } from "../../entities/checkout/model/types";

type Props = {
  checkoutId: string;
  lines: CheckoutLine[];
  initialData?: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
};

export function CheckoutRecipientForm({
  checkoutId,
  lines,
  initialData,
}: Props) {
  const qc = useQueryClient();

  const [form, setForm] = useState({
    firstName: initialData?.firstName ?? "",
    lastName: initialData?.lastName ?? "",
    phone: initialData?.phone ?? "",
    email: initialData?.email ?? "",
    isCustomerRecipient: false,
  });

  const isFormComplete = !!(
    form.firstName &&
    form.lastName &&
    form.phone &&
    form.email
  );

  const { mutate: updateRecipient } = useMutation({
    mutationFn: async () => {
      if (!isFormComplete) return;
      await Promise.all(
        lines.map((line) =>
          checkoutApi.updateRecipient(checkoutId, {
            lineId: line.id,
            firstName: form.firstName,
            lastName: form.lastName,
            phone: form.phone,
            email: form.email,
            isCustomerRecipient: form.isCustomerRecipient,
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

  return (
    <div className="flex flex-col gap-3">
      <CheckoutStep number={4} title="Контактні дані отримувача" />

      <Block className="flex flex-col gap-5 p-6 pl-10">
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={form.isCustomerRecipient}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                isCustomerRecipient: e.target.checked,
              }))
            }
            className="accent-accent h-4 w-4"
          />
          <span className="text-sm">Я є отримувачем</span>
        </label>

        <div className="grid grid-cols-2 gap-x-10 gap-y-5">
          <InputField
            placeholder="Прізвище"
            value={form.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            onBlur={() => updateRecipient()}
          />
          <InputField
            placeholder="Ім'я"
            value={form.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            onBlur={() => updateRecipient()}
          />
          <InputField
            placeholder="Мобільний телефон"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            onBlur={() => updateRecipient()}
          />
          <InputField
            placeholder="Електронна пошта"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => updateRecipient()}
          />
        </div>
      </Block>
    </div>
  );
}
