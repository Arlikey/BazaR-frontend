import type { ReactNode } from "react";
import FacebookIcon from "../../../../shared/components/icons/login/FacebookIcon";
import GoogleIcon from "../../../../shared/components/icons/login/GoogleIcon";
import { uiText } from "../../../../shared/config/ui-text";
import CustomLink from "../../../../shared/components/ui/CustomLink";
import IconWrapper from "../../../../shared/components/ui/IconWrapper";

export const SocialButton = ({
  label,
  icon,
}: {
  label: string;
  icon: ReactNode;
}) => (
  <CustomLink
    href=""
    target="_blank"
    variant="default"
    color="blue"
    aria-label={label}
    className="bw-thin bg-surface flex h-12 items-center justify-center rounded-[30px] border-neutral-300/50"
  >
    <IconWrapper>{icon}</IconWrapper>
    <span>{label}</span>
  </CustomLink>
);

export const SocialLogin = () => (
  <div className="flex w-51.25 flex-col items-center justify-center gap-5">
    <span className="text-muted text-base">{uiText.auth.socialLoginTitle}</span>
    <div className="flex w-full flex-col gap-5">
      <SocialButton
        label={uiText.auth.socialFacebook}
        icon={<FacebookIcon />}
      />
      <SocialButton label={uiText.auth.socialGoogle} icon={<GoogleIcon />} />
    </div>
  </div>
);
