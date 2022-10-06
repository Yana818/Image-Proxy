import React from "react";
import Select from "react-select";
import styled from "styled-components";

const SelectWrapper = styled.div`
  width: 170px;
  z-index: 5;
`;

const Selector = (props) => {
  const { setSelector, value } = props;

  const options = [
    { value: 'fit', label: 'Fit' },
    { value: 'fill', label: 'Fill' },
  ];

  return (
    <SelectWrapper>
      <Select
        options={options}
        value={value}
        onChange={(e) => setSelector(e)}
      />
    </SelectWrapper>
      
  );
};

export default Selector;
