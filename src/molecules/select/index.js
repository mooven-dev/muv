// IMPORTS
import { node, objectOf, string } from 'prop-types';
import styled from 'styled-components';
import React from 'react';

import themeDefault from '../../theme';

// STYLES
const StyledSelect = styled.p`
color: ${({ theme }) => theme.color.primary};
`;

// COMPONENT
const Select = props => (
  <StyledSelect {...props} />
);

// DOCUMENTATION
Select.propTypes = {
  /** accepts only valid react nodes as children */
  children: node,
  /** receive theme props from Theme Provider or default */
  theme: objectOf(objectOf(string)),
};

Select.defaultProps = {
  children: 'default',
  theme: themeDefault,
};

// EXPORT
export default Select;
