export function GallerySkeleton() {
  return (
    <div className="flex gap-5">
      <div className="flex max-h-[538px] flex-col gap-6.25">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="min-h-[87px] w-[125px] animate-pulse rounded-[12px] bg-neutral-100" />
        ))}
      </div>
      <div className="h-[538px] flex-1 animate-pulse rounded-[25px] bg-neutral-100" />
    </div>
  );
}