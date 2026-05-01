import type { ComponentType } from "react";
import { ComputerIcon } from "../../../shared/components/icons/categories/ComputerIcon";
import { SmartphoneIcon } from "../../../shared/components/icons/categories/SmartphoneIcon";
import { GameIcon } from "../../../shared/components/icons/categories/GameIcon";
import { WashingMachineIcon } from "../../../shared/components/icons/categories/WashingMachineIcon";
import { InstrumentIcon } from "../../../shared/components/icons/categories/InstrumentIcon";
import { SofaIcon } from "../../../shared/components/icons/categories/SofaIcon";
import { ShowerIcon } from "../../../shared/components/icons/categories/ShowerIcon";
import { GardenIcon } from "../../../shared/components/icons/categories/GardenIcon";
import { SportIcon } from "../../../shared/components/icons/categories/SportIcon";
import { ClothesIcon } from "../../../shared/components/icons/categories/ClothesIcon";
import { BeautyIcon } from "../../../shared/components/icons/categories/BeautyIcon";
import { PuzzleIcon } from "../../../shared/components/icons/categories/PuzzleIcon";
import { PawsIcon } from "../../../shared/components/icons/categories/PawsIcon";
import { BooksIcon } from "../../../shared/components/icons/categories/BooksIcon";
import { ChampagneIcon } from "../../../shared/components/icons/categories/ChampagneIcon";
import { CodeIcon } from "../../../shared/components/icons/categories/CodeIcon";
import { RelaxIcon } from "../../../shared/components/icons/categories/RelaxIcon";
import { OfferIcon } from "../../../shared/components/icons/categories/OfferIcon";
import { SaleIcon } from "../../../shared/components/icons/categories/SaleIcon";

export const categoryIcons: Record<string, ComponentType> = {
  "Ноутбуки та комп'ютери": ComputerIcon,
  "Смартфони, ТВ та електроніка": SmartphoneIcon,
  "Товари для геймерів": GameIcon,
  "Побутова техніка": WashingMachineIcon,
  "Товари для дому": SofaIcon,
  "Інструменти та автотовари": InstrumentIcon,
  "Сантехніка та ремонт": ShowerIcon,
  "Дача, сад та город": GardenIcon,
  "Спорт та захоплення": SportIcon,
  "Одяг, взуття та прикраси": ClothesIcon,
  "Краса і здоров'я": BeautyIcon,
  "Дитячі товари": PuzzleIcon,
  "Зоотовари": PawsIcon,
  "Канцтовари та книги": BooksIcon,
  "Алкогольні напої та продукти": ChampagneIcon,
  "Товари для бізнесу та послуги": CodeIcon,
  "Тури та відпочинок": RelaxIcon,
  "Акції": OfferIcon,
  "Тотальний розпродаж": SaleIcon,
};

export function getCategoryIcon(key: string | null): ComponentType | null {
  if (!key) return null;
  return categoryIcons[key] ?? null;
}
