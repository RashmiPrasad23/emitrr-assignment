import React, { useEffect } from "react";
import Appbar from "../components/Appbar/Appbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";
import styled from "styled-components";

// creating styled css for setting base for dashboard
const MainPanel = styled.div`
  background: rgba(203, 203, 210, 0.15);
  position: relative;
  float: right;
  width: calc(100% - 260px);
  min-height: 100%;
  overflow: auto;
  max-height: 100%;
  height: 100%;
`;
const Wrapper = styled.div`
  position: relative;
  top: 0;
  height: 100vh;
`;

const Base = ({ title = "Learn Language Game", children }) => {
  useEffect(() => {
    document.title = title;
  }, []);

  return (
    // wrapping all the components in dashboard
    <Wrapper>
      {/* Admin nav bar */}
      <Sidebar />
      <MainPanel>
        <Appbar />
        <div className="p-3 bg-white m-3 rounded">{children}</div>
        <Footer />
      </MainPanel>
    </Wrapper>
  );
};

export default Base;
