import { type ReactNode } from "react";

type Props = {
  size?: number;
  className?: string;
  children?: ReactNode;
};

const IconSkeleton = ({ size, className, children }: Props) => {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full ${className ?? ""}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {children}
    </span>
  );
};

export default IconSkeleton;
