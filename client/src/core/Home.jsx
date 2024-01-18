import React from 'react'
import Header from '../components/Header/Header.jsx'
import heroSectionModel from "../../src/assets/img/hero-section-image.png";
import leftImage from "../../src/assets/img/left.png";
import SearchBar from '../components/SearchBar/SearchBar.jsx';
import "../../src/style.css";
import "../../src/assets/css/Home.css";

const Home = () => {
  const placeholder = "Learn Languages in fun";
  return (
    <div>
      <Header />
      <div className="container-fluid mb-5">
          <div className="position-absolute left-0 " style={{ zIndex: "-1" }}>
            <img className="w-75 h-25" src={leftImage} alt="background" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 align-self-center">
                <h1 className="pb-3 ps-4 roboto-family">
                Language Learning Game
                  
                </h1>
                <p className="ps-4 mt-3 hero-para-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                  condimentum, ex a gravida varius, nisl neque
                  <br /> posuere est, sed .
                </p>
                <div className="search-bar-container">
                  <SearchBar placeholder={placeholder} />
                </div>
              </div>
              <div className="col-lg-6 d-flex">
                <img
                  className="w-100 h-100 p-4 mx-auto"
                  src={heroSectionModel}
                  alt="hero-sec"
                />
              </div>
            </div>
          </div>
    </div>
    </div>
  )
}

export default Home