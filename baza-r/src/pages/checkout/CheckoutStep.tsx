type Props = { number: number; title: string };

export function CheckoutStep({ number, title }: Props) {
  return (
    <div className="flex items-center gap-4">
      <span className="bw-thin flex h-6 w-6 items-center justify-center rounded-full border-neutral-100 bg-white text-base">
        {number}
      </span>
      <h2 className="text-lg">{title}</h2>
    </div>
  );
}
