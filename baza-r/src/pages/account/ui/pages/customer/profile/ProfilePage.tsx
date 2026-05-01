import * as Accordion from "@radix-ui/react-accordion";
import { useLogout } from "@/features/auth/model/auth.mutations";
import { Button } from "@/shared/components/ui/Button";
import { ProfileAccordionItem } from "./ProfileAccordionItem";
import Block from "@/shared/components/ui/Block";
import { profileSections, socialLinks } from "../../../../model/profile.config";
import { SocialLinkButton } from "./SocialLinkButton";

export function ProfilePage() {
  const logout = useLogout();

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-medium">Особисті дані</h1>

      <Accordion.Root type="multiple" className="mt-4 flex flex-col gap-3">
        {profileSections.map(
          ({ value, icon: Icon, title, content: Content }) => (
            <Block key={value}>
              <ProfileAccordionItem value={value} icon={<Icon />} title={title}>
                <div className="px-10">
                  <Content />
                </div>
              </ProfileAccordionItem>
            </Block>
          ),
        )}
      </Accordion.Root>

      <div className="mt-8 flex flex-col gap-5">
        <p className="text-muted text-base font-medium">
          Зв'яжіть обліковий запис з обліковими записами соцмереж і заходьте на
          сайт, як користувач Facebook або Google
        </p>
        <div className="flex gap-7">
          {socialLinks.map(({ value, icon, label }) => (
            <SocialLinkButton key={value} icon={icon} label={label} />
          ))}
        </div>
      </div>

      <div className="mt-9 flex items-start justify-between text-lg font-medium">
        <div className="flex flex-col items-start gap-7">
          <Button variant="link" color="link">
            Змінити пароль
          </Button>
          <Button
            variant="link"
            color="link"
            onClick={() => logout.mutate(undefined)}
          >
            Вихід
          </Button>
        </div>
        <Button variant="link" color="link">
          Видалити акаунт
        </Button>
      </div>
    </div>
  );
}
