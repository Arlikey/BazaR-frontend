import { FavoriteAlt3Icon } from "../../../shared/components/icons/ui/FavouriteIcon";
import { Button } from "../../../shared/components/ui/Button";
import IconWrapper from "../../../shared/components/ui/IconWrapper";
import { useFavorites, useToggleFavorite } from "../../favourite/queries";

type Props = { productId: string };

export function FavoriteButton({ productId }: Props) {
  const { data: favorites = [] } = useFavorites();
  const { mutate, isPending } = useToggleFavorite();
  const isFav = favorites.some((p) => p.id === productId);

  return (
    <Button
      color="subtle"
      className="h-10 w-10 bg-transparent"
      rounded="md"
      disabled={isPending}
      onClick={(e) => {
        e.preventDefault();
        mutate(productId);
      }}
    >
      <IconWrapper size={24}>
        <FavoriteAlt3Icon filled={isFav} />
      </IconWrapper>
    </Button>
  );
}
