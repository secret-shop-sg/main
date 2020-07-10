import React from "react";
import "./Header.css";
import { FaSearch } from "react-icons/fa";
import {Link} from 'react-router-dom';

// header component
const Header = () => {
  // TODO: change to form
  return (
    <header className="header">
      <div className="search-bar">
        <Link to="/">
          <div className="title">Link</div>
        </Link>
        <div className="search-box">
          <input
            type="text"
            className="search-input"
            placeholder="Search for games"
          />
          <button className="search-button">
            <Link to="/search">
              <FaSearch />
            </Link> 
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
