import { footerGroups, socialMediaLinks } from "@/shared/config/links";
import { uiText } from "@/shared/config/ui-text";
import SocialLinks from "@/shared/components/ui/SocialLinks";
import CustomLink from "@/shared/components/ui/CustomLink";
import { LinkGroup } from "../link-groups/LinkGroup";
import { ClockIcon } from "@/shared/components/icons/ui/ClockIcon";
import { MastercardLogo } from "@/shared/components/icons/payments/MastercardLogo";
import { VisaLogo } from "@/shared/components/icons/payments/VisaLogo";

const Footer = () => {
  return (
    <footer className="bw-t-thin w-full border-neutral-100 md:flex">
      <div className="mt-9 w-full">
        <div className="text-md mx-auto flex max-w-480 flex-col justify-between gap-8 px-8 pb-12 lg:flex-row xl:gap-50 xl:pr-33 xl:pl-14">
          <section
            aria-label={uiText.footer.contactsAriaLabel}
            className="flex flex-col gap-4"
          >
            <CustomLink
              to={""}
              variant="default"
              color="blue"
              className="gap-3"
            >
              <ClockIcon />

              <span className="">{uiText.footer.callCenterSchedule}</span>
            </CustomLink>
            <SocialLinks items={socialMediaLinks} />
          </section>
          <div className="flex flex-1 justify-between gap-4 flex-col md:flex-row">
            {footerGroups.map((group) => (
              <LinkGroup key={group.title} group={group} />
            ))}
          </div>
        </div>
        <div className="bw-t-thin border-neutral-100"></div>
        <div id="copyright" className="mx-auto flex max-w-480 justify-between gap-6 px-8 py-9 xl:pr-33 xl:pl-14 flex-col md:flex-row">
          <div className="flex gap-6 lg:gap-18">
            <MastercardLogo />
            <VisaLogo />
          </div>
          <span className="text-sm font-normal text-neutral-300">
            {uiText.footer.copyright}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
