import { useEffect, useState } from "react";
import { Divider, SocialLogin } from "./LoginDialog";
import CustomLink from "../../../shared/components/ui/CustomLink";
import InputField from "../../../shared/components/ui/InputField";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterFormValues,
} from "../../../features/auth/model/schemas/registerSchema";
import IconWrapper from "../../../shared/components/ui/IconWrapper";
import { EyeOffIcon } from "../../../shared/components/icons/ui/EyeOffIcon";
import { EyeIcon } from "../../../shared/components/icons/ui/EyeIcon";
import { Button } from "../../../shared/components/ui/Button";
import { uiText } from "../../../shared/config/ui-text";

type Props = {
  onLoginClick?: () => void;
};

export default function RegisterDialog({ onLoginClick }: Props) {
  const [visible, setIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors, isValid, isSubmitting, touchedFields, dirtyFields },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const name = useWatch({ control, name: "name" });
  const email = useWatch({ control, name: "email" });
  const password = useWatch({ control, name: "password" }) ?? "";
  const touchedPassword = touchedFields.password;

  useEffect(() => {
    if (!password || !touchedPassword) return;
    void trigger("password");
  }, [name, email, password, touchedPassword, trigger]);

  return (
    <div className="w-167.5 p-7.5">
      <h2 className="text-2xl">{uiText.auth.registerTitle}</h2>
      <div className="flex gap-5">
        <form
          className="flex flex-1 flex-col"
          aria-label={uiText.auth.loginFormAriaLabel}
          onSubmit={handleSubmit((data) => console.log(data))}
        >
          <div className="mt-5 flex flex-col gap-5">
            <InputField
              id="register-name"
              type="text"
              error={errors.name?.message}
              success={dirtyFields.name && !errors.name}
              autoComplete="given-name"
              placeholder={uiText.auth.registerNamePlaceholder}
              {...register("name")}
            />
            <InputField
              id="register-lastname"
              type="text"
              error={errors.lastname?.message}
              success={dirtyFields.lastname && !errors.lastname}
              autoComplete="family-name"
              placeholder={uiText.auth.registerLastNamePlaceholder}
              {...register("lastname")}
            />
            <InputField
              id="register-phone"
              type="text"
              error={errors.phone?.message}
              success={dirtyFields.phone && !errors.phone}
              autoComplete="tel"
              placeholder={uiText.auth.registerPhonePlaceholder}
              {...register("phone")}
            />
            <InputField
              id="register-email"
              type="text"
              error={errors.email?.message}
              success={dirtyFields.email && !errors.email}
              autoComplete="email"
              placeholder={uiText.auth.registerEmailPlaceholder}
              {...register("email")}
            />
            <div>
              <InputField
                id="register-password"
                type={visible ? "text" : "password"}
                error={!!errors.password}
                success={dirtyFields.password && !errors.password}
                autoComplete="new-password"
                inputClassName={visible || password === "" ? "" : "font-mono"}
                placeholder={uiText.auth.registerPasswordPlaceholder}
                {...register("password")}
                rightIcon={
                  <Button
                    variant="solid"
                    color="default"
                    className="pointer-events-auto"
                    type="button"
                    onClick={() => setIsVisible(!visible)}
                  >
                    <IconWrapper>
                      {visible ? <EyeIcon /> : <EyeOffIcon />}
                    </IconWrapper>
                  </Button>
                }
              />
              <span className="text-muted mt-2 inline-flex pr-2 pl-4 text-[11px]">
                {uiText.auth.passwordHint}
              </span>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center">
            <span className="text-muted inline text-[11px]">
              {uiText.auth.registerAgreementPrefix}{" "}
              <CustomLink to={""} variant="default" color="blue">
                {uiText.auth.registerAgreementLink}
              </CustomLink>
            </span>
            <Button
              color="secondary"
              type="submit"
              fullWidth
              className="text-inverse mt-3 h-12 rounded-[30px] text-base"
              disabled={!isValid || isSubmitting}
            >
              <span>{uiText.auth.registerSubmit}</span>
            </Button>
            <Button
              type="button"
              variant="link"
              color="link"
              textSize="md"
              className="mt-5"
              onClick={onLoginClick}
            >
              {uiText.auth.openLogin}
            </Button>
          </div>
        </form>

        <div className="flex gap-5 pb-45">
          <Divider />
          <SocialLogin />
        </div>
      </div>
    </div>
  );
}
