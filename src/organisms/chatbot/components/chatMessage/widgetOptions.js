import { arrayOf, objectOf, string, func } from 'prop-types';
import styled from 'styled-components';
import React from 'react';

import Button from '../../../../atoms/button';
import Row from '../../../../atoms/row';

const Wrapper = styled(Row)`
margin-top: .5rem;
flex-wrap: wrap;
`;

const Option = styled(Button)`
padding: .5rem;
margin: .25rem;
p {
  font-size: .875rem;
}
`;

const Options = ({ children, onClick }) => (
  <Wrapper>
    {
      children && children.map(({ label, value }, index) => (
        <Option key={`option-${value}-${index}`} onClick={() => onClick(value)}>{label}</Option>
      ))
    }
  </Wrapper>
);

Options.propTypes = {
  children: arrayOf(objectOf(string)).isRequired,
  onClick: func.isRequired,
};

export default Options;
