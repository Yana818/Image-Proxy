import React from 'react';
import styled from 'styled-components'

const Head = styled.div`
height: 128px;
padding: 0 40px;
display: flex;
width: 100%;
box-sizing: border-box;
position: fixed;
top: 0;
left: 0;
z-index: 5;
justify-content: space-between;
align-items: center;
`

const Logo = styled.p`
height: 85px;
width: 85px;
position: relatice;
top: 12px;
background-color: white;
`

const Header = () => {
  return (
    <Head>
      <Logo>Logo</Logo>
    </Head>
  )
}

export default Header;