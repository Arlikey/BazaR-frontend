import { Button } from "../../../shared/components/ui/Button";
import IconWrapper from "../../../shared/components/ui/IconWrapper";
import { CompareIcon } from "../../../shared/components/icons/ui/CompareIcon";

export function CompareButton() {
  return (
    <Button color="subtle" size="icon" className="bg-white/65" rounded="md">
      <IconWrapper size={24}>
        <CompareIcon />
      </IconWrapper>
    </Button>
  );
}
