// IMPORTS
import { node, objectOf, string, func, bool } from 'prop-types';
import styled from 'styled-components';
import React from 'react';

import { setColor, disabledStyle } from '../../utils';
import themeDefault from '../../theme';

// STYLES
const setBackground = ({ theme, ...rest }) => setColor({ theme, ...rest }, theme.color.primary);

const setTextColor = ({ outline, theme, ...rest }) => {
  if (outline) return setColor({ theme, ...rest }, theme.color.primary); // do not pass outline
  return theme.color.white;
};

const setBordColor = ({ outline, theme, ...rest }) => {
  if (outline) return setColor({ theme, ...rest }, theme.color.primary); // do not pass outline
  return null;
};

const commonStyles = ({ disabled, theme, ...rest }) => (`
border: ${theme.shape.border}; /* keep this line first */
border-color: ${setBordColor({ theme, ...rest })};
background: ${setBackground({ theme, ...rest })};
color: ${setTextColor({ theme, ...rest })};
border-radius: ${theme.shape.radius};
transition: ${theme.transition.time};
box-shadow: ${theme.shape.shadow};
padding: ${theme.shape.padding};
margin: ${theme.shape.margin};
text-decoration: none;
display: inline-block;
text-align: center;
font-weight: 600;
cursor: pointer;
line-height: 1;
outline: none;
width: 100%;
${disabled ? disabledStyle : ''}
&:disabled {
  ${disabledStyle}
}
&:hover, &:focus {
  box-shadow: none;
}
`);

const StyledButton = styled.button`
${props => commonStyles(props)}
`;

StyledButton.defaultProps = {
  theme: themeDefault,
};

const StyledA = styled.a`
${props => commonStyles(props)}
`;

StyledA.defaultProps = {
  theme: themeDefault,
};

// COMPONENT
const Button = (props) => {
  const { href, onClick } = props;
  if (onClick) return <StyledButton {...props} />;
  if (href) return <StyledA {...props} />;
  return null;
};

// DOCUMENTATION
Button.propTypes = {
  /** accepts only valid react nodes as children */
  children: node,
  /** receive theme props from Theme Provider or default */
  theme: objectOf(objectOf(string)).isRequired,
  /** accepts only functions (if passed, will render a button tag) */
  onClick: func,
  /** accepts only string paths (if passed, will render a anchor tag) */
  href: string,
  /** sets style to match secondary theme color */
  secondary: bool,
  /** disables the element actions and changes its styles */
  disabled: bool,
  /** sets background to transparent and adds a border */
  outline: bool,
};

Button.defaultProps = {
  children: 'default',
  secondary: false,
  disabled: false,
  outline: false,
  onClick: null,
  href: null,
};

// EXPORT
export default Button;
