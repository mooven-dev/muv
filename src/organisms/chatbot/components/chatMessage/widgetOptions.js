import { arrayOf, objectOf, node, func } from 'prop-types';
import React, { PureComponent as Component } from 'react';
import styled from 'styled-components';

import Button from '../../../../atoms/button';
import Row from '../../../../atoms/row';

const Wrapper = styled(Row)`
margin-top: .5rem;
flex-wrap: wrap;
`;

const Option = styled(Button)`
justify-content: center;
padding: .5rem;
margin: .25rem;
display: flex;
flex-grow: 1;
width: auto;
p {
  font-size: .875rem;
}
`;

class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = (value) => {
      const { onClick } = this.props;
      this.setState({ disabled: true }, () => onClick(value));
    };
  }

  render() {
    const { children } = this.props;
    const { disabled } = this.state;
    return (
      <Wrapper>
        {
          children && children.map(({ label, value }, index) => (
            <Option
              onClick={() => this.handleClick(value)}
              key={`option-${label}-${index}`}
              disabled={disabled}
            >
              {label}
            </Option>
          ))
        }
      </Wrapper>
    );
  }
}

Options.propTypes = {
  children: arrayOf(objectOf(node)).isRequired,
  onClick: func.isRequired,
};

export default Options;
