import React, { useState } from "react";
import Button from "../../shared/components/ui/Button";
import {
  CrossIcon,
  MicrophoneIcon,
  SearchIcon,
} from "../../shared/components/icons/ui";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-surface flex h-10 flex-1 items-center justify-between rounded-[20px]">
      <div className="flex h-full flex-1 items-center">
        <div className="text-muted ml-5">
          <SearchIcon />
        </div>
        <input
          className="text-muted ml-3 h-full flex-1 pr-4 outline-0"
          type="text"
          placeholder="Я шукаю..."
        />
        {searchQuery && (
          <div className="mr-3">
            <CrossIcon />
          </div>
        )}
        <Button
          variant="ghost"
          color="subtle"
          className="hidden h-full px-3 md:flex"
          aria-label="Voice search"
        >
          <MicrophoneIcon />
        </Button>
      </div>
      <div className="hidden h-full items-center md:flex">
        <Button
          color="secondary"
          className="h-full rounded-r-[20px] px-4 font-normal"
        >
          <span className="capitalize">знайти</span>
        </Button>
      </div>
    </div>
  );
};

export default Search;
