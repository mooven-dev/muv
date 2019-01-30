// IMPORTS
import React, { PureComponent as Component } from 'react';
import { bool, string, func } from 'prop-types';
import styled from 'styled-components';

import BotContext from '../../organisms/chatbot/context';
import { inputStyle } from '../../utils';
import themeDefault from '../../theme';
import validator from './validators';
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
      const { onChange, onValidate, autocomplete, validate} = this.props;
      const { value } = e.target;
      e.preventDefault();
      // VALIDATION
      const { data, error } = validator[validate || 'default'](value);
      // RETURN VALUE AND ERROR TO PARENT
      onValidate(error);
      onChange(data);
      // AUTOCOMPLETE
      if (autocomplete && value.length >= 3) {
        this.setState({
          autocomplete: autocomplete.filter(
            ({ label }) => label.includes(value),
          ),
        });
      } else {
        this.setState({error, value: data, autocomplete: [] });
        const {
          toContext,
          disableButton,
        } = this.context;
        return toContext({ disableButton: !error });
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
    const { error: propsError, disabledPlaceholder, disabled, placeholder, autocomplete } = this.props;
    const { error: stateError, value } = this.state;
    return (
      <>
        <StyledInput
          value={value}
          {...this.props}
          ref={this.inputRef}
          onChange={this.handleChange}
          warn={propsError || stateError}
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
  onValidate: func,
  onChange: func,
};

Input.defaultProps = {
  onValidate: err => err,
  disabledPlaceholder: 'disabled',
  placeholder: 'placeholder',
  onChange: value => value,
  disabled: false,
  success: false,
  error: false,
  type: 'text',
};

Input.contextType = BotContext;

// EXPORT
export default Input;
