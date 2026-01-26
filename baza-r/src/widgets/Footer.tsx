import React from "react";
import { Link } from "react-router";
import { ClockIcon } from "../shared/components/icons/ui";
import {
  FacebookIcon,
  InstagramIcon,
  TelegramIcon,
  TwitterIcon,
  ViberIcon,
  YoutubeIcon,
} from "../shared/components/icons/social-media";
import { MastercardLogo, VisaLogo } from "../shared/components/icons/payments";

const Footer = () => {
  return (
    <footer className="border-t-thin border-neutral-300">
      <div className="mt-9">
        <div className="flex justify-between pr-33 pb-12 pl-14 text-[13px]">
          <section aria-label="Contacts" className="flex flex-col gap-4">
            <Link to={""}>
              <div className="inline-flex items-center gap-3">
                <ClockIcon />

                <span className="text-link">Графік роботи Call-центру</span>
              </div>
            </Link>
            <section aria-label="Social Media" className="flex gap-5">
              <FacebookIcon />
              <InstagramIcon />
              <TelegramIcon />
              <TwitterIcon />
              <ViberIcon />
              <YoutubeIcon />
            </section>
          </section>
          <ul className="flex gap-44">
            <li>
              <span className="font-medium">Допомога</span>
              <ul className="mt-2 space-y-1">
                <li>Доставка та оплата</li>
                <li>Кредит</li>
                <li>Гарантія</li>
                <li>Повернення товару</li>
                <li>Сервісні центри</li>
                <li>Відстежити замовлення</li>
              </ul>
            </li>

            <li>
              <span className="font-medium">Інформація про компанію</span>
              <ul className="mt-2 space-y-1">
                <li>Про нас</li>
                <li>Умови використання сайту</li>
                <li>Вакансії</li>
                <li>Контакти</li>
              </ul>
            </li>

            <li>
              <span className="font-medium">Сервіси</span>
              <ul className="mt-2 space-y-1">
                <li>Бонусний рахунок</li>
                <li>Premium</li>
                <li>Подарункові сертифікати</li>
                <li>Обмін</li>
                <li>Rozetka Travel</li>
              </ul>
            </li>

            <li>
              <span className="font-medium">Партнерам</span>
              <ul className="mt-2 space-y-1">
                <li>Франчайзинг</li>
                <li>Продавати на Розетці</li>
                <li>Співпраця з нами</li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="border-t-thin border-neutral-300"></div>
        <div className="flex items-center justify-between py-9 pr-33 pl-14">
          <div className="flex gap-18">
            <MastercardLogo />
            <VisaLogo />
          </div>
          <span className="text-muted text-[12px] font-normal">
            © Інтернет-магазин «Розетка™»2001–2022 ТМ використовується на
            підставі ліцензії правовласника RozetkaLTD
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
