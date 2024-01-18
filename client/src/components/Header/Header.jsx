import React from 'react'
import { Link } from "react-router-dom";
import CustomBtn from "../Button/CustomBtn.jsx";
import logo from "../../assets/svg/react.svg"

function Header() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white mx-auto"
      style={{ padding: "3% 6%" }}
    >
      <div className="container-fluid ">
        <Link to="/" className="">
          <img src={logo} height="60" alt="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <div className="d-flex">
            <CustomBtn value="Signup" to="/signup" />
          </div>
          <div className="d-flex">
            <CustomBtn value="Login" to="/login" />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header