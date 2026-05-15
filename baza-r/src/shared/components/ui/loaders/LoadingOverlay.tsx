type Props = {
  show?: boolean;
};

const LoadingOverlay = ({ show }: Props) => {
  if (!show) return null;

  return (
    <div className="fixed top-(--top-offset) left-0 z-50 h-full w-full bg-white/60" />
  );
};

export default LoadingOverlay;
