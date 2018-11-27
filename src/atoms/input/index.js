// IMPORTS
import React, { PureComponent as Component } from 'react';
import { bool, string } from 'prop-types';
import styled from 'styled-components';

import { inputStyle } from '../../utils';
import themeDefault from '../../theme';

// STYLES
const StyledInput = styled.input`
${props => inputStyle(props)}
&:disabled {
  background-color: ${({ theme }) => theme.color.lightgray};
}
`;

StyledInput.defaultProps = {
  theme: themeDefault,
};

// COMPONENT
class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.inputRef = React.createRef();
    this.autoFocus = () => this.inputRef && this.inputRef.current.focus();
    this.focusOnEnable = (prevProps) => {
      const actualDisabled = this.props.disabled;
      const prevDisabled = prevProps.disabled;
      if (actualDisabled === false && prevDisabled === true) this.autoFocus();
    };
  }

  componentDidUpdate(prevProps) {
    this.focusOnEnable(prevProps);
  }

  render() {
    const { error, disabledPlaceholder, disabled, placeholder } = this.props;
    return (
      <StyledInput
        warn={error}
        {...this.props}
        ref={this.inputRef}
        placeholder={disabled ? disabledPlaceholder : placeholder}
      />
    );
  }
}

// DOCUMENTATION
Input.propTypes = {
  /** equals to type html atribute */
  type: string,
  /** prop to disables input */
  disabled: bool,
  /** changes the placeholder when disabled */
  disabledPlaceholder: string,
  /** prop to visualy show if input has error */
  error: bool,
  /** prop to visualy show if input is correctly filled */
  success: bool,
  /** receive placeholder props */
  placeholder: string,
};

Input.defaultProps = {
  disabledPlaceholder: 'disabled',
  placeholder: 'placeholder',
  disabled: false,
  success: false,
  error: false,
  type: 'text',
};

// EXPORT
export default Input;
