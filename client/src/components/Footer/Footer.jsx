import React from 'react'
import "../../../src/style.css"

function Footer() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-light">
        <div className="container-fluid">
          {/* <a className="navbar-brand" href="#">Navbar</a> */}
          <div className="collapse navbar-collapse container" id="navbarSupportedContent">
            <form className="d-flex">
              <p>&copy;
               <a style={{ textDecoration: "none" }}>
                LearnLangTeam,2024
               </a>
              </p>
            </form>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Footer