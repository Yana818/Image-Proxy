import React, { useState, useEffect} from 'react';
import Slider from 'rc-slider';
import styled from 'styled-components';
import 'rc-slider/assets/index.css';

const SliderWrapper = styled.div`
  width: 170px;
  margin-bottom: 35px;
  z-index: 5;
`;

const tilteConfig = {
  width: 'Width',
  height: 'Height',
  blur: 'Blur',
};

const SettingSlider = (props) => {
  const {
    defaultIsMin,
    title,
    defaultValue,
    maxValue,
    query,
    value,
    setQuery,
  } = props;

  const [currentValue, setCurrentVlaue] = useState(value);

  useEffect(() => {
    setCurrentVlaue(defaultValue);
  }, [defaultValue]);

  const changeSlideValue = (type, e) => {
    setQuery({ ...query, [type]: e });
  };

  return (
    <SliderWrapper>
      <p>
        {tilteConfig[title]}: {value}
      </p>
      {defaultIsMin ? (
        <Slider
          min={defaultValue}
          max={maxValue}
          onChange={(e) => setCurrentVlaue(e)}
          onAfterChange={() => changeSlideValue(title, currentValue)}
          defaultValue={value}
          value={value}
        />
      ) : (
        <Slider
          min={0}
          max={defaultValue}
          onChange={(e) => setCurrentVlaue(e)}
          onAfterChange={() => changeSlideValue(title, currentValue)}
          defaultValue={value}
          value={value}
        />
      )}
    </SliderWrapper>
  );
};

export default SettingSlider;
