import { useState, type ReactNode } from "react";
import CustomLink from "../../../../shared/components/ui/CustomLink";
import { Button } from "../../../../shared/components/ui/Button";
import IconWrapper from "../../../../shared/components/ui/IconWrapper";
import InputField from "../../../../shared/components/ui/InputField";
import {
  loginSchema,
  type LoginFormValues,
} from "../../../../features/auth/model/schemas/loginSchema";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon } from "../../../../shared/components/icons/ui/EyeIcon";
import { EyeOffIcon } from "../../../../shared/components/icons/ui/EyeOffIcon";
import { uiText } from "../../../../shared/config/ui-text";
import { Divider } from "../components/Divider";
import { SocialLogin } from "../components/SocialLogin";

type Props = {
  onRegisterClick?: () => void;
};

export default function LoginDialog({ onRegisterClick }: Props) {
  const [visible, setIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting, dirtyFields },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const password = useWatch({ control, name: "password" }) ?? "";

  return (
    <div className="w-167.5 p-7.5" aria-labelledby="login-title">
      <h2 id="login-title" className="text-2xl">
        {uiText.auth.loginTitle}
      </h2>

      <div className="flex gap-5">
        <form
          className="flex flex-1 flex-col"
          aria-label={uiText.auth.loginFormAriaLabel}
          onSubmit={handleSubmit((data) => console.log(data))}
        >
          <div className="mt-5 flex flex-col gap-5">
            <InputField
              id="login-identifier"
              type="text"
              autoComplete="email"
              placeholder={uiText.auth.loginIdentifierPlaceholder}
              error={errors.identifier?.message}
              success={dirtyFields.identifier && !errors.identifier}
              {...register("identifier")}
            />
            <InputField
              id="login-password"
              type={visible ? "text" : "password"}
              error={!!errors.password}
              success={dirtyFields.password && !errors.password}
              autoComplete="current-password"
              inputClassName={visible || password === "" ? "" : "font-mono"}
              placeholder={uiText.auth.loginPasswordPlaceholder}
              {...register("password")}
              rightIcon={
                <Button
                  variant="solid"
                  color="default"
                  className="pointer-events-auto"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsVisible(!visible);
                  }}
                >
                  <IconWrapper>
                    {visible ? <EyeIcon /> : <EyeOffIcon />}
                  </IconWrapper>
                </Button>
              }
            />
          </div>

          <div className="mt-2 flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <input id="rememberMe" type="checkbox" />
              <label htmlFor="rememberMe" className="text-muted">
                {uiText.auth.rememberMe}
              </label>
            </div>
            <CustomLink to={""} variant="default" color="blue">
              {uiText.auth.forgotPassword}
            </CustomLink>
          </div>

          <div className="flex flex-col items-center">
            <Button
              color="secondary"
              type="submit"
              fullWidth
              className="text-inverse mt-9 h-12 rounded-[30px] text-base"
              disabled={!isValid || isSubmitting}
            >
              <span>{uiText.auth.loginSubmit}</span>
            </Button>

            <Button
              type="button"
              variant="link"
              color="link"
              textSize="md"
              className="mt-8"
              onClick={onRegisterClick}
            >
              {uiText.auth.openRegister}
            </Button>
          </div>
        </form>

        <div className="flex gap-5 pb-5">
          <Divider />
          <SocialLogin />
        </div>
      </div>
    </div>
  );
}
