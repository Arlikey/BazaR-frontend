import React, { useState } from "react";
import Cross from "../../core/components/icons/ui/CrossIcon";
import Microphone from "../../core/components/icons/ui/MicrophoneIcon";
import SearchIcon from "../../core/components/icons/ui/SearchIcon";
import Button from "../../core/components/ui/Button";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-on-light flex h-10 flex-1 items-center justify-between rounded-[20px]">
      <div className="flex h-full flex-1 items-center">
        <div className="ml-5">
          <SearchIcon />
        </div>
        <input
          className="text-neutral ml-3 flex-1 pr-4 outline-0"
          type="text"
          placeholder="Я шукаю..."
        />
        {searchQuery && (
          <div className="mr-3">
            <Cross />
          </div>
        )}
        <button className="h-full cursor-pointer px-3">
          <Microphone />
        </button>
      </div>
      <div className="flex h-full items-center">
        <Button color="secondary" className="font-normal h-full rounded-r-[20px] px-4">
          <span className="capitalize">знайти</span>
        </Button>
      </div>
    </div>
  );
};

export default Search;
