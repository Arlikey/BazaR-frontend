import CustomLink from "@/shared/components/ui/CustomLink";
import IconWrapper from "@/shared/components/ui/IconWrapper";
import { HomeIcon } from "@/shared/components/icons/ui/HomeIcon";
import { FavoriteAlt3Icon } from "@/shared/components/icons/ui/FavouriteIcon";
import { UserAlt2Icon } from "@/shared/components/icons/ui/UserIcon";
import { AltCatalogIcon } from "@/shared/components/icons/ui/AltCatalogIcon";
import { useEffect, useState } from "react";

export function MobileBar() {
  const items = [
    {
      to: "/",
      label: "Головна",
      icon: HomeIcon,
    },
    {
      to: "/catalog",
      label: "Каталог",
      icon: AltCatalogIcon,
    },
    {
      to: "/account/wishlist",
      label: "Обране",
      icon: FavoriteAlt3Icon,
    },
    {
      to: "/account/profile",
      label: "Профіль",
      icon: UserAlt2Icon,
    },
  ];
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("#copyright");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 z-20 flex w-full rounded-t-xl bg-white p-2 shadow-[0_-4px_6px_rgba(0,0,0,0.1)] transition-transform duration-300 md:hidden ${hidden ? "translate-y-full" : "translate-y-0"}`}
    >
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <CustomLink
            key={item.to}
            to={item.to}
            variant="default"
            color="subtle"
            className="flex-1 flex-col items-center justify-center"
            activeClassName="text-accent!"
          >
            <IconWrapper className="h-6 w-6">
              <Icon />
            </IconWrapper>

            <span className="text-sm font-medium">{item.label}</span>
          </CustomLink>
        );
      })}
    </div>
  );
}

export default MobileBar;
