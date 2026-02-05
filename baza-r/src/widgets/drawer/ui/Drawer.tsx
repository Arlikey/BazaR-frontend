import * as Accordion from "@radix-ui/react-accordion";

import CardSection from "../../../shared/components/ui/CardSection";
import SocialLinks from "../../../shared/components/ui/SocialLinks";
import { footerGroups, socialMediaLinks } from "../../../shared/config/links";
import Button from "../../../shared/components/ui/Button";
import PlayStoreIcon from "../../../shared/components/icons/apps/PlayStoreIcon";
import AppleStoreIcon from "../../../shared/components/icons/apps/AppleStoreIcon";
import CustomLink from "../../../shared/components/ui/CustomLink";
import IconWrapper from "../../../shared/components/ui/IconWrapper";
import { LinkGroup } from "../../link-groups/LinkGroup";
import { LinksGroupAccordionItem } from "../../link-groups/LinkGroupAccordion";
import {
  AltCartIcon,
  AltCatalogIcon,
  CrossIcon,
  TelephoneIcon,
  UserIcon,
} from "../../../shared/components/icons/ui";
import { Modal } from "../../../shared/components/ui/modal/Modal";
import ArrowRightIcon from "../../../shared/components/icons/ui/ArrowRightIcon";
import AltQuestionIcon from "../../../shared/components/icons/ui/AltQuestionIcon";
import { useUiStore } from "../../../shared/model/ui.store";

const Drawer = () => {
  const openAuth = useUiStore((s) => s.openAuth);
  const closeDrawer = useUiStore((s) => s.closeDrawer);

  const help = footerGroups[0];
  const company = footerGroups[1];
  const services = footerGroups[2];
  const partners = footerGroups[3];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="bg-brand flex h-50 flex-col justify-between px-6 pt-7 pb-9">
          <Modal.Close className="self-end">
            <Button shape="icon" className="h-9 w-9">
              <IconWrapper size={16} className="text-inverse">
                <CrossIcon />
              </IconWrapper>
            </Button>
          </Modal.Close>
          <div className="flex items-center gap-6 pl-2">
            <IconWrapper size={45} className="text-inverse">
              <UserIcon />
            </IconWrapper>
            <div className="flex flex-col gap-0.5">
              <div className="flex gap-3">
                <Button
                  className="text-inverse hover:text-accent text-xl"
                  onClick={() => {
                    closeDrawer();
                    openAuth();
                  }}
                >
                  <span>Вхід</span>
                </Button>
                <div className="border-inverse h-5.5 border-r"></div>
                <Button
                  className="text-inverse hover:text-accent text-xl"
                  onClick={() => {
                    closeDrawer();
                    openAuth("register");
                  }}
                >
                  <span>Реєстрація</span>
                </Button>
              </div>
              <div>
                <span className="text-muted text-base">
                  Авторизуйтесь для отримання розширених можливостей
                </span>
              </div>
            </div>
          </div>
        </div>
        <Button
          className="border-premium w-full border-5 text-start"
          color="premium"
        >
          <div className="hover:bg-premium-hover flex h-full w-full items-center justify-between rounded-lg pt-1 pr-8 pb-2 pl-7">
            <div className="font-medium">
              <h3 className="text-xl uppercase">premium</h3>
              <span className="text-sm">Безкоштовна доставка весь рік</span>
            </div>
            <IconWrapper>
              <ArrowRightIcon />
            </IconWrapper>
          </div>
        </Button>
      </div>

      <div className="flex flex-col gap-2.5 px-6 pb-36">
        <CardSection className="flex flex-col px-5 py-3">
          {[
            { icon: AltCatalogIcon, label: "Каталог товарів" },
            { icon: AltCartIcon, label: "Кошик" },
            { icon: AltQuestionIcon, label: "Довідковий центр" },
            { icon: TelephoneIcon, label: "+38 044 222 11 00" },
          ].map(({ icon: Icon, label }) => (
            <CustomLink
              key={label}
              to={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
              target="_blank"
              variant="menu"
              className="flex flex-1 gap-4 py-3"
            >
              <IconWrapper className="flex h-5 w-5 items-center justify-center">
                <Icon />
              </IconWrapper>
              <span className="text-base">{label}</span>
            </CustomLink>
          ))}
        </CardSection>

        <CardSection className="text-md flex flex-col gap-4 px-7 py-6">
          <LinkGroup group={company} />
        </CardSection>

        <CardSection className="text-md flex flex-col gap-4 px-7 py-6">
          <LinkGroup group={help} />
        </CardSection>
        <Accordion.Root type="multiple" className="flex flex-col gap-2.5">
          <CardSection className="text-md flex flex-col gap-4 px-7 py-6">
            <LinksGroupAccordionItem group={services} value="services" />
          </CardSection>

          <CardSection className="text-md flex flex-col gap-4 px-7 py-6">
            <LinksGroupAccordionItem group={partners} value="partners" />
          </CardSection>
        </Accordion.Root>

        <CardSection className="flex flex-col gap-4 px-7 py-6">
          <span className="text-md font-medium">Встановлюйте наші додатки</span>
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
        </CardSection>

        <CardSection className="flex flex-col gap-4 px-7 py-4">
          <span className="text-md font-medium">Ми в соціальних мережах</span>
          <SocialLinks items={socialMediaLinks} />
        </CardSection>
      </div>
    </div>
  );
};

export default Drawer;
