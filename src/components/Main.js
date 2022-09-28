import React from 'react';
import styled from 'styled-components'

const Wrapper = styled.div`
height: 100vh;
width: 100vw;
display: flex;
justify-content: center;
`

const EditContainer = styled.div`
margin: 175px auto 130px;
max-width: 80%;
width: 1160px;
background-color: gray;
position: relative;

`
const EditHint = styled.div`
height: 60px;
left: -65px;
top: -55px;
position: absolute;
width: 150px;
color: red;
`
const Fram = styled.div`
width: 100%;
height: 70%;
background-color: aqua;
`

const SettingTabs = styled.div`
width: calc(100% - 60px);
height: 70%;
display: flex;
flex-direction: column;
position: absolute;
left: 0px;
top: 0px;
justify-content: center;
margin: 0 30px;
`

const Tab = styled.div.attrs(() => {})`
width: 108px;
height: 108px;
margin: 5px 0; 
cursor: pointer;
background-color: darksalmon;
&:hover {
  background-color: red;
}
`

const Setting = styled.div`
width: 100%;
height: 100%;
position: absolute;
background-color: lightpink;
`

const URLs = styled.div`
margin-top: 10px;
width: 100%;
height: calc(30% - 10px);
display: flex;
background-color: orange;
`

const OriginURL = styled.div`
width: 35%;
display: flex;
flex-direction: column;
margin-right: 5px;
`

const ImgproxyURL = styled.div`
width: 65%;
display: flex;
flex-direction: column;
`

const URLContainer = styled.textarea`
height: 136px;
border: 1px solid black;
`

const Main = () => {
  // const [ showSetting, setShowSetting] = useState('')

  // const settingConfig = [
  // ]
  return (
    <Wrapper>
      <EditContainer>
        <EditHint>
          Drag the corner to resize me
        </EditHint>
        <Fram>image</Fram>
        <SettingTabs>
          <Tab></Tab>
          <Tab></Tab>
          <Setting></Setting>
          <Setting></Setting>
        </SettingTabs>
        <URLs>
          <OriginURL>
            <p>Original image</p>
            <URLContainer></URLContainer>
          </OriginURL>
          <ImgproxyURL>
            <p>imgproxy URL</p>
            <URLContainer></URLContainer>
          </ImgproxyURL>
        </URLs>
      </EditContainer>
      
    </Wrapper>
  )
}

export default Main;