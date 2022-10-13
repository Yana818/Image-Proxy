/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import SettingSlider from '../atoms/Slider';
import ImgSize from '../atoms/ImgSize';
import Selector from '../atoms/Selector';

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
  color: #c6cbde;
 `;
const Fram = styled.div`
  width: 100%;
  height: 70%;
`;

const SettingsContainer = styled.div`
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
  background-color: ${(props) => (props.showSetting ? '#49a8d4' : '')};
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
`;

const OriginURLText = styled.p`
  color: white;
  font-size: 18px;
`;

const ImgproxyURL = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
`;

const URLContainer = styled.textarea`
  height: 136px;
  border: 1px solid black;
  border-radius: 5px;
  font-size: 16px;
  padding: 15px;
  box-sizing: border-box;
`;

const CheckBtn = styled.button.attrs(() => {})`
  width: 50px;
  height: 50px;
  margin: auto 10px;
  cursor: ${(props) => (props.disabled ? '' : 'pointer')};
  background-color: #ffffff00;
  color: white;
  border-radius: 5px;
  &:hover {
    color: ${(props) => (props.disabled ? '' : 'black')};
    background-color: ${(props) => (props.disabled ? '' : '#96dbfa')};
  }
`;


const Main = () => {
  const [showResizeSetting, setShowResizeSetting] = useState(true);
  const [showFilterSetting, setShowFilterSetting] = useState(false);
  const targetRef = useRef();
  const [defaultSize, setDefaultSize] = useState({ width: 0, height: 0});
  const [currentUrl, setCurrentUrl] = useState('');
  const [fetchImg, setFetchImg] = useState(false);
  const [imgproxyUrl, setImgproxyUrl] = useState('');
  const [isloading, setIsloading] = useState(false);
  const [query, setQuery] = useState({
    url: '',
    width: 0,
    height: 0,
    resize: { value: 'fit', label: 'Fit' },
    blur: 0
  });

  const changeShowSetting = (chooseSetiing) => {
    switch (chooseSetiing) {
      case 'resize':
        setShowResizeSetting(true);
        setShowFilterSetting(false);
        break;
      case 'filter':
        setShowResizeSetting(false);
        setShowFilterSetting(true);
        break;
      default:
        setShowResizeSetting(true);
        setShowFilterSetting(false);
        break;
    }
  };



  const fetchImage = async () => {
    const { url, width, height, resize, blur } = query;
    const baseUrl = `https://imgproxy.sidesideeffect.io/api/image?url=${url}&width=${width}&height=${height}&resize=${resize.value}&blur=${blur}`;
    const timeoutid =(bool) =>  setTimeout(() => setIsloading(bool), 1000);
    setIsloading(true);
    try {
      const res = await fetch(baseUrl, {method: 'GET'});
      const data = await res.url;

      if (res.status !== 200){
        console.log('Undo');
        setImgproxyUrl('');
        setFetchImg(false);
      } else {
        console.log('Done!!');
        setImgproxyUrl(data);
        setFetchImg(true);
      }
      timeoutid(false);
    } catch (error) {
      console.log(`Error: ${error}`);
      setImgproxyUrl('');
      setFetchImg(false);
      timeoutid(false);
    }
    clearTimeout(timeoutid);
  };

  useEffect(() => {
    if (targetRef.current) {
      setDefaultSize({
        width:targetRef.current.offsetWidth,
        height:targetRef.current.offsetHeight
      });
    }
  }, []);

  useEffect(() => {
    setQuery({...query, 
      width: defaultSize.width,
      height: defaultSize.height
    });
  }, [defaultSize]);

  useEffect(() => {
    fetchImage();
  }, [query]);


  return (
    <Wrapper>
      <EditContainer>
        <EditHint>Drag the corner to resize me</EditHint>
        <Fram ref={targetRef}  onMouseUp={() => fetchImage()}>
          {/* {currentImage} */}
          <ImgSize 
            defaultValue={defaultSize}
            query={query}
            setQuery={setQuery}
            fetchImg={fetchImg}
            imgproxyUrl={imgproxyUrl}
            isloading={isloading}
          />
        </Fram>
        <SettingsContainer>
          <Tab
            showSetting={showResizeSetting}
            onClick={() => {
              changeShowSetting('resize');
            }}
          >
            Resize
          </Tab>
          <Tab
            showSetting={showFilterSetting}
            onClick={() => {
              changeShowSetting('filter');
            }}
          >
            Filter
          </Tab>
        </SettingsContainer>
        <SettingsContainer>
          {showResizeSetting &&   
              <Setting>
              <SettingSlider 
                title={'width'} 
                defaultValue={defaultSize.width} 
                query={query}
                value={query.width} 
                setQuery={setQuery} 
              />
              <SettingSlider  
                title={'height'} 
                defaultValue={defaultSize.height} 
                query={query}
                value={query.height} 
                setQuery={setQuery}
              />
              <Selector 
                query={query} 
                setQuery={setQuery} 
              />
            </Setting>
          }
          {showFilterSetting &&           
            <Setting>
              <SettingSlider 
                defaultIsMin 
                title={'blur'} 
                defaultValue={0} 
                maxValue={10} 
                query={query}
                value={query.blur} 
                setQuery={setQuery} 
              />
            </Setting>
          }
        </SettingsContainer>
        <URLs>
          <OriginURL>
            <OriginURLText>Original image</OriginURLText>
            <URLContainer
              onChange={(e) => setCurrentUrl(e.target.value)}
              value={currentUrl}
            >
            </URLContainer>
          </OriginURL>
            <CheckBtn 
              onClick={() => setQuery({...query, url: currentUrl})}
              disabled={query.url === currentUrl ? 'disabled' : ''}
            >
              Enter
            </CheckBtn>
          <ImgproxyURL>
            <OriginURLText>imgproxy URL</OriginURLText>
            <URLContainer
              value={imgproxyUrl}
            >
            </URLContainer>
          </ImgproxyURL>
        </URLs>
      </EditContainer>
    </Wrapper>
  );
};

export default Main;
