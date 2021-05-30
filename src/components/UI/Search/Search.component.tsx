import * as React from "react";

interface ISearchComponentProps {
  onSearch: (value: string) => void;
}

export const SearchComponent = React.memo<ISearchComponentProps>(
  ({ onSearch }) => {
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearch(e.target.value);
    };
    return (
      <input type="search" onChange={handleSearchChange} placeholder="Search" />
    );
  }
);
