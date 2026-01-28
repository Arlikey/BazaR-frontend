import type { LinkType } from "./types";
import {
  FacebookIcon,
  InstagramIcon,
  TelegramIcon,
  TwitterIcon,
  ViberIcon,
  YoutubeIcon,
} from "../components/icons/social-media";

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
      { label: "Rozetka Travel", to: "/services/travel" },
    ],
  },
  {
    title: "Партнерам",
    links: [
      { label: "Франчайзинг", to: "/partners/franchise" },
      { label: "Продавати на Розетці", to: "/partners/sell" },
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
