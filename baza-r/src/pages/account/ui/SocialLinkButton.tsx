import type { ComponentType } from "react";
import { Button } from "../../../shared/components/ui/Button";
import Block from "../../../shared/components/ui/Block";
import IconWrapper from "../../../shared/components/ui/IconWrapper";

type Props = {
  icon: ComponentType;
  label: string;
  onClick?: () => void;
};

export function SocialLinkButton({ icon: Icon, label, onClick }: Props) {
  return (
    <Button asChild variant="solid" color="link" className="h-auto p-0">
      <Block
        className="flex cursor-pointer items-center gap-3 px-4 py-3 transition hover:shadow-md"
        onClick={onClick}
      >
        <IconWrapper>
          <Icon />
        </IconWrapper>
        <div className="flex flex-col items-start font-medium">
          <span className="text-base text-black">{label}</span>
          <span className="text-sm">Зв'язати з соц.мережею</span>
        </div>
      </Block>
    </Button>
  );
}
