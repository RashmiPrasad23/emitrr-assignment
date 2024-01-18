import React, { useEffect } from 'react'
import Appbar from '../components/Appbar/Appbar';
import Sidebar from '../components/Sidebar/Sidebar';
import Footer from '../components/Footer/Footer';
import styled from 'styled-components'

const MainPanel = styled.div`
  background: rgba(203,203,210,.15);
  position: relative;
  float: right;
  width: calc(100% - 260px);
  min-height: 100%;
  overflow: auto;
  max-height: 100%;
  height: 100%;
`
const Wrapper = styled.div`
  position: relative;
  top: 0;  
  height: 100vh;
`

const Base = ({ title="Learn Language Game", children }) => {
    useEffect(() => {
      document.title = title;
    }, [])

    
  return ( 
      <Wrapper>
      {/* Admin nav bar */}
      <Sidebar />
      <MainPanel>
        <Appbar />
        <div className="px-4">{children}</div>
        <Footer />
      </MainPanel>

    </Wrapper>
  )
}

export default Base