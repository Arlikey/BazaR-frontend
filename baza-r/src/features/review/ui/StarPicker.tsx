import { useState } from "react";
import { StarIcon } from "../../../shared/components/icons/ui/StarIcon";
import { cn } from "tailwind-variants";

type StarPickerProps = {
  value: number;
  onChange: (rating: number) => void;
  size?: number;
};

export function StarPicker({ value, onChange, size = 24 }: StarPickerProps) {
  const [hovered, setHovered] = useState(0);
  const active = hovered || value;

  return (
    <ul className="inline-flex w-full" onMouseLeave={() => setHovered(0)}>
      {Array.from({ length: 5 }).map((_, i) => {
        const star = i + 1;

        return (
          <li key={star} className="flex-1">
            <button
              type="button"
              onClick={() => onChange(star)}
              onMouseEnter={() => setHovered(star)}
              className={cn(
                "flex w-full justify-center transition-colors",
                star <= active ? "text-[#FFA900]" : "text-neutral-200",
              )}
            >
              <StarIcon size={size} />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
