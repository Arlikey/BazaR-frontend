import Block from "../../shared/components/ui/Block";
import InputField from "../../shared/components/ui/InputField";

export function CheckoutContactsForm() {
  return (
    <Block className="grid grid-cols-2 gap-x-10 gap-y-5 p-6 pl-10">
      <InputField placeholder="Прізвище" />
      <InputField placeholder="Ім'я" />
      <InputField placeholder="Мобільний телефон" />
      <InputField placeholder="Електронна пошта" />
    </Block>
  );
}
