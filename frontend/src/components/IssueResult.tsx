import React from "react";
import { SearchResult } from "./Search";
import "./Search.css";

interface IssueResultProps {
  result: SearchResult;
}

const IssueResult: React.FC<IssueResultProps> = ({ result }) => {
  return (
    <div className="result-box-text">
      <p className="name">
        <span><strong>Created by:</strong> {result?.user?.login}</span>
        <p className="visibilitybox">{result?.state}</p>
      </p>
      <p className="name">
        <span><strong>Title: </strong> {result?.title}</span>
      </p>
      <p className="Description">
        <a href={result?.html_url} target="_blank" rel="noopener noreferrer">
          View more
        </a>
      </p>
    </div>
  );
};

export default IssueResult;
