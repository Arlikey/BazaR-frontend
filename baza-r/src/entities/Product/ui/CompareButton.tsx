import { Button } from "../../../shared/components/ui/Button";
import IconWrapper from "../../../shared/components/ui/IconWrapper";
import { CompareIcon } from "../../../shared/components/icons/ui/CompareIcon";

type Props = { productId: string };

export function CompareButton({ productId }: Props) {
  return (
    <Button color="subtle" className="h-10 w-10" rounded="md">
      <IconWrapper size={24}>
        <CompareIcon />
      </IconWrapper>
    </Button>
  );
}
