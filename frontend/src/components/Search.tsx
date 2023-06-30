import React, { useState, ChangeEvent, useEffect } from "react";
import debounce from "lodash/debounce";
import "./Search.css";
import SearchHeader from "./SearchHeader";
import SearchResults from "./SearchResults";
import SearchBox from "./SearchBox";

export interface SearchResult {
  id: string;
  name: string;
  login: string;
  author?: string;
  stars?: number;
  avatar_url?: string;
  location?: string;
  html_url?: string;
  owner?: any;
  visibility?: string;
  stargazers_count?: number;
  created_at?: string;
  updated_at?: string;
  state?: string;
  description?: string;
  user?: any;
  title?:string;
}

const Search: React.FC = () => {
  const [searchType, setSearchType] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [inputError, setInputError] = useState<boolean>(false);
  const fetchUrl = process.env.REACT_APP_API_URL;

  const searchWithDebounce = debounce(() => {
    if (searchText.length >= 2) {
      fetchResults();
    } else {
      setSearchResults([]);
    }
  }, 2000);

  const fetchResults = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${fetchUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: searchType, text: searchText }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data, 'test', data.items.length)
        if (data && data.items.length > 0){
          setError("");
          setSearchResults(data.items);
        }else{
          setError("No results found");
        }
      } else {
        const data = await response.json();
        setError(data.error_message);
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred while fetching search results");
    }

    setIsLoading(false);
  };

  const handleSearchTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newSearchType = event.target.value;
    setSearchType(newSearchType);

    if (newSearchType && searchText.length === 0) {
      setInputError(true);
      setSearchResults([]);
      setError("");
    } else if (searchText.length >= 3) {
      fetchResults();
    } else {
      setSearchResults([]);
      setError("");
    }
  };

  const handleSearchTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;
    setSearchText(searchText);

    if (searchText.length < 3) {
      setInputError(true);
      setSearchResults([]);
      setError("");
    } else {
      setInputError(false);
      searchWithDebounce();
    }
  };

  useEffect(() => {
    if (searchText.length >= 3) {
      fetchResults();
    }
  }, [searchType]);

  return (
    <div className="search-container">
      <SearchHeader />
      {isLoading && <p className="Loading">Loading...</p>}
      <SearchBox
        searchType={searchType}
        searchText={searchText}
        handleSearchTypeChange={handleSearchTypeChange}
        handleSearchTextChange={handleSearchTextChange}
        inputError={inputError}
      />
      {searchResults.length > 0 &&  !error && (
        <SearchResults searchType={searchType} searchResults={searchResults} />
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Search;
