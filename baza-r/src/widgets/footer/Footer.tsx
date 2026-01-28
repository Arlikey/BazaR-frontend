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
        <div className="flex justify-between pr-33 pb-12 pl-14 text-[13px]">
          <section aria-label="Contacts" className="flex flex-col gap-4">
            <Link to={""}>
              <div className="inline-flex items-center gap-3">
                <ClockIcon />

                <span className="text-link">Графік роботи Call-центру</span>
              </div>
            </Link>
            <SocialLinks items={socialMediaLinks} />
          </section>
          <LinkGroup groups={footerGroups} className="flex gap-44" />
        </div>
        <div className="bw-t-thin border-neutral-300"></div>
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
