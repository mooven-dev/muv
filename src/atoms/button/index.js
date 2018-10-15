// IMPORTS
import { string, bool } from 'prop-types';
import styled from 'styled-components';
import React from 'react';

// STYLES
const StyledButton = styled.button`
font-size: 20px;
`;

// COMPONENT
const Button = props => (
  <StyledButton {...props} />
);

// DOCUMENTATION
Button.propTypes = {
  children: string, // texto dentro da parada
  color: string,
  strong: bool,
};

Button.defaultProps = {
  children: 'Default text',
  color: 'tomato',
  strong: false,
};

// EXPORT
export default Button;
