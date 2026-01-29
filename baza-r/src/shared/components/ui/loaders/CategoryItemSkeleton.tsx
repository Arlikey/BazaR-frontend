import Skeleton from "./Skeleton";

export default function CategoryItemSkeleton() {
  return (
    <div className="flex w-full items-center justify-between rounded-sm px-3 py-2">
      <div className="flex items-center gap-2">
        <Skeleton className="h-6.25 w-6.25 opacity-70" />
        <Skeleton className="h-3 w-48" />
      </div>
    </div>
  );
}
