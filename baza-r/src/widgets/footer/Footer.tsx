import { ClockIcon } from "../../shared/components/icons/ui";
import {
  MastercardLogo,
  VisaLogo,
} from "../../shared/components/icons/payments";
import { footerGroups, socialMediaLinks } from "../../shared/config/links";
import SocialLinks from "../../shared/components/ui/SocialLinks";
import CustomLink from "../../shared/components/ui/CustomLink";
import { LinkGroup } from "../link-groups/LinkGroup";

const Footer = () => {
  return (
    <footer className="bw-t-thin hidden w-full border-neutral-300 md:flex">
      <div className="mt-9 w-full">
        <div className="mx-auto flex max-w-480 flex-col justify-between gap-8 px-8 pb-12 text-md lg:flex-row xl:gap-50 xl:pr-33 xl:pl-14">
          <section aria-label="Contacts" className="flex flex-col gap-4">
            <CustomLink to={""} variant="default" color="blue" className="gap-3">
              <ClockIcon />

              <span className="">Графік роботи Call-центру</span>
            </CustomLink>
            <SocialLinks items={socialMediaLinks} />
          </section>
          {footerGroups.map((group) => (
            <LinkGroup key={group.title} group={group} />
          ))}
        </div>
        <div className="bw-t-thin border-neutral-200"></div>
        <div className="mx-auto flex max-w-480 items-center justify-between gap-6 px-8 py-9 xl:pr-33 xl:pl-14">
          <div className="flex gap-6 lg:gap-18">
            <MastercardLogo />
            <VisaLogo />
          </div>
          <span className="text-sm font-normal text-neutral-300">
            © Інтернет-магазин «Розетка™»2001–2022 ТМ використовується на
            підставі ліцензії правовласника RozetkaLTD
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
