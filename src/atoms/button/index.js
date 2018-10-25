// IMPORTS
import { node, objectOf, string } from 'prop-types';
import styled from 'styled-components';
import React from 'react';

import themeDefault from '../../theme';

// STYLES
const StyledButton = styled.button`
border-radius: ${({ theme }) => theme.shape.radius};
background: ${({ theme }) => theme.color.secondary};
transition: ${({ theme }) => theme.transition.time};
box-shadow: ${({ theme }) => theme.shape.shadow};
padding: ${({ theme }) => theme.shape.padding};
margin: ${({ theme }) => theme.shape.margin};
border: ${({ theme }) => theme.shape.border};
color: ${({ theme }) => theme.color.white};
width: 100%;
&:hover, &:focus {
  box-shadow: none;
}
`;

// COMPONENT
const Button = props => (
  <StyledButton {...props} />
);

// DOCUMENTATION
Button.propTypes = {
  /** accepts only react valid nodes as children */
  children: node,
  /** receive theme props from Theme Provider or default */
  theme: objectOf(objectOf(string)),
};

Button.defaultProps = {
  children: 'default',
  theme: themeDefault,
};

// EXPORT
export default Button;
