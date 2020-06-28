import React from 'react';
import './Header.css';
import { FaSearch } from 'react-icons/fa';

const Header = () => {
    return(
        <header className="header">
        <div className="title">Link</div>
        <div className="search-bar">
          <input type="text" className="search-input"/>
          <button className="search-button"><FaSearch/></button>
        </div>

      </header>
    )
}

export default Header;