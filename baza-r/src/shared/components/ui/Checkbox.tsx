import type { ReactNode } from "react";
import { CheckIcon } from "../icons/ui/CheckIcon";

type Props = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  children?: ReactNode;
  rounded?: boolean;
};

export function Checkbox({ checked, onChange, children, rounded }: Props) {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="peer sr-only"
      />

      <div
        className={`border-accent peer-checked:bg-accent flex h-4 w-4 items-center justify-center border text-transparent peer-checked:text-white ${rounded ? "rounded-full" : "rounded"} `}
      >
        <CheckIcon />
      </div>

      {children}
    </label>
  );
}
