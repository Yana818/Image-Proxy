import React from 'react';
import styled from 'styled-components';

const Footerwrapper = styled.div`
position: fixed;
left: 0;
bottom: 0;
height: 80px;
width: 100vw;
background-color: gray;
z-index: 5;
display: flex;
justify-content: center;
align-items: center;
`;


const Footer = () => {
  return (
    <Footerwrapper>
      <div>Copyright © sidesideefect</div>
    </Footerwrapper>
  );
};

export default Footer;