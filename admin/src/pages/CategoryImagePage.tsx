import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { categoryApi } from "@api/categoryApi";
import { FormPageLayout } from "@layouts/FormPageLayout";

export function CategoryImagePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: categoryApi.getAll,
  });

  const category = categories.find((c) => c.id === id);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (category?.imageUrl) {
      setPreview(category.imageUrl);
    }
  }, [category]);

  const handleFile = (f: File | null) => {
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const { mutate: upload, isPending: uploading } = useMutation({
    mutationFn: () => categoryApi.uploadImage(id!, file!),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
      navigate("/categories");
    },
  });

  const { mutate: deleteImg, isPending: deleting } = useMutation({
    mutationFn: () => categoryApi.deleteImage(id!),
    onSuccess: () => {
      setPreview(null);
      setFile(null);
      qc.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return (
    <FormPageLayout
      title={`Зображення: ${category?.name ?? ""}`}
      onBack={() => navigate("/categories")}
    >
      <div className="flex flex-col gap-5">
        <label
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFile(e.dataTransfer.files?.[0] ?? null);
          }}
          className="hover:border-accent hover:text-accent flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-neutral-200 py-8 text-neutral-400 transition-colors"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
            <span className="text-2xl">↑</span>
          </div>
          <p className="text-sm font-medium">Перетягніть фото сюди</p>
          <p className="text-xs text-neutral-400">або натисніть для вибору</p>
          <p className="text-xs text-neutral-300">PNG, JPG, WEBP до 10 МБ</p>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
          />
        </label>

        {preview && (
          <div className="relative w-32 aspect-square">
            <img
              src={preview}
              className="h-full w-full rounded-xl object-cover"
            />
            <button
              type="button"
              disabled={deleting}
              onClick={() => {
                if (file) {
                  setFile(null);
                  setPreview(
                    category?.imageUrl
                      ? `http://localhost:8080${category.imageUrl}`
                      : null,
                  );
                } else {
                  deleteImg();
                }
              }}
              className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-xs text-white"
            >
              ×
            </button>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/categories")}
            className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
          >
            Скасувати
          </button>
          <button
            disabled={!file || uploading}
            onClick={() => upload()}
            className="rounded-lg bg-accent px-4 py-2 text-sm text-white hover:bg-accent-hover disabled:opacity-50"
          >
            {uploading ? "Збереження..." : "Зберегти"}
          </button>
        </div>
      </div>
    </FormPageLayout>
  );
}
