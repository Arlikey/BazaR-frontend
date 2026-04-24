import * as Accordion from "@radix-ui/react-accordion";

import Block from "../../../shared/components/ui/Block";
import SocialLinks from "../../../shared/components/ui/SocialLinks";
import { footerGroups, socialMediaLinks } from "../../../shared/config/links";
import { Button } from "../../../shared/components/ui/Button";

import CustomLink from "../../../shared/components/ui/CustomLink";
import IconWrapper from "../../../shared/components/ui/IconWrapper";
import { LinkGroup } from "../../link-groups/LinkGroup";
import { LinksGroupAccordionItem } from "../../link-groups/LinkGroupAccordion";

import { useUiStore } from "../../../shared/model/ui.store";
import { uiText } from "../../../shared/config/ui-text";
import { AltCatalogIcon } from "../../../shared/components/icons/ui/AltCatalogIcon";
import { AltCartIcon } from "../../../shared/components/icons/ui/AltCartIcon";
import { AltQuestionIcon } from "../../../shared/components/icons/ui/AltQuestionIcon";
import { TelephoneIcon } from "../../../shared/components/icons/ui/TelephoneIcon";
import { CrossIcon } from "../../../shared/components/icons/ui/CrossIcon";
import { UserIcon } from "../../../shared/components/icons/ui/UserIcon";
import { ArrowIcon } from "../../../shared/components/icons/ui/ArrowIcon";
import { PlayStoreIcon } from "../../../shared/components/icons/apps/PlayStoreIcon";
import { AppleStoreIcon } from "../../../shared/components/icons/apps/AppleStoreIcon";
import { useMe } from "../../../entities/user/queries";
import { AccountUserCard } from "../../../pages/account/ui/AccountUserCard";

const Drawer = () => {
  const { data: user } = useMe();

  const openAuth = useUiStore((s) => s.openAuth);
  const closeDrawer = useUiStore((s) => s.closeDrawer);
  const openMegamenu = useUiStore((s) => s.openMegamenu);
  const openCart = useUiStore((s) => s.openCart);

  const help = footerGroups[0];
  const company = footerGroups[1];
  const services = footerGroups[2];
  const partners = footerGroups[3];
  const drawerMenuItems = [
    {
      icon: AltCatalogIcon,
      label: uiText.drawer.menuItems[0].label,
      onClick: () => {
        closeDrawer();
        window.setTimeout(() => openMegamenu(), 200);
      },
    },
    {
      icon: AltCartIcon,
      label: uiText.drawer.menuItems[1].label,
      onClick: () => {
        closeDrawer();
        openCart();
      },
    },
    { icon: AltQuestionIcon, label: uiText.drawer.menuItems[2].label },
    { icon: TelephoneIcon, label: uiText.drawer.menuItems[3].label },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="bg-brand flex h-50 flex-col justify-between px-6 pt-7 pb-9">
          <Button
            rounded="sm"
            className="h-9 w-9 self-end"
            onClick={() => closeDrawer()}
          >
            <IconWrapper size={16} className="text-background">
              <CrossIcon />
            </IconWrapper>
          </Button>
          {user ? (
            <CustomLink to={"/account/profile"} variant="default">
              <AccountUserCard size="lg" inverted />
            </CustomLink>
          ) : (
            <div className="flex items-center gap-6 pl-2">
              <IconWrapper size={45} className="text-background">
                <UserIcon />
              </IconWrapper>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-3">
                  <Button
                    variant="link"
                    color="inverse"
                    textSize="xl"
                    onClick={() => {
                      closeDrawer();
                      openAuth();
                    }}
                  >
                    <span>{uiText.drawer.login}</span>
                  </Button>
                  <div className="border-background h-5.5 border-r"></div>
                  <Button
                    variant="link"
                    color="inverse"
                    textSize="xl"
                    onClick={() => {
                      closeDrawer();
                      openAuth("register");
                    }}
                  >
                    <span>{uiText.drawer.register}</span>
                  </Button>
                </div>
                <div>
                  <span className="text-muted text-base">
                    {uiText.drawer.authDescription}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        <Button
          fullWidth
          className="border-premium border-5 text-start"
          color="premium"
        >
          <div className="hover:bg-premium-hover flex h-full w-full items-center justify-between rounded-lg pt-1 pr-8 pb-2 pl-7">
            <div className="font-medium">
              <h3 className="text-xl uppercase">
                {uiText.drawer.premiumLabel}
              </h3>
              <span className="text-sm">
                {uiText.drawer.premiumDescription}
              </span>
            </div>
            <IconWrapper>
              <ArrowIcon />
            </IconWrapper>
          </div>
        </Button>
      </div>

      <div className="flex flex-col gap-2.5 px-6 pb-8">
        <Block className="flex flex-col px-5 py-3">
          {drawerMenuItems.map(({ icon: Icon, label, onClick }) => (
            <Button
              variant="link"
              color="default"
              rounded="md"
              key={label}
              className="flex flex-1 gap-4 py-3 px-3 justify-start font-normal hover:text-accent hover:underline hover:bg-accent/15"
              onClick={onClick}
            >
              <IconWrapper className="flex h-5 w-5 items-center justify-center">
                <Icon />
              </IconWrapper>
              <span className="text-base">{label}</span>
            </Button>
          ))}
        </Block>

        <Block className="text-md flex flex-col gap-4 px-7 py-6">
          <LinkGroup group={company} />
        </Block>

        <Block className="text-md flex flex-col gap-4 px-7 py-6">
          <LinkGroup group={help} />
        </Block>
        <Accordion.Root type="multiple" className="flex flex-col gap-2.5">
          <Block className="text-md flex flex-col">
            <LinksGroupAccordionItem group={services} value="services" />
          </Block>

          <Block className="text-md flex flex-col">
            <LinksGroupAccordionItem group={partners} value="partners" />
          </Block>
        </Accordion.Root>

        <Block className="flex flex-col gap-4 px-7 py-6">
          <span className="text-md font-medium">
            {uiText.drawer.installApps}
          </span>
          <div className="flex gap-12">
            <Button
              size="md"
              color="black"
              className="flex h-8 w-25 rounded-[22px]"
            >
              <PlayStoreIcon />
            </Button>
            <Button
              size="md"
              color="black"
              className="flex h-8 w-25 rounded-[22px]"
            >
              <AppleStoreIcon />
            </Button>
          </div>
        </Block>

        <Block className="flex flex-col gap-4 px-7 py-4">
          <span className="text-md font-medium">{uiText.drawer.social}</span>
          <SocialLinks items={socialMediaLinks} />
        </Block>
      </div>
    </div>
  );
};

export default Drawer;
