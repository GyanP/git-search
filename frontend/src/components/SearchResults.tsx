import React from "react";
import IssueResult from "./IssueResult";
import RepositoryResult from "./RepositoryResult";
import { SearchResult } from "./Search";
import UserResult from "./UserResult";
import "./Search.css";

// SearchResults component
interface SearchResultsProps {
  searchType: string;
  searchResults: SearchResult[];
}

const SearchResults: React.FC<SearchResultsProps> = ({
  searchType,
  searchResults,
}) => {
  return (
    <div className="results-container">
      {searchResults.map((result) => {
        const updatedDate = new Date(result?.updated_at || "");
        const createdAt = new Date(result?.created_at || "");
        const options: Intl.DateTimeFormatOptions = {
          day: "numeric",
          month: "long",
          year: "numeric",
        };

        return (
          <div key={result.id} className="result-card">
            {searchType === "users" && <UserResult result={result} />}

            {searchType === "repositories" && (
              <RepositoryResult
                result={result}
                createdAt={createdAt}
                updatedDate={updatedDate}
                options={options}
              />
            )}

            {searchType === "issues" && <IssueResult result={result} />}
          </div>
        );
      })}
    </div>
  );
};

export default SearchResults;
