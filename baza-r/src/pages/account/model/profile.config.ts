import type { ComponentType, ReactNode } from "react";
import {
  UserAlt2Icon,
  UserAltIcon,
} from "../../../shared/components/icons/ui/UserIcon";
import { PackageIcon } from "../../../shared/components/icons/ui/PackageIcon";
import { ContactsIcon } from "../../../shared/components/icons/ui/ContactsIcon";
import { DeliveryIcon } from "../../../shared/components/icons/ui/DeliveryIcon";
import { LockIcon } from "../../../shared/components/icons/ui/LockIcon";
import { PawIcon } from "../../../shared/components/icons/ui/PawIcon";
import PersonalSection from "../ui/sections/PersonalSection";
import RecipientsSection from "../ui/sections/RecipientsSection";
import ContactsSection from "../ui/sections/ContactsSection";
import DeliverySection from "../ui/sections/DeliverySection";
import LoginSection from "../ui/sections/LoginSection";
import PetsSection from "../ui/sections/PetsSection";
import AdditionalSection from "../ui/sections/AdditionalSection";
import { FacebookAltIcon } from "../../../shared/components/icons/login/FacebookIcon";
import { GoogleIcon } from "../../../shared/components/icons/login/GoogleIcon";

export type ProfileSection = {
  value: string;
  icon: ComponentType;
  title: string;
  content: ComponentType;
};

export const socialLinks = [
  { value: "facebook", icon: FacebookAltIcon, label: "Facebook" },
  { value: "google",   icon: GoogleIcon,      label: "Google" },
];

export const profileSections: ProfileSection[] = [
  {
    value: "personal",
    icon: UserAltIcon,
    title: "Особисті дані",
    content: PersonalSection,
  },
  {
    value: "recipients",
    icon: PackageIcon,
    title: "Мої отримувачі замовлень",
    content: RecipientsSection,
  },
  {
    value: "contacts",
    icon: ContactsIcon,
    title: "Контакти",
    content: ContactsSection,
  },
  {
    value: "delivery",
    icon: DeliveryIcon,
    title: "Адреса доставки",
    content: DeliverySection,
  },
  { value: "login", icon: LockIcon, title: "Логін", content: LoginSection },
  {
    value: "pets",
    icon: PawIcon,
    title: "Домашні тварини",
    content: PetsSection,
  },
  {
    value: "additional",
    icon: UserAlt2Icon,
    title: "Додаткова інформація",
    content: AdditionalSection,
  },
];
