import React from "react";
import "./Search.css";

// UserResult component
interface SearchResult {
  login: string;
  avatar_url?: string;
  html_url?: string;
}
interface UserResultProps {
  result: SearchResult;
}

const UserResult: React.FC<UserResultProps> = ({ result }) => {
  return (
    <div>
      <img src={result.avatar_url} alt="Profile" />
      <div className="result-box-text">
        <p className="name">Name: {result.login}</p>
        <p className="Description">Location: NA</p>
        <a className="btnBox mt-20" href={result.html_url} target="_blank" rel="noopener noreferrer">
          View Profile
        </a>
      </div>
    </div>
  );
};

export default UserResult;
