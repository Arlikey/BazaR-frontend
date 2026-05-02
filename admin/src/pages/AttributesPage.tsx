import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { attributeApi, valueTypeLabels } from "../api/attributeApi";
import { CustomButton } from "../shared/CustomButton";
import { useNavigate } from "react-router";

export function AttributesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const { data: attributes = [], isLoading } = useQuery({
    queryKey: ["attributes"],
    queryFn: attributeApi.getAll,
  });

  if (isLoading) return <p className="text-gray-500">Завантаження...</p>;

  const filtered = attributes.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.code.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Атрибути</h1>
        <CustomButton onClick={() => navigate("/attributes/new")} color="green">
          + Додати атрибут
        </CustomButton>
      </div>

      <div className="mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Пошук за назвою або кодом..."
          className="w-full max-w-sm border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/80"
        />
      </div>

      <p className="text-sm text-gray-400 mb-2">
        Знайдено: {filtered.length} з {attributes.length}
      </p>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm table-fixed">
          <thead className="bg-gray-50 border-b border-neutral-100">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-gray-600 w-1/4">
                Назва
              </th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 w-1/4">
                Код
              </th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 w-32">
                Тип
              </th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 w-24">
                Одиниця
              </th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 w-24">
                Системний
              </th>
              <th className="px-6 py-3 w-24"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                  Атрибутів поки немає
                </td>
              </tr>
            )}
            {filtered.map((attr) => (
              <tr
                key={attr.id}
                className="border-b border-neutral-100 last:border-0 hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium truncate">{attr.name}</td>
                <td className="px-6 py-4 text-gray-500 font-mono text-xs truncate">
                  {attr.code}
                </td>
                <td className="px-6 py-4">
                  <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                    {valueTypeLabels[attr.valueType]}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">{attr.unit ?? "—"}</td>
                <td className="px-6 py-4 text-gray-500">
                  {attr.isSystem ? "Так" : "Ні"}
                </td>
                <td className="px-6 py-4 text-right">
                  {(attr.valueType === 4 || attr.valueType === 5) && (
                    <button
                      onClick={() => navigate(`/attributes/${attr.id}/options`)}
                      className="text-blue-600 hover:underline text-sm font-medium"
                    >
                      Опції
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
