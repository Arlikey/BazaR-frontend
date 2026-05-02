import { Controller } from "react-hook-form";
import { Button } from "@/shared/components/ui/Button";
import InputField from "@/shared/components/ui/InputField";
import { StarPicker } from "./StarPicker";
import { useCreateReviewForm } from "../model/useCreateReviewForm";
import { ReviewImageUpload } from "./ReviewImageUpload";
import { useImageUpload } from "../../seller/model/useImageUpload";
import { useUiStore } from "@/shared/model/ui.store";
import IconWrapper from "@/shared/components/ui/IconWrapper";
import { CrossIcon } from "@/shared/components/icons/ui/CrossIcon";
import { type CreateReviewFormValues } from "../model/review.schema";
import { useAddReview } from "@/entities/review/queries";
import { toast } from "sonner";

const formInput = "flex flex-col gap-1 flex-1";

type Props = {
  productId: string;
};

export function CreateReviewForm({ productId }: Props) {
  const closeCreateReview = useUiStore((s) => s.closeCreateReview);

  const form = useCreateReviewForm();
  const { mutate, isPending } = useAddReview();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting, dirtyFields },
  } = form;

  const { images, previews, handleFiles, removeImage } = useImageUpload();

  const onSubmit = (data: CreateReviewFormValues) => {
    mutate(
      {
        productId,
        rating: data.rating,
        advantages: data.advantages,
        disadvantages: data.disadvantages,
        body: data.comment,
      },
      {
        onSuccess: () => {
          toast.success("Відгук відправлено на модерацію");
          closeCreateReview();
        },
        onError: () => {
          toast.error("Помилка при відправці відгуку");
        },
      },
    );
  };

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;

    const arr = Array.from(files).slice(0, 10);

    form.setValue("images", arr);
    handleFiles(files);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-h-[calc(100vh-2rem)] flex-col"
    >
      <div className="flex px-6 py-4">
        <h2 className="flex-1 text-2xl font-medium">Написати відгук</h2>
        <Button
          color="default"
          type="button"
          onClick={closeCreateReview}
          className="text-muted hover:text-accent h-8 w-8"
        >
          <IconWrapper>
            <CrossIcon />
          </IconWrapper>
        </Button>
      </div>
      <div className="text-muted flex flex-col gap-4 overflow-y-auto px-6 pt-4 pb-2 text-sm">
        {/* rating */}
        <div className="flex flex-col gap-6">
          <label className="text-base text-black">Оцініть товар</label>

          <Controller
            control={control}
            name="rating"
            render={({ field }) => (
              <StarPicker
                value={field.value}
                onChange={field.onChange}
                size={36}
              />
            )}
          />
        </div>

        {/* advantages */}
        <div className={formInput}>
          <label>Переваги</label>
          <InputField rounded="sm" {...register("advantages")} />
        </div>

        {/* disadvantages */}
        <div className={formInput}>
          <label>Недоліки</label>
          <InputField rounded="sm" {...register("disadvantages")} />
        </div>

        {/* comment */}
        <div className={formInput}>
          <label>Коментар *</label>
          <textarea
            rows={6}
            className="bg-surface bw-thin focus:border-accent min-h-10 rounded-xl border-neutral-100 p-2 outline-none"
            {...register("comment")}
          />
        </div>

        {/* images */}
        {/* <ReviewImageUpload
          images={images}
          previews={previews}
          onFiles={handleImageUpload}
          onRemove={removeImage}
        /> */}

        {/* name + email */}
        <div className="flex gap-4">
          <div className={formInput}>
            <label>Ваше ім'я та прізвище *</label>
            <InputField
              rounded="sm"
              {...register("name")}
              error={errors.name?.message}
              success={dirtyFields.name && !errors.name}
            />
          </div>

          <div className={formInput}>
            <label>Електронна пошта *</label>
            <InputField
              rounded="sm"
              {...register("email")}
              error={errors.email?.message}
              success={dirtyFields.email && !errors.email}
            />
          </div>
        </div>

        {/* buttons */}
        <div className="flex h-10 shrink-0 gap-4 text-lg">
          <Button
            type="button"
            onClick={closeCreateReview}
            variant="outline"
            rounded="md"
            color="subtle"
            className="border-accent text-accent hover:bg-accent flex-1 hover:text-white"
          >
            Скасувати
          </Button>

          <Button
            type="submit"
            variant="solid"
            disabled={!isValid || isSubmitting || isPending}
            rounded="md"
            color="secondary"
            className="flex-1 text-white"
          >
            Залишити відгук
          </Button>
        </div>
      </div>
    </form>
  );
}
