// IMPORTS
import { bool, string } from 'prop-types';
import styled from 'styled-components';
import React from 'react';

import { inputStyle } from '../../utils';
import themeDefault from '../../theme';

// STYLES
const StyledInput = styled.input`
${props => inputStyle(props)}
`;

StyledInput.defaultProps = {
  theme: themeDefault,
};

// COMPONENT
const Input = ({ error, ...props }) => (
  <StyledInput warn={error} {...props} />
);

// DOCUMENTATION
Input.propTypes = {
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
  disabled: false,
  success: false,
  error: false,
  type: 'text',
};

// EXPORT
export default Input;
