import React, { useState } from "react";
import Cross from "../../core/components/icons/CrossIcon";
import Microphone from "../../core/components/icons/MicrophoneIcon";
import SearchIcon from "../../core/components/icons/SearchIcon";

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
        <button className="cursor-pointer h-full px-3">
          <Microphone />
        </button>
      </div>
      <div className="flex h-full items-center">
        <button className="bg-secondary hover:bg-hover-secondary flex h-full items-center rounded-r-[20px] px-4 py-2.5">
          <span className="capitalize">знайти</span>
        </button>
      </div>
    </div>
  );
};

export default Search;
