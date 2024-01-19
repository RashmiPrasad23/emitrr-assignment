import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/img/emittr_logo.jpg";
import { GlobalContext } from "../../context/GlobalContext";
import apiClient from "../../apiClient/apiClient";
import { toast } from "react-toastify";

// sidebar for dashboard

//styled components for styling
const SideBar = styled.div`
  overflow: auto;
  max-height: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 260px;
  display: block;
  z-index: 1;
  color: #fff;
  font-weight: 200;
  background-size: cover;
  background-position: center center;
`;

const SidebarWrapper = styled.div`
  position: relative;
  max-height: calc(100vh - 75px);
  min-height: 100%;
  overflow: auto;
  width: 260px;
  z-index: 4;
  padding-bottom: 100px;
  background-color: #0b60b0;
`;
const Logo = styled.img`
  max-height: 50px;
  display: block;
  margin: auto;
  margin-top: 20px;
  padding: 3px 2rem;
  color: white;
  background-color: white;
`;
const NavLinks = styled.a`
  display: flex;
  margin: 10px 15px;
  border-radius: 4px;
  border: none;
  padding: 10px 15px;
  color: white;
  background: transparent;
  &:hover {
    background: rgba(255, 255, 255, 0.23);
    opacity: 0.9;
    color: white;
  }
  & > li {
    display: none;
  }
`;
const NavLinkText = styled.p`
  margin: auto 10px;
  color: white;
  font-weight: 400;
`;

function Sidebar() {
  const { authUser, setAuthUser } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    //
    let { data } = await apiClient.post(`/users/logout`);
    if (data.success) {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      toast.success(data.message);
      navigate("/");
      setAuthUser({});
    }
  };
  return (
    <SideBar>
      <SidebarWrapper>
        <div className="logo ">
          <a href="/">
            <img src={logo} alt="logo" width={180} />
          </a>
        </div>
        <ul className="nav d-block mt-5">
          <li className="nav-item mb-4">
            <NavLink className="nav-link" to="/profile">
              <FontAwesomeIcon
                icon="fa-solid fa-address-card"
                fixedWidth
                pull="left"
                className="my-auto fs-4 text-white"
              />
              <NavLinkText>PROFILE</NavLinkText>
            </NavLink>
          </li>
          {/* settings page */}
          <li className="nav-item mb-4">
            <NavLink className="nav-link" to="/settings">
              <FontAwesomeIcon
                icon="fa-solid fa-gear"
                fixedWidth
                pull="left"
                className="my-auto fs-4 text-white"
              />
              <NavLinkText>SETTINGS</NavLinkText>
            </NavLink>
          </li>
          <li className="nav-item mb-4">
            <NavLink className="nav-link" to="/leaderboard">
              <FontAwesomeIcon
                icon="fa-solid fa-ranking-star"
                fixedWidth
                pull="left"
                className="my-auto fs-4 text-white"
              />
              <NavLinkText>LEADERBOARD</NavLinkText>
            </NavLink>
          </li>
          <li className="nav-item mb-4">
            <NavLink className="nav-link" to="/start">
              <FontAwesomeIcon
                icon="fa-solid fa-code"
                fixedWidth
                pull="left"
                className="my-auto fs-4 text-white"
              />
              <NavLinkText>START TEST</NavLinkText>
            </NavLink>
          </li>
          <li className="nav-item mb-4 position-absolute bottom-0">
            <a
              className="nav-link d-flex"
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon
                icon="fa-solid fa-right-from-bracket"
                fixedWidth
                pull="left"
                className="my-auto fs-4 text-white"
              />
              <NavLinkText>LOGOUT</NavLinkText>
            </a>
          </li>
        </ul>
      </SidebarWrapper>
    </SideBar>
  );
}

export default Sidebar;
