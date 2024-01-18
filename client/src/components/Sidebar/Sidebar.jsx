
import React from 'react'
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/svg/react.svg"

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
  background-color:#ffd058;
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
`;


function Sidebar() {
  return (
    <SideBar>
        <SidebarWrapper>
         <div className="logo ">
            <a href="/">
           <img src={logo} alt="logo" />
           
           </a>
         </div>
            <ul className='nav d-block mt-5'>
                <li className=" mb-4" >
                   <NavLink className="nav-link"
                      to="">
                        <FontAwesomeIcon
                        icon="fa-solid fa-gauge "
                        fixedWidth
                        pull="left"
                        className="my-auto fs-4"
                        />
                      <NavLinkText>DASHBOARD</NavLinkText>
                   </NavLink>
                </li>
                <li className="nav-item mb-4">
                    <NavLink className="nav-link"
                    to="">
                    <FontAwesomeIcon
                    icon="fa-solid fa-pencil"
                    fixedWidth
                    pull="left"
                    className="my-auto fs-4"
                    />
                    <NavLinkText>EDIT PROFILE</NavLinkText>
                    </NavLink >
                </li>
                <li className="nav-item mb-4">
                   <NavLink className="nav-link"
                   to="">
                     <FontAwesomeIcon
                    icon="fa-solid fa-pencil"
                    fixedWidth
                    pull="left"
                    className="my-auto fs-4"
                    />
                    <NavLinkText>VIEW RESULTS</NavLinkText>
                   </NavLink>
                </li>
                <li className="nav-item mb-4">
                   <NavLink className="nav-link"
                   to="">
                     <FontAwesomeIcon
                    icon="fa-solid fa-pencil"
                    fixedWidth
                    pull="left"
                    className="my-auto fs-4"
                    />
                    <NavLinkText>SUPER ADMIN</NavLinkText>
                   </NavLink>
                </li>
            </ul>
        </SidebarWrapper>
    </SideBar>
  )
}

export default Sidebar