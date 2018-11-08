// IMPORTS
import { objectOf, bool, string } from 'prop-types';
import styled from 'styled-components';
import React from 'react';

import { inputStyle } from '../../utils';
import themeDefault from '../../theme';

// STYLES
const StyledInput = styled.input`
${props => inputStyle(props)}

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
  /** receive placeholder props */
  placeholder: string,
};

Input.defaultProps = {
  placeholder: 'placeholder',
  theme: themeDefault,
  disabled: false,
  success: false,
  error: false,
  type: 'text',
};

// EXPORT
export default Input;
