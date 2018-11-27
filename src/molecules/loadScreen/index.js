// IMPORTS
import styled from 'styled-components';
import { node } from 'prop-types';
import React from 'react';

import Overlay from '../../atoms/overlay';
import Loader from '../../atoms/loader';
import themeDefault from '../../theme';

// STYLES
const StyledLoadScreen = styled.p`
color: ${({ theme }) => theme.color.primary};
`;

// THEME DEFAULT
StyledLoadScreen.defaultProps = {
  theme: themeDefault,
};

// COMPONENT
const LoadScreen = props => (
  <Overlay visible {...props}>
    <Loader />
  </Overlay>
);

// DOCUMENTATION
LoadScreen.propTypes = {
  /** accepts only valid react nodes as children */
  children: node,
};

LoadScreen.defaultProps = {
  children: 'default',
};

// EXPORT
export default LoadScreen;
