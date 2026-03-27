import { CrossIcon } from "../../../shared/components/icons/ui/CrossIcon";
import { MicrophoneIcon } from "../../../shared/components/icons/ui/MicrophoneIcon";
import { SearchIcon } from "../../../shared/components/icons/ui/SearchIcon";
import { Button } from "../../../shared/components/ui/Button";
import IconWrapper from "../../../shared/components/ui/IconWrapper";
import { uiText } from "../../../shared/config/ui-text";

type Props = {
  query: string;
  setQuery: (v: string) => void;
  onFocus: () => void;
  onSubmit: () => void;
};

export default function SearchInput({
  query,
  setQuery,
  onFocus,
  onSubmit,
}: Props) {
  return (
    <>
      <div className="text-muted ml-5 flex items-center">
        <SearchIcon />
      </div>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={onFocus}
        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
        className="text-muted ml-3 h-full flex-1 pr-4 outline-0"
        type="text"
        placeholder={uiText.search.placeholder}
      />

      {query && (
        <Button
          color="default"
          className="text-muted hover:text-accent h-full p-3"
          onClick={() => setQuery("")}
        >
          <IconWrapper size={12}>
            <CrossIcon />
          </IconWrapper>
        </Button>
      )}

      <div className="h-5 border-r border-neutral-100" />

      <Button
        color="default"
        className="hover:text-accent h-full px-4 text-black md:flex"
        aria-label="Голосовий пошук"
      >
        <IconWrapper>
          <MicrophoneIcon />
        </IconWrapper>
      </Button>
    </>
  );
}
