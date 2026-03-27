import { useMe } from "../../../entities/user/queries";
import { UserAltIcon } from "../../../shared/components/icons/ui/UserIcon";
import IconWrapper from "../../../shared/components/ui/IconWrapper";
import { tv, type VariantProps } from "tailwind-variants";

const userCard = tv({
  slots: {
    root: "flex items-center gap-3 group transition",
    icon: "",
    name: "truncate font-medium text-accent",
    email: "truncate text-muted",
  },
  variants: {
    size: {
      sm: {
        root: "px-2 py-3",
        name: "text-base",
        email: "text-sm",
      },
      md: {
        root: "px-3 py-4",
        name: "text-[17px]",
        email: "text-base",
      },
      lg: {
        root: "gap-4",
        icon: "w-12",
        name: "text-xl",
        email: "text-base",
      },
    },
    inverted: {
      true: {
        name: "text-white group-hover:text-accent ",
        email: "text-neutral-200",
        icon: "text-white",
      },
    },
  },
  defaultVariants: {
    size: "md",
    inverted: false,
  },
});

type Props = VariantProps<typeof userCard> & {
  className?: string;
};

export function AccountUserCard({ className, size, inverted }: Props) {
  const { data: user } = useMe();
  if (!user) return null;

  const s = userCard({ size, inverted });

  return (
    <div className={s.root({ className })}>
      <IconWrapper className={s.icon()}>
        <UserAltIcon />
      </IconWrapper>
      <div className="flex min-w-0 flex-col">
        <span className={s.name()}>
          {user.firstName} {user.lastName}
        </span>
        <span className={s.email()}>{user.email}</span>
      </div>
    </div>
  );
}
