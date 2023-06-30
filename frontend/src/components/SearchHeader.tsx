import React from "react";
// @ts-ignore
import gitIcon from "../assets/images/gitlogo.png";
import "./Search.css";

// SearchHeader component
const SearchHeader: React.FC = () => {
  return (
    <div className="searchBoxHead">
      <div className="logo-img">
        <img
          src={gitIcon}
          alt="Logo"
        />
      </div>
      <div className="text-logo">
        <h3>Github Search....</h3>
        <p>Search User or response</p>
      </div>
    </div>
  );
};

export default SearchHeader;
