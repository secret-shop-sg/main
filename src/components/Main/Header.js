import React from "react";
import "./Header.css";
import { FaSearch } from "react-icons/fa";

// header component
const Header = () => {
  // TODO: change to form
  return (
    <header className="header">
      <div className="search-bar">
        <div className="title">Link</div>
        <div className="search-box">
          <input
            type="text"
            className="search-input"
            placeholder="Search for games"
          />
          <button className="search-button">
            <FaSearch />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
