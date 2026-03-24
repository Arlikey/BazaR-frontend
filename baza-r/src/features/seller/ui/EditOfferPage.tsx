import { useSearchParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { z } from "zod";
import { sellerOfferApi } from "../api/sellerOfferApi";

const schema = z.object({
  priceAmount: z.number().positive("Ціна має бути більше 0"),
  oldPriceAmount: z.number().positive().optional(),
  stock: z.number().int().min(0),
  deliveryDays: z.number().int().min(1).optional(),
});

type FormData = z.infer<typeof schema>;

const inputClass = "w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-base outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors";
const labelClass = "mb-1.5 block text-sm font-medium text-neutral-700";
const sectionClass = "rounded-2xl border border-neutral-100 bg-white p-6 flex flex-col gap-5";

export default function EditOfferPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const productId = searchParams.get("productId") ?? "";

  const { data: offer, isLoading } = useQuery({
    queryKey: ["offer-by-product", productId],
    queryFn: () => sellerOfferApi.getByProduct(productId),
    enabled: !!productId,
  });

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (offer) {
      reset({
        priceAmount: offer.priceAmount,
        oldPriceAmount: offer.oldPriceAmount ?? undefined,
        stock: offer.stock,
        deliveryDays: offer.deliveryDays ?? undefined,
      });
    }
  }, [offer, reset]);

  const { mutateAsync: save } = useMutation({
    mutationFn: async (data: FormData) => {
      const id = offer!.offerId;
      await sellerOfferApi.setPrice(id, data.priceAmount);
      if (data.oldPriceAmount) {
        await sellerOfferApi.setOldPrice(id, data.oldPriceAmount);
      } else {
        await sellerOfferApi.deleteOldPrice(id);
      }
      await sellerOfferApi.setStock(id, data.stock);
      if (data.deliveryDays) {
        await sellerOfferApi.setDelivery(id, data.deliveryDays);
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["seller-products"] });
      navigate("/account/seller/products");
    },
  });

  const { mutateAsync: toggleStatus } = useMutation({
    mutationFn: () => offer!.status === "Active"
      ? sellerOfferApi.pause(offer!.offerId)
      : sellerOfferApi.resume(offer!.offerId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["offer-by-product", productId] }),
  });

  if (isLoading) return null;
  if (!offer) return <p className="text-neutral-400">Оффер не знайдено</p>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Редагувати оффер</h1>
        <button
          onClick={() => toggleStatus()}
          className={`rounded-xl px-5 py-2.5 text-sm font-medium transition-colors ${
            offer.status === "Active"
              ? "border border-neutral-200 hover:bg-neutral-50"
              : "bg-accent text-white"
          }`}
        >
          {offer.status === "Active" ? "⏸ Призупинити" : "▶ Відновити"}
        </button>
      </div>

      <form onSubmit={handleSubmit((data) => save(data))} className="flex flex-col gap-6">
        <div className={sectionClass}>
          <h2 className="text-lg font-medium">Ціна та наявність</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Ціна (₴) *</label>
              <input type="number" step="0.01" {...register("priceAmount", { valueAsNumber: true })} className={inputClass} />
              {errors.priceAmount && <p className="text-sm text-red-500">{errors.priceAmount.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Стара ціна (₴)</label>
              <input type="number" step="0.01" {...register("oldPriceAmount", { valueAsNumber: true })} className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Кількість *</label>
              <input type="number" {...register("stock", { valueAsNumber: true })} className={inputClass} />
              {errors.stock && <p className="text-sm text-red-500">{errors.stock.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Днів доставки</label>
              <input type="number" {...register("deliveryDays", { valueAsNumber: true })} className={inputClass} />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => navigate(-1)} className="rounded-xl border border-neutral-200 px-6 py-2.5 text-base transition-colors hover:bg-neutral-50">
            Скасувати
          </button>
          <button type="submit" disabled={isSubmitting} className="bg-accent rounded-xl px-6 py-2.5 text-base font-medium text-white transition-opacity disabled:opacity-60">
            {isSubmitting ? "Збереження..." : "Зберегти"}
          </button>
        </div>
      </form>
    </div>
  );
}