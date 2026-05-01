import { FacebookIcon } from "../components/icons/social-media/FacebookIcon";
import { InstagramIcon } from "../components/icons/social-media/InstagramIcon";
import { TelegramIcon } from "../components/icons/social-media/TelegramIcon";
import { TwitterIcon } from "../components/icons/social-media/TwitterIcon";
import { ViberIcon } from "../components/icons/social-media/ViberIcon";
import { YoutubeIcon } from "../components/icons/social-media/YoutubeIcon";
import type { LinkType } from "./types";

export const footerGroups: LinkType[] = [
  {
    title: "Допомога",
    links: [
      { label: "Доставка та оплата", to: "/help/delivery-payment" },
      { label: "Кредит", to: "/help/credit" },
      { label: "Гарантія", to: "/help/warranty" },
      { label: "Повернення товару", to: "/help/returns" },
      { label: "Сервісні центри", to: "/help/service-centers" },
      { label: "Відстежити замовлення", to: "/help/track-order" },
    ],
  },
  {
    title: "Інформація про компанію",
    links: [
      { label: "Про нас", to: "/company/about" },
      { label: "Умови використання сайту", to: "/company/terms" },
      { label: "Вакансії", to: "/company/careers" },
      { label: "Контакти", to: "/company/contacts" },
    ],
  },
  {
    title: "Сервіси",
    links: [
      { label: "Бонусний рахунок", to: "/services/bonus-account" },
      { label: "Premium", to: "/services/premium" },
      { label: "Подарункові сертифікати", to: "/services/gift-cards" },
      { label: "Обмін", to: "/services/exchange" },
      { label: "Baza-R Travel", to: "/services/travel" },
    ],
  },
  {
    title: "Партнерам",
    links: [
      { label: "Франчайзинг", to: "/partners/franchise" },
      { label: "Продавати на Baza-R", to: "/newseller" },
      { label: "Співпраця з нами", to: "/partners/cooperation" },
    ],
  },
];

export const socialMediaLinks = [
  { label: "Facebook", href: "#", icon: FacebookIcon },
  { label: "Twitter", href: "#", icon: TwitterIcon },
  { label: "YouTube", href: "https://www.youtube.com", icon: YoutubeIcon },
  { label: "Instagram", href: "#", icon: InstagramIcon },
  { label: "Viber", href: "#", icon: ViberIcon },
  { label: "Telegram", href: "#", icon: TelegramIcon },
];
