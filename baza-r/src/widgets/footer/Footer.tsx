import { Link } from "react-router";
import { ClockIcon } from "../../shared/components/icons/ui";
import {
  MastercardLogo,
  VisaLogo,
} from "../../shared/components/icons/payments";
import LinkGroup from "../link-group/LinkGroup";
import { footerGroups, socialMediaLinks } from "../../shared/config/links";
import SocialLinks from "../../shared/components/ui/SocialLinks";

const Footer = () => {
  return (
    <footer className="bw-t-thin hidden w-full border-neutral-300 md:flex">
      <div className="mt-9 w-full">
        <div className="mx-auto flex max-w-480 flex-col justify-between gap-8 px-8 pb-12 text-[13px] lg:flex-row xl:gap-50 xl:pr-33 xl:pl-14">
          <section aria-label="Contacts" className="flex flex-col gap-4">
            <Link to={""}>
              <div className="inline-flex items-center gap-3">
                <ClockIcon />

                <span className="text-link">Графік роботи Call-центру</span>
              </div>
            </Link>
            <SocialLinks items={socialMediaLinks} />
          </section>
          <LinkGroup
            groups={footerGroups}
            className="flex flex-1 justify-between gap-4"
          />
        </div>
        <div className="bw-t-thin border-neutral-200"></div>
        <div className="mx-auto flex max-w-480 items-center justify-between gap-6 px-8 py-9 xl:pr-33 xl:pl-14">
          <div className="flex gap-6 lg:gap-18">
            <MastercardLogo />
            <VisaLogo />
          </div>
          <span className="text-[12px] font-normal text-neutral-300">
            © Інтернет-магазин «Розетка™»2001–2022 ТМ використовується на
            підставі ліцензії правовласника RozetkaLTD
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
