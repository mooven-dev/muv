// IMPORTS
// import { objectOf, string } from 'prop-types';
import styled from 'styled-components';
import React from 'react';

import themeDefault from '../../theme';

// STYLES
const StyledDivider = styled.hr`
border: ${({ theme }) => theme.shape.border};
margin: ${({ theme }) => theme.shape.margin};
border-right: 0;
border-left: 0;
border-top: 0;
`;

StyledDivider.defaultProps = {
  theme: themeDefault,
};

// COMPONENT
const Divider = props => (
  <StyledDivider {...props} />
);

// DOCUMENTATION
Divider.propTypes = {};

Divider.defaultProps = {};

// EXPORT
export default Divider;
