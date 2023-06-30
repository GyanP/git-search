import React, { ChangeEvent } from "react";
import "./Search.css";

// SearchBox component
interface SearchBoxProps {
  searchType: string;
  searchText: string;
  inputError: boolean;
  handleSearchTypeChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleSearchTextChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  searchType,
  searchText,
  inputError,
  handleSearchTypeChange,
  handleSearchTextChange,
}) => {
  return (
    <div className="search-box">
      <select value={searchType} onChange={handleSearchTypeChange}>
        <option value="">Select Entity Type</option>
        <option value="users">Users</option>
        <option value="repositories">Repositories</option>
        <option value="issues">Issues</option>
      </select>
      <div className="ErrorBox">
        <div>
          {inputError && (
            <p className="error-message">Please enter 3 or more characters.</p>
          )}
        </div>
        <input
          className={inputError ? "input-field danger" : "input-field"}
          type="text"
          value={searchText}
          onChange={handleSearchTextChange}
          placeholder="Start typing to search ..."
        />
      </div>
    </div>
  );
};

export default SearchBox;
