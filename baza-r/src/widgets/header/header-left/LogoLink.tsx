import { LogoIcon } from "@/shared/components/icons/ui/LogoIcon";
import CustomLink from "@/shared/components/ui/CustomLink";

export function LogoLink() {
  return (
    <div className="ml-20 hidden xl:flex 2xl:ml-24">
      <CustomLink to={"/"} variant="default" aria-label="Повернутись на головну сторінку">
        <LogoIcon />
      </CustomLink>
    </div>
  );
}
