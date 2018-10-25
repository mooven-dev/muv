// IMPORTS
import { node, objectOf, string, func, bool } from 'prop-types';
import styled from 'styled-components';
import React from 'react';

import themeDefault from '../../theme';

// STYLES
const setBackground = ({ theme, secondary, outline, warn }) => {
  if (outline) return theme.color.white; // these first !!!
  if (secondary) return theme.color.secondary;
  if (warn) return theme.color.warn;
  return theme.color.primary;
};

const setColor = ({ theme, outline, secondary, warn }) => {
  if (outline) {
    if (secondary) return theme.color.secondary;
    if (warn) return theme.color.warn;
    return theme.color.primary;
  }
  return theme.color.white;
};

const setBorder = ({ theme, secondary, warn }) => {
  if (secondary) return `${theme.shape.border}; border-color: ${theme.color.secondary}`;
  if (warn) return `${theme.shape.border}; border-color: ${theme.color.warn}`;
  return `${theme.shape.border}`;
};

const commonStyles = ({ theme, ...props }) => (`
background: ${setBackground({ theme, ...props })};
border: ${setBorder({ theme, ...props })};
color: ${setColor({ theme, ...props })};
border-radius: ${theme.shape.radius};
transition: ${theme.transition.time};
box-shadow: ${theme.shape.shadow};
padding: ${theme.shape.padding};
margin: ${theme.shape.margin};
text-decoration: none;
display: inline-block;
text-align: center;
cursor: pointer;
line-height: 1;
width: 100%;
&:hover, &:focus {
  box-shadow: none;
}
`);

const StyledButton = styled.button`
${props => commonStyles(props)}
`;

const StyledA = styled.a`
${props => commonStyles(props)}
`;

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
  theme: objectOf(objectOf(string)),
  /** accepts only functions (if passed, will render a button tag) */
  onClick: func,
  /** accepts only string paths (if passed, will render a anchor tag) */
  href: string,
  /** sets style to match secondary theme color */
  secondary: bool,
  /** sets background to transparent and adds a border */
  outline: bool,
};

Button.defaultProps = {
  children: 'default',
  theme: themeDefault,
  secondary: false,
  outline: false,
  onClick: null,
  href: null,
};

// EXPORT
export default Button;
