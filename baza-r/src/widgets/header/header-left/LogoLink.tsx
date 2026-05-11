import {
  LongLogoIcon,
  ShortLogoIcon,
} from "@/shared/components/icons/ui/LogoIcon";
import CustomLink from "@/shared/components/ui/CustomLink";
import { useMediaQuery } from "react-responsive";

export function LogoLink() {
  const isMobile = useMediaQuery({ maxWidth: 1279 });

  return (
    <div className="ml-4 flex xl:ml-24">
      <CustomLink
        to={"/"}
        variant="default"
        aria-label="Повернутись на головну сторінку"
      >
        {isMobile ? <ShortLogoIcon /> : <LongLogoIcon />}
      </CustomLink>
    </div>
  );
}
