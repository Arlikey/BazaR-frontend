import IconWrapper from "@/shared/components/ui/IconWrapper";
import { ArrowIcon } from "@/shared/components/icons/ui/ArrowIcon";
import { TrashIcon } from "@/shared/components/icons/ui/TrashIcon";

type Props = {
  images: File[];
  previews: string[];
  onFiles: (files: FileList | null) => void;
  onRemove: (index: number) => void;
};

export function ReviewImageUpload({ previews, onFiles, onRemove }: Props) {
  return (
    <div>
      <label
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          onFiles(e.dataTransfer.files);
        }}
        className="hover:border-accent hover:text-accent group bg-surface text-muted flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-neutral-100 py-4 transition"
      >
        <div className="group-hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 transition">
          <IconWrapper className="-rotate-90 group-hover:text-white">
            <ArrowIcon />
          </IconWrapper>
        </div>

        <div className="text-center">
          <p className="text-sm font-medium">Перетягніть фото сюди</p>
          <p className="text-muted text-xs">або натисніть для вибору</p>
        </div>

        <p className="text-muted text-xs">PNG, JPG, WEBP до 10 МБ</p>

        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => onFiles(e.target.files)}
        />
      </label>

      {previews.length > 0 && (
        <div className="mt-2 grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-2">
          {previews.map((src, i) => (
            <div key={i} className="group flex aspect-square flex-col gap-1">
              <img
                src={src}
                className="h-full w-full rounded-xl object-cover"
              />

              <button
                type="button"
                onClick={() => onRemove(i)}
                className="hover:text-error transition"
              >
                <IconWrapper>
                  <TrashIcon />
                </IconWrapper>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
