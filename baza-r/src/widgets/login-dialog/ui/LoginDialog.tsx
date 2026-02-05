// file: src/widgets/login-dialog/ui/LoginDialog.tsx
import type { ReactNode } from "react";
import CustomLink from "../../../shared/components/ui/CustomLink";
import Button from "../../../shared/components/ui/Button";
import IconWrapper from "../../../shared/components/ui/IconWrapper";
import InputField from "../../../shared/components/ui/InputField";
import FacebookIcon from "../../../shared/components/icons/login/FacebookIcon";
import GoogleIcon from "../../../shared/components/icons/login/GoogleIcon";

export const SocialButton = ({ label, icon }: { label: string; icon: ReactNode }) => (
  <div className="bw-thin bg-surface flex h-12 items-center justify-center rounded-[30px] border-neutral-300/50">
    <CustomLink to={""} variant="default" color="blue" aria-label={label}>
      <IconWrapper>{icon}</IconWrapper>
      <span>{label}</span>
    </CustomLink>
  </div>
);

export const Divider = () => (
  <div
    className="grid grid-rows-[1fr_auto_1fr] items-center justify-items-center gap-3 text-neutral-200"
    aria-hidden="true"
  >
    <span className="h-full w-px bg-neutral-200" />
    <span className="text-sm leading-none">або</span>
    <span className="h-full w-px bg-neutral-200" />
  </div>
);

export const SocialLogin = () => (
  <div className="flex w-[205px] flex-col items-center justify-center gap-5">
    <span className="text-muted text-base">Увійти як користувач</span>
    <div className="flex w-full flex-col gap-5">
      <SocialButton label="Facebook" icon={<FacebookIcon />} />
      <SocialButton label="Google" icon={<GoogleIcon />} />
    </div>
  </div>
);

type Props = {
  onRegisterClick?: () => void;
};

export default function LoginDialog({ onRegisterClick }: Props) {
  return (
    <div className="w-[670px] p-7.5" aria-labelledby="login-title">
      <h2 id="login-title" className="text-2xl">
        Вхід
      </h2>

      <div className="flex gap-5">
        <form className="flex flex-1 flex-col" aria-label="Login form">
          <div className="mt-5 flex flex-col gap-5">
            <InputField
              id="login-identifier"
              type="text"
              autoComplete="username"
              placeholder="Ел. пошта або телефон"
            />
            <InputField
              id="login-password"
              type="password"
              autoComplete="current-password"
              placeholder="Пароль"
            />
          </div>

          <div className="mt-2 flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <input id="rememberMe" type="checkbox" />
              <label htmlFor="rememberMe" className="text-muted">
                Запам’ятати мене
              </label>
            </div>
            <CustomLink to={""} variant="default" color="blue">
              Нагадати пароль
            </CustomLink>
          </div>

          <div className="flex flex-col items-center">
            <Button
              color="secondary"
              type="submit"
              className="text-inverse mt-9 h-12 w-full rounded-[30px] text-base"
            >
              <span>Увійти</span>
            </Button>

            <button
              type="button"
              onClick={onRegisterClick}
              className="mt-8 text-base font-medium text-link"
            >
              Зареєструватися
            </button>
          </div>
        </form>

        <Divider />
        <SocialLogin />
      </div>
    </div>
  );
}
