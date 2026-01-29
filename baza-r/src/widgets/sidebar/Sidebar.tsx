import AppleStoreIcon from "../../shared/components/icons/apps/AppleStoreIcon";
import PlayStoreIcon from "../../shared/components/icons/apps/PlayStoreIcon";
import {
  MastercardLogo,
  VisaLogo,
} from "../../shared/components/icons/payments";
import QuestionIcon from "../../shared/components/icons/ui/QuestionIcon";
import Button from "../../shared/components/ui/Button";
import CardSection from "../../shared/components/ui/CardSection";
import CustomLink from "../../shared/components/ui/CustomLink";
import SocialLinks from "../../shared/components/ui/SocialLinks";
import { footerGroups, socialMediaLinks } from "../../shared/config/links";
import CatalogMenu from "../catalog/ui/CatalogMenu";
import LinkGroup from "../link-group/LinkGroup";

export function Sidebar() {
  return (
    <aside className="flex flex-col gap-4">
      <CatalogMenu />

      <CardSection className="flex items-center gap-2 px-6 py-2">
        <CustomLink to={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"} target="_blank" variant="menu" className="flex flex-1">
          <span className="flex h-6.25 w-6.25 items-center justify-center">
            <QuestionIcon />
          </span>
          <span className="text-[12px]">Довідковий центр</span>
        </CustomLink>
      </CardSection>

      <CardSection className="flex flex-col items-center justify-center px-6 py-9 text-center">
        <h3 className="text-[19px]">Ласкаво просимо!</h3>
        <p className="mt-2 w-60 text-[13px]">
          Увійдіть, щоб отримувати рекомендації, персональні бонуси та знижки.
        </p>
        <Button
          color="secondary"
          size="md"
          className="mt-3 rounded-[40px] px-6 py-2 text-[13px] font-medium"
        >
          Увійдіть до особистого кабінету
        </Button>
      </CardSection>

      <CardSection className="flex flex-col gap-3 px-7 py-6">
        <span className="text-neutral text-[13px]">
          Встановлюйте наші додатки
        </span>
        <div className="flex gap-6">
          <Button
            size="md"
            color="black"
            className="flex flex-1 rounded-[22px]"
          >
            <PlayStoreIcon />
          </Button>
          <Button
            size="md"
            color="black"
            className="flex flex-1 rounded-[22px]"
          >
            <AppleStoreIcon />
          </Button>
        </div>
      </CardSection>

      <CardSection className="flex flex-col gap-3 px-7 py-4">
        <span className="text-neutral text-[13px]">
          Ми в соціальних мережах
        </span>
        <SocialLinks items={socialMediaLinks} />
      </CardSection>

      <CardSection>
        <LinkGroup
          groups={footerGroups}
          className="flex flex-col gap-6 px-7 py-4 text-[13px]"
        />
        <div className="bw-t-thin flex gap-18 border-neutral-100 px-7 py-6 pb-10">
          <MastercardLogo />
          <VisaLogo />
        </div>
      </CardSection>
    </aside>
  );
}
