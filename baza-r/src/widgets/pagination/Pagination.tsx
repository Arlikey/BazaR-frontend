import { CaretIcon } from "../../shared/components/icons/ui/CaretIcon";
import { Button } from "../../shared/components/ui/Button";
import { useMediaQuery } from "react-responsive";
type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ page, totalPages, onPageChange }: Props) {
  const isMobile = useMediaQuery({ maxWidth: 639 });

  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages: (number | "...")[] = [];
    const delta = isMobile ? 1 : 2;

    if (totalPages <= (isMobile ? 3 : 7)) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);
    if (page > delta + 1) pages.push("...");

    const start = Math.max(2, page - (isMobile ? 0 : 1));
    const end = Math.min(totalPages - 1, page + (isMobile ? 0 : 1));

    for (let i = start; i <= end; i++) pages.push(i);

    if (page < totalPages - delta) pages.push("...");
    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex items-center justify-between">
      <Button
        variant="outline"
        color="default"
        size="icon"
        rounded="md"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="text-foreground-muted hover:text-accent hover:border-accent rotate-90 border-neutral-100 bg-white disabled:opacity-30"
      >
        <CaretIcon />
      </Button>

      <div className="flex gap-1">
        {getPages().map((p, i) =>
          p === "..." ? (
            <span
              key={`dots-${i}`}
              className="bw-thin flex h-11 w-11 items-center justify-center rounded-[10px] border-neutral-100 bg-white text-sm text-neutral-400"
            >
              ···
            </span>
          ) : (
            <Button
              variant="outline"
              color="default"
              size="icon"
              rounded="md"
              key={p}
              onClick={() => onPageChange(p)}
              className={`text-foreground-muted border-neutral-100 bg-white ${
                p === page
                  ? "border-accent!"
                  : "hover:text-accent hover:border-accent"
              }`}
            >
              {p}
            </Button>
          ),
        )}
      </div>

      <Button
        variant="outline"
        color="default"
        size="icon"
        rounded="md"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="text-foreground-muted hover:text-accent hover:border-accent -rotate-90 border-neutral-100 bg-white disabled:opacity-30"
      >
        <CaretIcon />
      </Button>
    </div>
  );
}
