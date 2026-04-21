import { useNavigate } from "react-router";
import {
  FavoriteAlt3Icon,
  FavoriteAltIcon,
  FavoriteIcon,
} from "../../../shared/components/icons/ui/FavouriteIcon";
import { Button } from "../../../shared/components/ui/Button";
import IconWrapper from "../../../shared/components/ui/IconWrapper";
import { toast } from "../../../shared/components/ui/Toast";
import { useFavorites, useToggleFavorite } from "../../favourite/queries";

type Props = {
  productId: string;
  variant?: "card" | "page";
  className?: string;
};

export function FavoriteButton({
  productId,
  variant = "card",
  className,
}: Props) {
  const navigate = useNavigate();

  const { data: favorites = [] } = useFavorites();
  const { mutate, isPending } = useToggleFavorite();

  const isFav = favorites.some((p) => p.id === productId);

  const toastFavorite = () => {
    toast({
      id: "favorite-toast",
      title: (
        <div className="flex items-center gap-2">
          <IconWrapper size={18}>
            <FavoriteIcon />
          </IconWrapper>
          Товар додано до бажаного
        </div>
      ),
      button: {
        children: "Перейти",
        onClick: () => navigate("/account/wishlist"),
      },
    });
  };

  return (
    <Button
      aria-label={isFav ? "Видалити з улюбленного" : "Додати до улюбленного"}
      aria-pressed={isFav}
      color="subtle"
      size="icon"
      className={`bg-white/65 ${className}`}
      rounded="md"
      onClick={(e) => {
        e.preventDefault();

        if (isPending) return;

        const wasFav = isFav;

        mutate(productId, {
          onSuccess: () => {
            if (!wasFav) toastFavorite();
          },
        });
      }}
    >
      {variant === "card" ? (
        <IconWrapper size={24}>
          <FavoriteAlt3Icon filled={isFav} />
        </IconWrapper>
      ) : (
        <FavoriteAltIcon filled={isFav} />
      )}
    </Button>
  );
}
