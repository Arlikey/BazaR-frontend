import { useSearchParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createOfferSchema, type CreateOfferFormData } from "../model/createOffer.schema";
import { sellerOfferApi } from "../api/sellerOfferApi";

const inputClass = "w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-base outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors";
const labelClass = "mb-1.5 block text-sm font-medium text-neutral-700";
const sectionClass = "rounded-2xl border border-neutral-100 bg-white p-6 flex flex-col gap-5";

export default function CreateOfferPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const productId = searchParams.get("productId") ?? "";

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateOfferFormData>({
    resolver: zodResolver(createOfferSchema),
    defaultValues: { activate: true, stock: 0 },
  });

  const { mutateAsync } = useMutation({
    mutationFn: (data: CreateOfferFormData) =>
      sellerOfferApi.create({
        productId,
        priceAmount: data.priceAmount,
        priceCurrency: "UAH",
        stock: data.stock,
        oldPriceAmount: data.oldPriceAmount,
        oldPriceCurrency: data.oldPriceAmount ? "UAH" : undefined,
        sellerSku: data.sellerSku,
        deliveryDays: data.deliveryDays,
        minOrderQuantity: data.minOrderQuantity,
        activate: data.activate,
      }),
    onSuccess: () => navigate("/account/seller/products"),
  });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-medium">Створити оффер</h1>
      <form onSubmit={handleSubmit((data) => mutateAsync(data))} className="flex flex-col gap-6">

        <div className={sectionClass}>
          <h2 className="text-lg font-medium">Ціна та наявність</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Ціна (₴) *</label>
              <input type="number" step="0.01" {...register("priceAmount", { valueAsNumber: true })} className={inputClass} placeholder="0.00" />
              {errors.priceAmount && <p className="text-sm text-red-500">{errors.priceAmount.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Стара ціна (₴)</label>
              <input type="number" step="0.01" {...register("oldPriceAmount", { valueAsNumber: true })} className={inputClass} placeholder="0.00" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Кількість *</label>
              <input type="number" {...register("stock", { valueAsNumber: true })} className={inputClass} placeholder="0" />
              {errors.stock && <p className="text-sm text-red-500">{errors.stock.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Мін. замовлення</label>
              <input type="number" {...register("minOrderQuantity", { valueAsNumber: true })} className={inputClass} placeholder="1" />
            </div>
          </div>
        </div>

        <div className={sectionClass}>
          <h2 className="text-lg font-medium">Доставка та інше</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Днів доставки</label>
              <input type="number" {...register("deliveryDays", { valueAsNumber: true })} className={inputClass} placeholder="3" />
            </div>
            <div className="flex flex-col gap-1">
              <label className={labelClass}>SKU продавця</label>
              <input {...register("sellerSku")} className={inputClass} placeholder="MY-SKU-001" />
            </div>
          </div>

          <label className="flex cursor-pointer items-center gap-3">
            <input type="checkbox" {...register("activate")} className="h-4 w-4 accent-accent" />
            <span className="text-base">Активувати одразу після створення</span>
          </label>
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => navigate(-1)} className="rounded-xl border border-neutral-200 px-6 py-2.5 text-base transition-colors hover:bg-neutral-50">
            Скасувати
          </button>
          <button type="submit" disabled={isSubmitting} className="bg-accent rounded-xl px-6 py-2.5 text-base font-medium text-white transition-opacity disabled:opacity-60">
            {isSubmitting ? "Збереження..." : "Створити оффер"}
          </button>
        </div>
      </form>
    </div>
  );
}