// IMPORTS
import React, { PureComponent as Component } from 'react';
import { bool, string } from 'prop-types';
import styled from 'styled-components';

import { inputStyle } from '../../utils';
import themeDefault from '../../theme';
import Text from '../text';

// STYLES
const Wrapper = styled.aside`
box-shadow: ${({ theme }) => theme.shape.shadow};
background: ${({ theme }) => theme.color.white};
position: absolute;
width: 100%;
z-index: 9;
`;

const FloatOption = styled(Text)`
padding: ${({ theme }) => theme.shape.padding};
cursor: pointer;
margin: 0;
`;

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
    this.state = {
      autocomplete: [],
    };
    this.inputRef = React.createRef();
    this.autoFocus = () => this.inputRef && this.inputRef.current.focus();
    this.focusOnEnable = (prevProps) => {
      const actualDisabled = this.props.disabled;
      const prevDisabled = prevProps.disabled;
      if (actualDisabled === false && prevDisabled === true) this.autoFocus();
    };
    this.handleChange = (e) => {
      const { onChange, autocomplete } = this.props;
      const { value } = e.target;
      e.preventDefault();
      onChange(value);
      if (autocomplete && value.length >= 3) {
        this.setState({
          autocomplete: autocomplete.filter(
            ({ label }) => label.includes(value),
          ),
        });
      } else {
        this.setState({ value, autocomplete: [] });
      }
    };
    this.autocomplete = () => {
      const { autocomplete } = this.state;
      const { onChange } = this.props;
      return autocomplete.map(({ label, data }) => (
        <FloatOption
          onClick={() => {
            this.setState({
              autocomplete: [],
              value: label,
            });
            onChange(data);
          }}
        >
          {label}
        </FloatOption>
      ));
    };
  }

  componentDidUpdate(prevProps) {
    this.focusOnEnable(prevProps);
  }

  render() {
    const { error, disabledPlaceholder, disabled, placeholder, autocomplete } = this.props;
    const { value } = this.state;
    return (
      <>
        <StyledInput
          warn={error}
          value={value}
          {...this.props}
          ref={this.inputRef}
          onChange={this.handleChange}
          placeholder={disabled ? disabledPlaceholder : placeholder}
        />
        {autocomplete && <Wrapper>{this.autocomplete()}</Wrapper>}
      </>
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
