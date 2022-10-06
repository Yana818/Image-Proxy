import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import SettingSlider from "../atoms/Slider";
import ImgSize from "../atoms/ImgSize";
import Selector from "../atoms/Selector";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const EditContainer = styled.div`
  margin: 175px auto 130px;
  max-width: 80%;
  width: 1160px;
  position: relative;
`;
const EditHint = styled.div`
  height: 60px;
  left: -65px;
  top: -55px;
  position: absolute;
  width: 150px;
  color: red;
`;
const Fram = styled.div`
  width: 100%;
  height: 70%;
`;

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
`;

const Tab = styled.div.attrs(() => {})`
  width: 108px;
  height: 108px;
  line-height: 108px;
  margin: 5px 0;
  cursor: pointer;
  border: 1px solid white;
  background-color: ${(props) => (props.showSetting ? "#49a8d4" : "")};
  z-index: 5;
  &:hover {
    background-color: #96dbfa;
  }
`;

const Setting = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  background-color: #ffffff00;
`;

const URLs = styled.div`
  margin-top: 10px;
  width: 100%;
  height: calc(30% - 10px);
  display: flex;
`;

const OriginURL = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  margin-right: 5px;
`;

const OriginURLText = styled.p`
  color: white;
`;

const ImgproxyURL = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
`;

const URLContainer = styled.textarea`
  height: 136px;
  border: 1px solid black;
`;

const Main = () => {
  const [showResizeSetting, setShowResizeSetting] = useState(true);
  const [showFilterSetting, setShowFilterSetting] = useState(false);

  const changeShowSetting = (chooseSetiing) => {
    switch (chooseSetiing) {
      case "resize":
        setShowResizeSetting(true);
        setShowFilterSetting(false);
        break;
      case "filter":
        setShowResizeSetting(false);
        setShowFilterSetting(true);
        break;
      default:
        setShowResizeSetting(true);
        setShowFilterSetting(false);
        break;
    }
  };

  const targetRef = useRef();
  const [defaultSize, setDefaultSize] = useState({ width:0, height: 0});
  const [widthSize, setWidthSize] = useState(0);
  const [heightSize, setHeightSize] = useState(0);
  const [resizeValue, setResizeValue] = useState({ value: 'fit', label: 'Fit' });
  const [blurValue, setBlurValue] = useState(0);

  useEffect(() => {
    if (targetRef.current) {
      setDefaultSize({
        width:targetRef.current.offsetWidth,
        height:targetRef.current.offsetHeight
      })
    }
  }, []);

  useEffect(() => {
    setWidthSize(defaultSize.width)
    setHeightSize(defaultSize.height)
  }, [defaultSize]);

  return (
    <Wrapper>
      <EditContainer>
        <EditHint>Drag the corner to resize me</EditHint>
        <Fram ref={targetRef}>
          <ImgSize 
            defaultValue={defaultSize}
            widthSize={widthSize} 
            heightSize={heightSize} 
            setWidthSize={setWidthSize} 
            setHeightSize={setHeightSize}
          />
        </Fram>
        <SettingTabs>
          <Tab
            showSetting={showResizeSetting}
            onClick={() => {
              changeShowSetting("resize");
            }}
          >
            Resize
          </Tab>
          <Tab
            showSetting={showFilterSetting}
            onClick={() => {
              changeShowSetting("filter");
            }}
          >
            Filter
          </Tab>
          {showResizeSetting &&           
            <Setting>
              <SettingSlider 
                title={'Width'} 
                defaultValue={defaultSize.width} 
                value={widthSize} setSlider={setWidthSize} 
              />
              <SettingSlider 
                title={'Height'} 
                defaultValue={defaultSize.height} 
                value={heightSize} 
                setSlider={setHeightSize}
              />
              <Selector value={resizeValue} setSelector={setResizeValue}/>
            </Setting>
          }
          {showFilterSetting &&           
            <Setting>
              <SettingSlider 
                defaultIsMin 
                title={'Blur'} 
                defaultValue={0} 
                maxValue={10} 
                value={blurValue} 
                setSlider={setBlurValue} 
              />
            </Setting>
          }
        </SettingTabs>
        <URLs>
          <OriginURL>
            <OriginURLText>Original image</OriginURLText>
            <URLContainer></URLContainer>
          </OriginURL>
          <ImgproxyURL>
            <OriginURLText>imgproxy URL</OriginURLText>
            <URLContainer></URLContainer>
          </ImgproxyURL>
        </URLs>
      </EditContainer>
    </Wrapper>
  );
};

export default Main;
