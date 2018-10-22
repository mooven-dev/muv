// IMPORTS
import { string, bool } from 'prop-types';
import styled from 'styled-components';
import React from 'react';

// STYLES
const StyledText = styled.p`
font-weight: ${({ strong }) => (strong ? 'bold' : 'inherit')};
color: ${({ color }) => color};
font-family: sans-serif;
font-size: 20px;
`;

// COMPONENT
const Text = props => (
  <StyledText {...props} />
);

// DOCUMENTATION
Text.propTypes = {
  /** accepts only text as children */
  children: string,
  /** sets color of the text as the color prop */
  color: string,
  /** sets font-weight as bold */
  strong: bool,
};

Text.defaultProps = {
  children: 'default text',
  color: '#0082c8',
  strong: false,
};

// EXPORT
export default Text;
