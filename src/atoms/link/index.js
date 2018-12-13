// IMPORTS
import { node, string, func, bool } from 'prop-types';
import styled from 'styled-components';
import React from 'react';

import { setColor, disabledStyle } from '../../utils';
import themeDefault from '../../theme';

// STYLES
const setTextColor = ({ theme, ...rest }) => setColor({ theme, ...rest }, theme.color.primary);

const commomStyles = ({ disabled, theme, strong, noLine, ...rest }) => (`
all: unset;
text-decoration: ${noLine ? 'none' : 'underline'};
font-weight: ${(strong ? 'bold' : 'inherit')};
color: ${setTextColor({ theme, ...rest })};
background: transparent;
display: inline-block;
font-size: 1rem;
cursor: pointer;
line-height: 1;
outline: none;
padding: 0;
margin: 0;
border: 0;
${disabled ? disabledStyle : ''}
&:disabled {
  ${disabledStyle}
}
&:hover, &:focus {
  text-decoration: none;
}
`);

const StyledA = styled.a`
${props => commomStyles(props)}
`;

StyledA.defaultProps = {
  theme: themeDefault,
};

const StyledButton = styled.button`
${props => commomStyles(props)}
`;

StyledButton.defaultProps = {
  theme: themeDefault,
};

// COMPONENT
const Link = ({ href, onClick, ...props }) => {
  if (onClick) return <StyledButton onClick={onClick} {...props} />;
  if (href) return <StyledA href={href} {...props} />;
  return <StyledA href="#" {...props} />;
};

// DOCUMENTATION
Link.propTypes = {
  /** accepts only valid react nodes as children */
  children: node,
  /** accepts only string paths (if passed, will render a anchor tag) */
  href: string,
  /** accepts only functions (if passed, will render a button tag) */
  onClick: func,
  /** sets font-weight as bold */
  strong: bool,
  /** disables the element actions and changes its styles */
  disabled: bool,
  /** removes the underline */
  noLine: bool,

};

Link.defaultProps = {
  children: 'default',
  disabled: false,
  onClick: null,
  strong: false,
  noLine: false,
  href: null,
};

// EXPORT
export default Link;
