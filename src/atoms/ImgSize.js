import React from 'react';
import { Resizable } from 're-resizable';
import styled from 'styled-components';

const ResizableWrapper = styled.div`
  position: relative;
  user-select: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  flex-shrink: 0;
  z-index: 1;
`;

const Loading = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  background-color: black;
`;

const Img = styled.img.attrs(() => {})`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #666',
};

const ImgSize = (props) => {
  const {
    defaultValue,
    query,
    query: {
      url,
      width,
      height,
    },
    setQuery,
    fetchImg,
    imgproxyUrl,
    isloading,
  } = props;

  return (
    <ResizableWrapper>
      <Resizable
        style={style}
        size={{ width, height }}
        maxWidth={defaultValue.width}
        maxHeight={defaultValue.height}
        onResizeStop={(e, direction, ref, d) => {
          setQuery({
            ...query,
            width: width + d.width,
            height: height + d.height,
          });
        }}
      >
        {url !== '' && 
          isloading && 
          <Loading>
            Image is loading...
          </Loading>
        }
        {url !== '' ? (
          fetchImg ? (
            <Img
              src={`${imgproxyUrl}`}
              alt="123"
            />
          ) : (
            <p>Original image URL is not correct.</p>
          )
          ) : (
            <p>There is no image.</p> 
          )
        }
      </Resizable>
    </ResizableWrapper>
  );
};

export default ImgSize;
