import { Button } from "../../../shared/components/ui/Button";
import IconWrapper from "../../../shared/components/ui/IconWrapper";
import { FavouriteAlt3Icon } from "../../../shared/components/icons/ui/FavouriteIcon";

type Props = { productId: string };

export function FavouriteButton({ productId }: Props) {
  return (
    <Button color="subtle" className="h-10 w-10" rounded="md">
      <IconWrapper size={24}>
        <FavouriteAlt3Icon />
      </IconWrapper>
    </Button>
  );
}
