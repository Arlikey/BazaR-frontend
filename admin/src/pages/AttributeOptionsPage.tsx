import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { attributeApi } from "@api/attributeApi";
import { FormPageLayout } from "@layouts/FormPageLayout";

type OptionRow = { value: string; sortOrder: number };

export function AttributeOptionsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [options, setOptions] = useState<OptionRow[]>([
    { value: "", sortOrder: 0 },
  ]);

  const { data: attributes = [] } = useQuery({
    queryKey: ["attributes"],
    queryFn: attributeApi.getAll,
  });

  const { data: existingOptions = [] } = useQuery({
    queryKey: ["attribute-options", id],
    queryFn: () => attributeApi.getOptions(id!),
    enabled: !!id,
  });

  const attribute = attributes.find((a) => a.id === id);

  const mutation = useMutation({
    mutationFn: () =>
      attributeApi.addOptions(id!, {
        value: options[0].value,
        sortOrder: options[0].sortOrder,
        options: options.slice(1),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["attribute-options", id] });
      setOptions([{ value: "", sortOrder: 0 }]);
    },
  });

  const addRow = () =>
    setOptions([...options, { value: "", sortOrder: options.length }]);
  const removeRow = (i: number) =>
    setOptions(options.filter((_, idx) => idx !== i));
  const updateRow = (
    i: number,
    field: keyof OptionRow,
    value: string | number,
  ) => {
    setOptions(
      options.map((o, idx) => (idx === i ? { ...o, [field]: value } : o)),
    );
  };

  return (
    <FormPageLayout
      onBack={() => navigate("/attributes")}
      title={`Опції${attribute ? ` — ${attribute.name}` : ""}`}
    >
      {existingOptions.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            Існуючі опції
          </h2>
          <div className="flex flex-col gap-2">
            {existingOptions.map((opt) => (
              <div
                key={opt.id}
                className="flex items-center justify-between text-sm bg-gray-50 rounded-lg px-4 py-2"
              >
                <span>{opt.value}</span>
                <span className="text-gray-400 text-xs">
                  порядок: {opt.sortOrder}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-sm font-semibold text-gray-700 mb-4">
          Додати опції
        </h2>

        <div className="flex flex-col gap-2 mb-4">
          {options.map((opt, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                value={opt.value}
                onChange={(e) => updateRow(i, "value", e.target.value)}
                placeholder="Значення (4GB, Червоний...)"
                className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/80"
              />
              <input
                value={opt.sortOrder}
                type="number"
                onChange={(e) =>
                  updateRow(i, "sortOrder", Number(e.target.value))
                }
                className="w-20 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/80"
              />
              {options.length > 1 && (
                <button
                  onClick={() => removeRow(i)}
                  className="text-red-500 text-sm hover:text-red-700"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={addRow}
          className="text-accent text-sm hover:underline mb-4 block"
        >
          + Додати рядок
        </button>

        {mutation.isError && (
          <p className="text-red-500 text-sm mb-2">
            Помилка. Спробуйте ще раз.
          </p>
        )}
        {mutation.isSuccess && (
          <p className="text-green-600 text-sm mb-2">Опції збережено!</p>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={() => navigate("/attributes")}
            className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-50"
          >
            Готово
          </button>
          <button
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending || options.some((o) => !o.value)}
            className="px-4 py-2 text-sm rounded-lg bg-accent text-white hover:bg-accent-hover disabled:opacity-50"
          >
            {mutation.isPending ? "Збереження..." : "Зберегти опції"}
          </button>
        </div>
      </div>
    </FormPageLayout>
  );
}
