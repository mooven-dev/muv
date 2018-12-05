// IMPORTS
import styled from 'styled-components';
import { node } from 'prop-types';
import React from 'react';

import themeDefault from '../../theme';

// STYLES
const StyledCounter = styled.p`
color: ${({ theme }) => theme.color.primary};
`;

// THEME DEFAULT
StyledCounter.defaultProps = {
  theme: themeDefault,
};

// COMPONENT
const Counter = props => (
  <StyledCounter {...props} />
);

// DOCUMENTATION
Counter.propTypes = {
  /** accepts only valid react nodes as children */
  children: node,
};

Counter.defaultProps = {
  children: 'default',
};

// EXPORT
export default Counter;
