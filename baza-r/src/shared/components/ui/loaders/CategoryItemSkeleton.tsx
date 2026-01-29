import Skeleton from "./Skeleton";

type Props = {
  count?: number;
};

export default function CategoryItemSkeleton({ count = 8 }: Props) {
  return (
    <nav className="bg-on-light bw-thin max-w-81.25 rounded-xl border-neutral-100 px-6 py-3">
      <ul>
        {Array.from({ length: count }).map((_, i) => (
          <li key={i}>
            <div className="flex w-full items-center justify-between rounded-sm px-3 py-2">
              <div className="flex items-center gap-2">
                <Skeleton variant="rect" width="1.5625rem" height="1.5625rem" />
                <Skeleton variant="line" width="12rem" height="0.75rem" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
}
