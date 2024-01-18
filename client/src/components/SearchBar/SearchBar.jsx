import React from "react";
import { FaSearch } from "react-icons/fa";
//import "../../assets/css/SearchBar.css"

const SearchBar = ({ placeholder }) => {
  return (
    <div className="input-wrapper">
      <input
        className=" ps-4 py-3 mt-3 ms-4 "
        type="text"
        placeholder={placeholder}
      />
      <span className="searchbar-icon px-4 py-3">
        <FaSearch id="search-icon" />
      </span>
    </div>
  );
};

export default SearchBar;
