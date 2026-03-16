type Props = {
  title: string;
  onBack: () => void;
  children: React.ReactNode;
};

export function FormPageLayout({ title, onBack, children }: Props) {
  return (
    <div className="">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800 text-base"
        >
          ← Назад
        </button>
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
}
