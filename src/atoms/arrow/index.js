// IMPORTS
import { node, objectOf, string, bool } from 'prop-types';
import styled from 'styled-components';
import React from 'react';

import themeDefault from '../../theme';
import Text from '../text';

// STYLES
const StyledArrow = styled(Text)`
transform: rotate(${({ up }) => (up ? '90deg' : '-90deg')});
transition: ${({ theme }) => theme.transition.time};
display: inline-block;
`;

StyledArrow.defaultProps = {
  theme: themeDefault,
  type: 'span',
};

// COMPONENT
const Arrow = props => (
  <StyledArrow {...props} />
);

// DOCUMENTATION
Arrow.propTypes = {
  /** accepts only valid react nodes as children */
  children: node,
  /** receive theme props from Theme Provider or default */
  theme: objectOf(objectOf(string)).isRequired,
  up: bool,
};

Arrow.defaultProps = {
  children: '◄',
  up: false,
};

// EXPORT
export default Arrow;
