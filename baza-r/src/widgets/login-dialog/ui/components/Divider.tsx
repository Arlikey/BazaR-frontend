import { uiText } from "@/shared/config/ui-text";

export const Divider = () => (
  <div
    className="grid grid-rows-[1fr_auto_1fr] items-center justify-items-center gap-3 text-neutral-200"
    aria-hidden="true"
  >
    <span className="h-full w-px bg-neutral-200" />
    <span className="text-sm leading-none">{uiText.auth.divider}</span>
    <span className="h-full w-px bg-neutral-200" />
  </div>
);
