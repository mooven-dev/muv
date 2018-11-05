// IMPORTS
import { objectOf, string, bool } from 'prop-types';
import styled from 'styled-components';
import React from 'react';

import themeDefault from '../../theme';
import Input from '../../atoms/input';
import Text from '../../atoms/text';

// STYLES
const StyledFieldset = styled.fieldset`
margin: ${({ theme }) => theme.shape.margin};
border: none;
padding: 0;
`;

// COMPONENT
const Fieldset = (props) => {
  const { onChange, placeholder, type, children, label, warn, success, disabled, ...rest } = props;
  const stateProps = { warn, success, disabled };
  const inputProps = { onChange, placeholder, type, ...stateProps };
  return (
    <StyledFieldset {...rest}>
      <Text label transform="capitalize">
        {`${label}:`}
      </Text>
      <Input {...inputProps} />
      {
        (children && typeof (children) === 'string')
          ? <Text small {...stateProps}>{children}</Text>
          : <Text small>&nbsp;</Text>
      }
    </StyledFieldset>
  );
};

// DOCUMENTATION
Fieldset.propTypes = {
  /** you can pass text as children, as feedback messages */
  children: string,
  /** pass a label prop to set the text of your label */
  label: string,
  /** receive theme props from Theme Provider or default */
  theme: objectOf(objectOf(string)),
  /** set the input to disable state */
  disabled: bool,
  /** set the input and feedback text to success state */
  success: bool,
  /** set the input and feedback text to warn/error state */
  warn: bool,
};

Fieldset.defaultProps = {
  theme: themeDefault,
  disabled: false,
  success: false,
  label: 'label',
  children: '',
  warn: false,
};

// EXPORT
export default Fieldset;
