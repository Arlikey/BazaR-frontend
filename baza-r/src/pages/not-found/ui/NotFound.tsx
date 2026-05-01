import { NotFoundIcon } from "../../../shared/components/icons/ui/NotFoundIcon";
import CustomLink from "../../../shared/components/ui/CustomLink";
import IconWrapper from "../../../shared/components/ui/IconWrapper";
import { uiText } from "../../../shared/config/ui-text";

export const NotFound = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <h1 className="text-foreground-muted text-[32px] font-medium">
        {uiText.notFound.title}
      </h1>
      <IconWrapper className="mt-26">
        <NotFoundIcon />
      </IconWrapper>
      <CustomLink
        to={"/"}
        variant="default"
        color="secondary"
        className="mt-24 h-12 rounded-[30px] px-10 text-base font-medium"
      >
        <span>{uiText.notFound.backToHome}</span>
      </CustomLink>
    </div>
  );
};
