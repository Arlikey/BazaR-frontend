export type SubOption = {
  id: string;
  label: string;
};

export type ServiceOption = {
  id: string;
  label: string;
  subOptions?: SubOption[];
};

export const SERVICES: ServiceOption[] = [
  {
    id: "warranty",
    label: "Сервіси подовження гарантії",
    subOptions: [
      { id: "warranty-1y", label: "Подовження гарантії на 1 рік" },
      { id: "warranty-2y", label: "Подовження гарантії на 2 роки" },
    ],
  },
  {
    id: "remote-setup",
    label: "Дистанційне налаштування ПК",
    subOptions: [
      { id: "remote-gaming", label: "Дистанційне налаштування ПК для геймерів" },
    ],
  },
];