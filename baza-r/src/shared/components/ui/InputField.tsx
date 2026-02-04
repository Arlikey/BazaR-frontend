import type { InputHTMLAttributes, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const inputField = tv({
  slots: {
    wrapper:
      "bg-surface bw-thin flex items-center rounded-[20px] border-outline/50",
    input:
      "text-foreground placeholder:text-neutral-200 h-full flex-1 text-sm font-medium outline-none bg-transparent",
    iconLeft: "ml-4 mr-2 flex items-center",
    iconRight: "ml-2 mr-4 flex items-center",
    error: "mt-1 text-xs text-error",
  },
  variants: {
    size: {
      sm: { wrapper: "h-9" },
      md: { wrapper: "h-10" },
      lg: { wrapper: "h-12" },
    },
    state: {
      default: {},
      error: { wrapper: "border-error" },
      disabled: { wrapper: "opacity-60" },
    },
  },
  defaultVariants: {
    size: "md",
    state: "default",
  },
});

type InputFieldVariants = VariantProps<typeof inputField>;

type Props = {
  containerClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  error?: string | boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  ariaLabel?: string;
} & InputFieldVariants &
  Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "size">;

const join = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export default function InputField({
  containerClassName,
  inputClassName,
  errorClassName,
  error,
  leftIcon,
  rightIcon,
  ariaLabel,
  size,
  disabled,
  id,
  placeholder,
  ...rest
}: Props) {
  const state = disabled ? "disabled" : error ? "error" : "default";
  const s = inputField({ size, state });

  const errorId = typeof error === "string" && id ? `${id}-error` : undefined;

  const inputPadding = join(
    leftIcon ? "pl-0" : "pl-4",
    rightIcon ? "pr-0" : "pr-4",
  );

  return (
    <div>
      <div className={s.wrapper({ className: containerClassName })}>
        {leftIcon ? <span className={s.iconLeft()}>{leftIcon}</span> : null}

        <input
          id={id}
          className={join(s.input(), inputPadding, inputClassName)}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={errorId}
          aria-label={ariaLabel ?? placeholder ?? "Input"}
          placeholder={placeholder}
          disabled={disabled}
          {...rest}
        />

        {rightIcon ? <span className={s.iconRight()}>{rightIcon}</span> : null}
      </div>

      {typeof error === "string" ? (
        <p
          id={errorId ?? undefined}
          className={s.error({ className: errorClassName })}
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

