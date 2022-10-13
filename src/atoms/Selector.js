import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const SelectWrapper = styled.div`
  width: 170px;
  z-index: 5;
  color: black;
  align-self: flex-end;
`;

const Selector = (props) => {
  const { 
    query, 
    query: {
      resize: value
    }, 
    setQuery 
  } = props;

  const options = [
    { value: 'fit', label: 'Fit' },
    { value: 'fill', label: 'Fill' },
  ];

  return (
    <SelectWrapper>
      <Select
        options={options}
        value={value}
        onChange={(e) => setQuery({...query, resize: e})}
      />
    </SelectWrapper>
      
  );
};

export default Selector;
