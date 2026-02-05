import React from "react";
import { Divider, SocialLogin } from "./LoginDialog";
import Button from "../../../shared/components/ui/Button";
import CustomLink from "../../../shared/components/ui/CustomLink";
import InputField from "../../../shared/components/ui/InputField";

type Props = {
  onLoginClick?: () => void;
};

export default function RegisterDialog({ onLoginClick }: Props) {
  return (
    <div className="w-[670px] p-7.5">
      <h2 className="text-2xl">Реєстрація</h2>
      <div className="flex gap-5">
        <form className="flex flex-1 flex-col" aria-label="Login form">
          <div className="mt-5 flex flex-col gap-5">
            <InputField
              id="login-identifier"
              type="text"
              autoComplete="username"
              placeholder="І’мя"
            />
            <InputField
              id="login-password"
              type="password"
              autoComplete="current-password"
              placeholder="Прізвище"
            />
            <InputField
              id="login-password"
              type="password"
              autoComplete="current-password"
              placeholder="Номер телефону"
            />
            <InputField
              id="login-password"
              type="password"
              autoComplete="current-password"
              placeholder="Ел.пошта"
            />
            <div>
              <InputField
                id="login-password"
                type="password"
                autoComplete="current-password"
                placeholder="Придумайте пароль"
              />
              <span className="text-muted mt-2 inline-flex pr-2 pl-4 text-[11px]">
                Пароль повинен складатися з не менш ніж 6 символів, містити
                цифри та латинські літери, у тому числі великі, і не повинен
                збігатися з ім'ям та ел. поштою
              </span>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center">
            <span className="text-muted inline text-[11px]">
              Реєструючись, ви погоджуєтеся з{" "}
              <CustomLink to={""} variant="default" color="blue">
                угодою користувача
              </CustomLink>
            </span>
            <Button
              color="secondary"
              type="submit"
              className="text-inverse mt-3 h-12 w-full rounded-[30px] text-base"
            >
              <span>Зареєструватись</span>
            </Button>
          </div>
          <button
            type="button"
            className="text-link mt-5 text-base font-medium"
            onClick={onLoginClick}
          >
            Я вже зареєстрований
          </button>
        </form>

        <Divider />
        <SocialLogin />
      </div>
    </div>
  );
}
