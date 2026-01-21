import React from "react";
import FacebookIcon from "../core/components/icons/social-media/FacebookIcon";
import InstagramIcon from "../core/components/icons/social-media/InstagramIcon";
import TelegramIcon from "../core/components/icons/social-media/TelegramIcon";
import TwitterIcon from "../core/components/icons/social-media/TwitterIcon";
import ViberIcon from "../core/components/icons/social-media/ViberIcon";
import YoutubeIcon from "../core/components/icons/social-media/YoutubeIcon";
import Button from "../core/components/ui/Button";
import ClockIcon from "../core/components/icons/ui/ClockIcon";
import { Link } from "react-router";
import MastercardLogo from "../core/components/icons/payments/MastercardLogo";
import VisaLogo from "../core/components/icons/payments/VisaLogo";

const Footer = () => {
  return (
    <div>
      <section
        aria-label="Newsletter"
        className="bg-primary flex h-32 w-full items-center justify-center"
      >
        <div>
          <span className="text-secondary text-2xl font-semibold uppercase">
            будьте в курсі вигідних пропозицій!
          </span>
        </div>
        <input
          type="text"
          className="bg-on-light border-muted ml-11 h-11 w-92 rounded-4xl border-[0.5px] pl-4.5 outline-none"
          placeholder="Ел. пошта"
        />
        <Button
          size="md"
          color="secondary"
          className="ml-6 h-11 rounded-[41px]"
        >
          <span className="text-on-light px-8.5 py-3.5 text-sm font-medium capitalize">
            підписатися
          </span>
        </Button>
      </section>
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
        <div className="border-muted border-t-[0.5px]"></div>
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
    </div>
  );
};

export default Footer;
