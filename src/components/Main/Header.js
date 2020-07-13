import React,{useState} from "react";
import "./Header.css";
import { FaSearch } from "react-icons/fa";
import {Link} from 'react-router-dom';

// header component
const Header = () => {

  const [enteredText, setEnteredText] = useState('');
  // enteredText represents what the user typed the search bar

  const textChangeHandler = event => {
    setEnteredText(event.target.value);
  }

  return (
    <header className="header">
      <div className="search-bar">
      <form className = "form" onSubmit = {event => event.preventDefault}>
        <Link to="/">
          <div className="title">Link</div>
         {/* To be replaced by logo */}
        </Link>
        <div className="search-box">
            <input
              type="text"
              className="search-input"
              placeholder="Search for games"
              onChange = {textChangeHandler}
            />
            <Link to ={{pathname:"/search",search:`phrase=${enteredText}`}} style={{ backgroundImage: "none" }}>
              <button type="submit" className="search-button">
                <FaSearch />
              </button>
            </Link>
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;
