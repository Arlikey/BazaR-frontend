import type { ComponentType } from "react";
import { ListAltIcon } from "../../../shared/components/icons/ui/ListIcon";
import { FavouriteAlt2Icon } from "../../../shared/components/icons/ui/FavouriteIcon";
import { EyeAltIcon } from "../../../shared/components/icons/ui/EyeIcon";
import { BellIcon } from "../../../shared/components/icons/ui/BellIcon";
import { WalletIcon } from "../../../shared/components/icons/ui/WalletIcon";
import { BonusIcon } from "../../../shared/components/icons/ui/BonusIcon";
import { PremiumIcon } from "../../../shared/components/icons/ui/PremiumIcon";
import { DialogueIcon } from "../../../shared/components/icons/ui/DialogueIcon";
import { MailIcon } from "../../../shared/components/icons/ui/MailIcon";
import { PromotionIcon } from "../../../shared/components/icons/ui/PromotionIcon";

export type SidebarNavItem = {
  label: string;
  to: string;
  icon: ComponentType;
  badge?: number;
};

export const ACCOUNT_NAV: SidebarNavItem[] = [
  { label: "Мої замовлення", to: "/account/orders", icon: ListAltIcon },
  { label: "Список бажань", to: "/account/wishlist", icon: FavouriteAlt2Icon },
  { label: "Переглянуті товари", to: "/account/viewed", icon: EyeAltIcon },
  { label: "Розсилки", to: "/account/newsletters", icon: BellIcon },
  { label: "Мій гаманець", to: "/account/wallet", icon: WalletIcon },
  { label: "Мій бонусний рахунок", to: "/account/bonus", icon: BonusIcon },
  { label: "Підписка Premium", to: "/account/premium", icon: PremiumIcon },
  { label: "Мої відгуки", to: "/account/reviews", icon: DialogueIcon },
  { label: "Моє листування", to: "/account/messages", icon: MailIcon },
  { label: "Участь в акціях", to: "/account/promotions", icon: PromotionIcon },
];
