import { Link } from "react-router";
import NotFoundIcon from "../../../shared/components/icons/ui/NotFoundIcon";
import Button from "../../../shared/components/ui/Button";
import CustomLink from "../../../shared/components/ui/CustomLink";
import IconWrapper from "../../../shared/components/ui/IconWrapper";

export const NotFound = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <h1 className="text-foreground-muted text-[32px] font-medium">
        Ууупс! Сторінку не знайдено...
      </h1>
      <IconWrapper className="mt-26">
        <NotFoundIcon />
      </IconWrapper>
      <CustomLink
        to={"/"}
        variant="default"
        color="secondary"
        className="mt-24 h-12 rounded-[30px] px-10 text-base"
      >
        <span>Повернутись на головну</span>
      </CustomLink>
    </div>
  );
};
