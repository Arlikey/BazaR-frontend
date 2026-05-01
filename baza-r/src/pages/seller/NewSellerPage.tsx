import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import InputField from "../../shared/components/ui/InputField";
import { Button } from "../../shared/components/ui/Button";
import { sellerApi } from "../../features/seller/api/sellerApi";

const schema = z.object({
  name: z.string().min(2, "Мінімум 2 символи"),
  slug: z.string().min(2, "Мінімум 2 символи").regex(/^[a-z0-9-]+$/, "Тільки латиниця, цифри та дефіс"),
  countryCode: z.string().min(2, "Обов'язкове поле"),
  legalName: z.string().min(2, "Обов'язкове поле"),
  taxNumber: z.string().min(8, "Невірний ІПН/ЄДРПОУ"),
  supportEmail: z.string().email("Невірний email"),
  supportPhone: z.string().min(10, "Невірний номер"),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function BecomeSellerPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { countryCode: "UA" },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) =>
      sellerApi.register({ ...data, submitForApproval: true }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["seller-me"] });
      toast.success("Заявку подано!");
      navigate("/account/seller/products");
    },
    onError: () => toast.error("Помилка подання заявки"),
  });

  const labelClass = "block text-sm font-medium text-neutral-700 mb-1";
  const sectionClass = "flex flex-col gap-5 rounded-2xl border border-neutral-100 bg-white p-6";

  return (
    <div className="mx-auto max-w-4xl w-full py-12">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl font-medium">Стати продавцем</h1>
        <p className="text-neutral-400">Заповніть форму і ми розглянемо вашу заявку</p>
      </div>

      <form onSubmit={handleSubmit((data) => mutate(data))} className="flex flex-col gap-6">

        <div className={sectionClass}>
          <h2 className="text-lg font-medium">Основна інформація</h2>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Назва магазину *</label>
            <InputField {...register("name")} error={errors.name?.message} placeholder="Мій магазин" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>URL-адреса (slug) *</label>
            <p className="text-xs text-neutral-400">Тільки латиниця, цифри та дефіс</p>
            <InputField {...register("slug")} error={errors.slug?.message} placeholder="my-shop" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Опис</label>
            <textarea
              {...register("description")}
              rows={4}
              placeholder="Розкажіть про ваш магазин..."
              className="w-full resize-none rounded-xl border border-neutral-200 px-4 py-3 text-base outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </div>
        </div>

        <div className={sectionClass}>
          <h2 className="text-lg font-medium">Юридична інформація</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Юридична назва *</label>
              <InputField {...register("legalName")} error={errors.legalName?.message} placeholder="ТОВ Мій магазин" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>ІПН / ЄДРПОУ *</label>
              <InputField {...register("taxNumber")} error={errors.taxNumber?.message} placeholder="12345678" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Код країни *</label>
              <InputField {...register("countryCode")} error={errors.countryCode?.message} placeholder="UA" />
            </div>
          </div>
        </div>

        <div className={sectionClass}>
          <h2 className="text-lg font-medium">Контакти підтримки</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Email підтримки *</label>
              <InputField {...register("supportEmail")} error={errors.supportEmail?.message} placeholder="support@myshop.com" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Телефон підтримки *</label>
              <InputField {...register("supportPhone")} error={errors.supportPhone?.message} placeholder="+380991234567" />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          color="secondary"
          rounded="pill"
          size="lg"
          fullWidth
          disabled={isPending}
        >
          {isPending ? "Відправляємо..." : "Подати заявку"}
        </Button>
      </form>
    </div>
  );
}