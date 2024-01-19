import React from "react";
import "../../../src/style.css";

function Footer() {
  return (
    <>
      {/* footer for the dashboard */}
      <nav className="position-fixed bottom-0 bg-white w-100 z-3">
        <div className="container-fluid">
          <p>
            <a style={{ textDecoration: "none" }}>
              &copy; LearnLangTeam | 2024
            </a>
          </p>
        </div>
      </nav>
    </>
  );
}

export default Footer;
