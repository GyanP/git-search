import React from "react";
import { SearchResult } from "./Search";
import "./Search.css";

// RepositoryResult component
interface RepositoryResultProps {
  result: SearchResult;
  createdAt: Date;
  updatedDate: Date;
  options: Intl.DateTimeFormatOptions;
}

const RepositoryResult: React.FC<RepositoryResultProps> = ({
  result,
  createdAt,
  updatedDate,
  options,
}) => {
  return (
    <div className="result-box-text">
      <p className="name">
      <span><strong>Name:</strong> {result?.name}</span>
        <span className="visibilitybox">{result.visibility}</span>
      </p>
      <p className="name DescriptionHead">
        <strong>Description:</strong>{" "}
        <span className="nameDes">{result.description}</span>
      </p>
      <p className="name">
      <strong>Created at:</strong>{" "}
        <span className="nameDes">
          {createdAt.toLocaleDateString("en-US", options) || result?.created_at}
        </span>
      </p>
      <p className="name">
      <strong>Author:</strong> <span className="nameDes">{result?.owner?.login}</span>
      </p>
      <p className="name">
        <strong>Updated on:</strong>{" "}
        <span className="nameDes">
          {updatedDate.toLocaleDateString("en-US", options) ||
            result?.updated_at}
        </span>
      </p>

      <p className="name"><strong>Star Count:</strong> <span>{result?.stargazers_count}</span></p>
      <p className="Description">
        <a
          href={result?.html_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          View more
        </a>
      </p>
    </div>
  );
};

export default RepositoryResult;
