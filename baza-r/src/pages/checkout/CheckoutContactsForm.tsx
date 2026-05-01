import Block from "@/shared/components/ui/Block";
import InputField from "@/shared/components/ui/InputField";
import { useMe } from "@/entities/user/queries";
import { useEffect } from "react";

type Contacts = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

type Props = {
  contacts: Contacts;
  setContacts: React.Dispatch<React.SetStateAction<Contacts>>;
};

export function CheckoutContactsForm({ contacts, setContacts }: Props) {
  const { data: me } = useMe();

  useEffect(() => {
    if (me) {
      setContacts({
        firstName: me.firstName,
        lastName: me.lastName,
        phone: me.phone,
        email: me.email,
      });
    }
  }, [me]);

  return (
    <Block className="grid grid-cols-2 gap-x-10 gap-y-5 p-6 pl-10">
      <InputField
        placeholder="Прізвище"
        value={contacts.lastName}
        onChange={(e) =>
          setContacts((p) => ({ ...p, lastName: e.target.value }))
        }
      />
      <InputField
        placeholder="Ім'я"
        value={contacts.firstName}
        onChange={(e) =>
          setContacts((p) => ({ ...p, firstName: e.target.value }))
        }
      />
      <InputField
        placeholder="Мобільний телефон"
        value={contacts.phone}
        onChange={(e) => setContacts((p) => ({ ...p, phone: e.target.value }))}
      />
      <InputField
        placeholder="Електронна пошта"
        value={contacts.email}
        onChange={(e) => setContacts((p) => ({ ...p, email: e.target.value }))}
      />
    </Block>
  );
}
