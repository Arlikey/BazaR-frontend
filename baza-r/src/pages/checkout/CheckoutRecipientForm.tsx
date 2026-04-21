import Block from "../../shared/components/ui/Block";
import InputField from "../../shared/components/ui/InputField";

export function CheckoutRecipientForm() {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-4">
        <span className="bw-thin flex h-6 w-6 items-center justify-center rounded-full border-neutral-100 bg-white text-base">
          4
        </span>
        <h2 className="text-lg">Контактні дані отримувача замовлення</h2>
      </div>
      <Block className="grid grid-cols-2 gap-x-10 gap-y-5 p-6 pl-10">
        <InputField placeholder="Прізвище" />
        <InputField placeholder="Ім'я" />
        <InputField placeholder="По батькові" />
        <InputField placeholder="Мобільний телефон" />
      </Block>
    </div>
  );
}
