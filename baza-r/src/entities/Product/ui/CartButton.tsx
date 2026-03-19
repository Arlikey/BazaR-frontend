import { Button } from "../../../shared/components/ui/Button";
import IconWrapper from "../../../shared/components/ui/IconWrapper";
import { CartIcon } from "../../../shared/components/icons/ui/CartIcon";

type Props = { productId: string };

export function CartButton({ productId }: Props) {
  return (
    <Button color="subtle" className="h-10 w-10" rounded="md">
      <IconWrapper size={24}>
        <CartIcon />
      </IconWrapper>
    </Button>
  );
}
