import { Button } from "../../shared/components/ui/Button";
import Block from "../../shared/components/ui/Block";
import CustomLink from "../../shared/components/ui/CustomLink";
import SocialLinks from "../../shared/components/ui/SocialLinks";
import { footerGroups, socialMediaLinks } from "../../shared/config/links";
import { uiText } from "../../shared/config/ui-text";
import { useUiStore } from "../../shared/model/ui.store";
import { useCatalogCategories } from "../catalog/model/useCategories";
import CatalogMenu from "../catalog/ui/CatalogMenu";
import { LinkGroup } from "../link-groups/LinkGroup";
import { QuestionIcon } from "../../shared/components/icons/ui/QuestionIcon";
import { PlayStoreIcon } from "../../shared/components/icons/apps/PlayStoreIcon";
import { AppleStoreIcon } from "../../shared/components/icons/apps/AppleStoreIcon";
import { MastercardLogo } from "../../shared/components/icons/payments/MastercardLogo";
import { VisaLogo } from "../../shared/components/icons/payments/VisaLogo";

export function Sidebar() {
  const openAuth = useUiStore((s) => s.openAuth);
  const { roots, isLoading } = useCatalogCategories();

  return (
    <aside className="flex w-81.25 flex-col gap-4">
      <CatalogMenu categories={roots} isLoading={isLoading} />

      <Block className="flex items-center gap-2 px-6 py-1">
        <CustomLink to={""} variant="menu" className="flex flex-1">
          <span className="flex h-6.25 w-6.25 items-center justify-center">
            <QuestionIcon />
          </span>
          <span className="text-sm">{uiText.sidebar.helpCenter}</span>
        </CustomLink>
      </Block>

      <Block className="flex flex-col items-center justify-center px-6 py-9 text-center">
        <h3 className="text-xl">{uiText.sidebar.welcomeTitle}</h3>
        <p className="text-md mt-2 w-60">{uiText.sidebar.welcomeDescription}</p>
        <Button
          color="secondary"
          size="md"
          className="text-md mt-3 rounded-[40px] px-6 py-2 font-medium"
          onClick={() => openAuth()}
        >
          {uiText.sidebar.loginToCabinet}
        </Button>
      </Block>

      <Block className="flex flex-col gap-3 px-7 py-6">
        <span className="text-muted text-md">{uiText.sidebar.installApps}</span>
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
      </Block>

      <Block className="flex flex-col gap-3 px-7 py-4">
        <span className="text-muted text-md">{uiText.sidebar.social}</span>
        <SocialLinks items={socialMediaLinks} />
      </Block>

      <Block>
        {footerGroups.map((group) => (
          <LinkGroup
            key={group.title}
            group={group}
            className="text-md flex flex-col px-7 py-4"
          />
        ))}
        <div className="bw-t-thin flex gap-18 border-neutral-100 px-7 py-6 pb-10">
          <MastercardLogo />
          <VisaLogo />
        </div>
      </Block>
    </aside>
  );
}
