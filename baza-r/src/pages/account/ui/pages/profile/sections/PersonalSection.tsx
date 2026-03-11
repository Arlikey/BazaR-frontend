import React from "react";
import { useMe } from "../../../../../../entities/user/queries";

export function PersonalSection() {
  const { data: user } = useMe();

  const fields = [
    { label: "Прізвище", value: user?.lastName },
    { label: "Ім'я", value: user?.firstName },
    { label: "По батькові", value: null },
    { label: "Дата народження", value: null },
    { label: "Стать", value: null },
    { label: "Мова спілкування з Baza-R", value: "Українська" },
  ];

  return (
    <div className="grid grid-cols-3 gap-x-6 gap-y-6">
      {fields.map(({ label, value }) => (
        <div key={label} className="flex flex-col gap-1 text-base">
          <span className="font-semibold">{label}</span>
          <span>{value ?? "Не вказано"}</span>
        </div>
      ))}
    </div>
  );
}
