import Skeleton from "./Skeleton";

export function GallerySkeleton() {
  return (
    <div className="flex gap-5">
      <div className="hidden max-h-134.5 flex-col gap-6.25 lg:flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="min-h-21.75 w-31.25 rounded-2xl" />
        ))}
      </div>
      <Skeleton className="h-134.5 flex-1 rounded-2xl" />
    </div>
  );
}
