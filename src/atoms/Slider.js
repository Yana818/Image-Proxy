import React, { useEffect } from "react";
import Slider from "rc-slider";
import styled from "styled-components";
import "rc-slider/assets/index.css";

const SliderWrapper = styled.div`
  width: 170px;
  margin-bottom: 35px;
  z-index: 5;
`;

const SettingSlider = (props) => {
  const { defaultIsMin, title, defaultValue, maxValue, value, setSlider } = props;
  useEffect(() => {
    setSlider(value);
  }, [defaultValue, setSlider, value]);

  return (
    <SliderWrapper>
      <p>{`${title}: ${value}`}</p>
      {defaultIsMin ? (
        <Slider
          min={defaultValue}
          max={maxValue}
          onChange={(e) => setSlider(e)}
          defaultValue={defaultValue}
          value={value}
        />
      ) : (
        <Slider
          min={0}
          max={defaultValue}
          onChange={(e) => setSlider(e)}
          defaultValue={defaultValue}
          value={value}
        />
      )}
    </SliderWrapper>
  );
};

export default SettingSlider;
