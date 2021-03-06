// IMPORTS
import { string, bool } from 'prop-types';
import styled from 'styled-components';
import React from 'react';

import themeDefault from '../../theme';
import Input from '../../atoms/input';
import Text from '../../atoms/text';

// STYLES
const StyledFieldset = styled.fieldset`
margin: ${({ theme }) => theme.shape.margin};
border-width: 0;
padding: 0;
`;

StyledFieldset.defaultProps = {
  theme: themeDefault,
};

// COMPONENT
const Fieldset = (props) => {
  const { onChange, placeholder, type, children, label, warn, success, disabled, value, autocomplete, ...rest } = props;
  const stateProps = { warn, success, disabled };
  const inputProps = { onChange, autocomplete, placeholder, type, value, ...stateProps };
  return (
    <StyledFieldset {...rest}>
      <Text isLabel transform="capitalize">
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
  /** set the input to disable state */
  disabled: bool,
  /** set the input and feedback text to success state */
  success: bool,
  /** set the input and feedback text to warn/error state */
  warn: bool,
};

Fieldset.defaultProps = {
  disabled: false,
  success: false,
  label: 'label',
  children: '',
  warn: false,
};

// EXPORT
export default Fieldset;
