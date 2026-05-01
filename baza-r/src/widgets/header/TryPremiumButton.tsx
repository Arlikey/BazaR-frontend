import { Button } from "@/shared/components/ui/Button";
import { uiText } from "@/shared/config/ui-text";

export function TryPremiumButton() {
  return (
    <div className="hidden 2xl:flex">
      <Button
        size="icon"
        rounded="sm"
        className="mx-20 w-21 flex-col gap-1 2xl:ml-24"
      >
        <span className="text-background text-xs font-normal capitalize">
          {uiText.header.premiumTryLabel}
        </span>
        <span className="bg-premium rounded-[10px] px-2.5 py-1 text-xs font-medium text-black uppercase">
          {uiText.header.premiumLabel}
        </span>
      </Button>
    </div>
  );
}
