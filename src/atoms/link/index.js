// IMPORTS
import { node, objectOf, string, func, bool } from 'prop-types';
import styled from 'styled-components';
import React from 'react';

import { setColor, disabledStyle } from '../../utils';
import themeDefault from '../../theme';

// STYLES
const setTextColor = ({ theme, ...rest }) => setColor({ theme, ...rest }, theme.color.primary);

const commomStyles = ({ disabled, theme, strong, ...rest }) => (`
color: ${setTextColor({ theme, ...rest })};
font-weight: ${(strong ? 'bold' : 'inherit')};
text-decoration: underline;
display: inline-block;
cursor: pointer;
line-height: 1;
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

const StyledButton = styled.button`
${props => commomStyles(props)}
`;

// COMPONENT
const Link = (props) => {
  const { href, onClick } = props;
  if (href) return <StyledA {...props} />;
  if (onClick) return <StyledButton {...props} />;
  return null;
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
  /** receive theme props from Theme Provider or default */
  theme: objectOf(objectOf(string)),
};

Link.defaultProps = {
  children: 'default',
  theme: themeDefault,
  disabled: false,
  onClick: null,
  strong: false,
  href: null,
};

// EXPORT
export default Link;