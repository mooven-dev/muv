// IMPORTS
import { objectOf, bool, string } from 'prop-types';
import styled from 'styled-components';
import React from 'react';

import { setColor, disabledStyle } from '../../utils';
import themeDefault from '../../theme';

// STYLES
const StyledInput = styled.input`
border: ${({ theme }) => theme.shape.border};
border-color: ${props => setColor(props, props.theme.color.overlay)};
border-radius: ${({ theme }) => theme.shape.radius};
transition: ${({ theme }) => theme.transition.time};
padding: ${({ theme }) => theme.shape.padding};
font-size: ${({ theme }) => theme.shape.base};
margin: ${({ theme }) => theme.shape.margin};
color: ${({ theme }) => theme.text.color};
position: relative;
width: 100%;
&:focus {
  border-color: ${props => setColor(props, props.theme.color.primary)};
  box-shadow: ${({ theme }) => theme.shape.shadow};
  outline: none;
}
&:not(:valid) {
  border-color: ${props => props.theme.color.warn};
}
&:disabled {
  ${disabledStyle}
}
`;

// COMPONENT
const Input = ({ error, ...props }) => (
  <StyledInput warn={error} {...props} />
);

// DOCUMENTATION
Input.propTypes = {
  /** receive theme props from Theme Provider or default */
  theme: objectOf(objectOf(string)),
  /** equals to type html atribute */
  type: string,
  /** prop to disables input */
  disabled: bool,
  /** prop to visualy show if input has error */
  error: bool,
  /** prop to visualy show if input is correctly filled */
  success: bool,
  /** same as html atribute, but giving a error feedback until filled */
  required: bool,
  /** receive placeholder props */
  placeholder: string,
};

Input.defaultProps = {
  placeholder: 'placeholder',
  theme: themeDefault,
  disabled: false,
  required: false,
  success: false,
  error: false,
  type: 'text',
};

// EXPORT
export default Input;
