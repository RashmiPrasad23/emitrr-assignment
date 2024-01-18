import React from 'react'
import defaultImage from "../../assets/img/default-avatar.png"

function Appbar() {
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <span></span>
          <span className="navbar-text">
            <img
              src={defaultImage}
              alt=""
              srcSet=""
              className="border border-dark rounded-circle"
              width="30"
              height="30"
            />
          </span>
        </div>
      </nav>
    </div>
  )
}

export default Appbar