// IMPORTS
import styled from 'styled-components';
import { node } from 'prop-types';
import React from 'react';

import themeDefault from '../../theme';

// STYLES
const StyledLoader = styled.p`
color: ${({ theme }) => theme.color.primary};
`;

// THEME DEFAULT
StyledLoader.defaultProps = {
  theme: themeDefault,
};

// COMPONENT
const Loader = props => (
  <StyledLoader {...props} />
);

// DOCUMENTATION
Loader.propTypes = {
  /** accepts only valid react nodes as children */
  children: node,
};

Loader.defaultProps = {
  children: '...',
};

// EXPORT
export default Loader;
