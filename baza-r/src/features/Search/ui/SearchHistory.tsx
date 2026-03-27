import { SearchIcon } from "../../../shared/components/icons/ui/SearchIcon";
import CustomLink from "../../../shared/components/ui/CustomLink";
import IconWrapper from "../../../shared/components/ui/IconWrapper";

type Props = {
  history: string[];
  onClear: () => void;
  onSelect: (query: string) => void;
};

export function SearchHistory({ history, onClear, onSelect }: Props) {
  if (history.length === 0) return null;

  return (
    <div className="flex flex-col px-5.5 py-2">
      <div className="flex items-center justify-between">
        <span className="text-sm">Історія пошуку</span>
        <button
          onClick={onClear}
          className="text-accent hover:text-accent-hover text-base"
        >
          Очистити список
        </button>
      </div>
      {history.map((item) => (
        <CustomLink
          key={item}
          to={`/search?q=${encodeURIComponent(item)}`}
          onClick={() => onSelect(item)}
          className="hover:text-accent flex items-center gap-4 py-2 text-left text-base underline-offset-3 transition hover:underline"
        >
          <IconWrapper className="text-muted" size={14}>
            <SearchIcon />
          </IconWrapper>
          <span>{item}</span>
        </CustomLink>
      ))}
    </div>
  );
}
