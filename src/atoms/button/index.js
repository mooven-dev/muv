// IMPORTS
import { node, string, func, bool } from 'prop-types';
import styled from 'styled-components';
import React from 'react';

import { setColor, disabledStyle } from '../../utils';
import themeDefault from '../../theme';
import Text from '../text';

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

const commonStyles = ({ inset, disabled, theme, ...rest }) => (`
border: ${theme.shape.border}; /* keep this line first */
box-shadow: ${inset ? 'none' : theme.shape.shadow};
border-color: ${setBordColor({ theme, ...rest })};
background: ${setBackground({ theme, ...rest })};
color: ${setTextColor({ theme, ...rest })};
border-radius: ${theme.shape.radius};
transition: ${theme.transition.time};
padding: ${theme.shape.padding};
box-sizing: border-box;
text-decoration: none;
display: inline-block;
text-align: center;
font-weight: 600;
cursor: pointer;
line-height: 1;
outline: none;
width: 100%;
margin: 0;
${disabled ? disabledStyle : ''}
&:disabled {
  ${disabledStyle}
};
&:hover {
  box-shadow: none;
  filter: brightness(1.25);
};
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
const Button = ({ href, onClick, children, ...props }) => {
  const returnContent = content => (
    (typeof content === 'string')
      ? <Text align="center" white>{content}</Text>
      : content
  );
  if (onClick) return <StyledButton onClick={onClick} {...props}>{returnContent(children)}</StyledButton>;
  if (href) return <StyledA href={href} {...props}>{returnContent(children)}</StyledA>;
  return <Text error align="center">missing prop onClick or href</Text>;
};

// DOCUMENTATION
Button.propTypes = {
  /** accepts only valid react nodes as children */
  children: node,
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
  /** removes box-shadow */
  inset: bool,
};

Button.defaultProps = {
  children: 'default',
  secondary: false,
  disabled: false,
  outline: false,
  onClick: null,
  inset: false,
  href: null,
};

// EXPORT
export default Button;
