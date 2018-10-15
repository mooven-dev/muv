// IMPORTS
import { string, bool } from 'prop-types';
import styled from 'styled-components';
import React from 'react';

// STYLES
const StyledText = styled.p`
font-weight: ${({ strong }) => (strong ? 'bold' : 'inherit')};
color: ${({ color }) => color};
font-size: 20px;
`;

// COMPONENT
const Text = props => (
  <StyledText {...props} />
);

// DOCUMENTATION
Text.propTypes = {
  children: string,
  color: string,
  strong: bool,
};

Text.defaultProps = {
  children: 'Default text',
  color: 'tomato',
  strong: false,
};

// EXPORT
export default Text;
