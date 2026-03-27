import type { InputHTMLAttributes, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import IconWrapper from "./IconWrapper";
import { ErrorIcon } from "../icons/ui/ErrorIcon";

const inputField = tv({
  slots: {
    wrapper: "bg-surface bw-thin flex items-center border-neutral-100 relative",
    input:
      "text-foreground-muted autofill:bg-accent placeholder:text-foreground-muted h-full flex-1 text-sm font-medium rounded-[inherit] outline-none bg-transparent ",
    iconLeft: "ml-4 mr-2 flex items-center",
    iconRight: "ml-2 mr-3 flex items-center",
    error: "mt-1 pl-4 text-[11px] font-medium text-error",
  },
  variants: {
    size: {
      sm: { wrapper: "h-9" },
      md: { wrapper: "h-10" },
      lg: { wrapper: "h-12" },
    },
    rounded: {
      sm: { wrapper: "rounded-[16px]" },
      md: { wrapper: "rounded-[20px]" },
    },
    state: {
      default: {},
      error: { wrapper: "border-error" },
      success: { wrapper: "border-accent" },
      disabled: { wrapper: "opacity-60" },
    },
  },
  defaultVariants: {
    size: "md",
    rounded: "md",
    state: "default",
  },
});

type InputFieldVariants = VariantProps<typeof inputField>;

type Props = {
  className?: string;
  containerClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  error?: string | boolean;
  success?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  ariaLabel?: string;
} & InputFieldVariants &
  Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "size">;

const join = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export default function InputField({
  className,
  containerClassName,
  inputClassName,
  errorClassName,
  error,
  success,
  leftIcon,
  rightIcon,
  ariaLabel,
  size,
  disabled,
  id,
  placeholder,
  ...rest
}: Props) {
  const state = disabled
    ? "disabled"
    : error
      ? "error"
      : success
        ? "success"
        : "default";
  const s = inputField({ size, state });

  const errorId = typeof error === "string" && id ? `${id}-error` : undefined;

  const inputPadding = join(
    leftIcon ? "pl-0" : "pl-4",
    rightIcon ? "pr-0" : "pr-4",
  );

  const rightCount = Number(Boolean(rightIcon)) + Number(Boolean(error));
  const pr = rightCount === 0 ? "pr-4" : rightCount === 1 ? "pr-10" : "pr-20";

  return (
    <div className={className}>
      <div className={s.wrapper({ className: containerClassName })}>
        {leftIcon ? <span className={s.iconLeft()}>{leftIcon}</span> : null}

        <input
          id={id}
          className={join(s.input(), inputPadding, inputClassName, pr)}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={errorId}
          aria-label={ariaLabel ?? placeholder ?? "Input"}
          placeholder={placeholder}
          disabled={disabled}
          {...rest}
        />

        <div className="pointer-events-none absolute right-0 flex items-center justify-center">
          {rightIcon ? (
            <span className={s.iconRight()}>{rightIcon}</span>
          ) : null}
          {error && (
            <IconWrapper className="text-error pr-4">
              <ErrorIcon />
            </IconWrapper>
          )}
        </div>
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
