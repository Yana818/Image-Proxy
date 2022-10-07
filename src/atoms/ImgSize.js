import React, { useState, useEffect } from 'react';
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

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'solid 1px #ddd',
  background: '#666',
};

const ImgSize = (props) => {
  const { defaultValue, widthSize, heightSize, setWidthSize, setHeightSize } =
    props;
  const [width, setWidth] = useState(widthSize);
  const [height, setHeight] = useState(heightSize);

  useEffect(() => {
    setWidth(widthSize);
    setHeight(heightSize);
   },[widthSize, heightSize]);
  return (
    <ResizableWrapper>
      <Resizable
        style={style}
        size={{ width, height }}
        maxWidth={defaultValue.width}
        maxHeight={defaultValue.height}
        onResizeStop={(e, direction, ref, d) => {
          setWidthSize(widthSize + d.width);
          setHeightSize(heightSize + d.height);
        }}
      >
        Sample with size
      </Resizable>
    </ResizableWrapper>
  );
};

export default ImgSize;
