import Skeleton from "./Skeleton";

export function GallerySkeleton() {
  return (
    <div className="flex gap-5">
      <div className="hidden max-h-[538px] flex-col gap-6.25 lg:flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton
            key={i}
            className="min-h-[87px] w-[125px]"
          />
        ))}
      </div>
      <Skeleton className="h-[538px] flex-1" />
    </div>
  );
}
