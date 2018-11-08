// IMPORTS
import { node, objectOf, string, shape, arrayOf, any, func } from 'prop-types';
import styled from 'styled-components';
import React, { Component } from 'react';

import { inputStyle } from '../../utils';
import themeDefault from '../../theme';
import Arrow from '../../atoms/arrow';
import Text from '../../atoms/text';

// STYLES
const calcHeight = ({ open, length, selected }) => {
  const itemHeight = 2.72;
  if (!open) return itemHeight + 0.25;
  if (selected) return ((length) * itemHeight) + 0.25;
  return ((length + 1) * itemHeight) + 0.25;
};

const StyledSelect = styled.button`
${props => inputStyle(props)}
border-color: ${({ open, theme }) => (open ? theme.color.primary : theme.color.overlay)};
transition: ${({ theme }) => theme.transition.time};
background: ${({ theme }) => theme.color.white};
height: ${props => calcHeight(props)}rem;
position: absolute;
overflow: hidden;
z-index: 999;
padding: 0;
left: 0;
top: 0;
`;

const Item = styled(Text)`
transition: ${({ theme }) => theme.transition.time};
padding: ${({ theme }) => theme.shape.padding};
margin: 0;
&:hover {
  background: ${({ theme }) => theme.color.overlay};
}
`;

Item.defaultProps = {
  theme: themeDefault,
};

const StyledArrow = styled(Arrow)`
right: ${({ theme }) => theme.shape.size};
top: ${({ theme }) => theme.shape.size};
position: absolute;
margin: 0;
`;

StyledArrow.defaultProps = {
  theme: themeDefault,
};

const Wrap = styled.div`
display: inline-block;
position: relative;
width: 100%;
`;

// COMPONENT
class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.close = cb => this.setState(({ open }) => (open ? { open: false } : null), cb);
    this.open = () => this.setState(({ open }) => (open ? null : { open: true }));
    this.onClick = (e) => {
      if (e) e.preventDefault();
      this.open();
    };
    this.onConfirm = (event, index) => {
      event.stopPropagation();
      const { onConfirm, render: { data, title } } = this.props;
      this.close(() => this.setState({ selected: title[index] }));
      if (onConfirm) onConfirm(data[index]);
    };
    this.onCancel = () => {
      const { onCancel } = this.props;
      const { open } = this.state;
      if (open) {
        if (onCancel) onCancel();
        if (open) this.close();
      }
    };
  }

  render() {
    const { placeholder, render: { data, title } } = this.props;
    const { open, selected } = this.state;
    if (data.length !== title.length) return <Text warn>data.length !== title.length</Text>;
    return (
      <Wrap>
        <Item>{selected || placeholder}</Item>
        <StyledSelect
          {...this.props}
          selected={selected !== undefined}
          onClick={this.onClick}
          onBlur={this.onCancel}
          length={title.length}
          open={open}
        >
          <Item>{selected || placeholder}</Item>
          { title.map((item, index) => (
            (item !== selected)
            && <Item key={item} onClick={e => this.onConfirm(e, index)}>{item}</Item>
          )) }
          <StyledArrow up={open} />
        </StyledSelect>
      </Wrap>
    );
  }
}


// DOCUMENTATION
Select.propTypes = {
  onConfirm: func,
  onCancel: func,
  /** sets the placeholder text to be displayed */
  placeholder: string,
  /** accepts only valid react nodes as children */
  children: node,
  /** receive theme props from Theme Provider or default */
  theme: objectOf(objectOf(string)),
  render: shape({
    title: arrayOf(string),
    data: arrayOf(any),
  }),
};

Select.defaultProps = {
  onConfirm: selected => console.log(selected), // eslint-disable-line
  onCancel: () => console.log('cancel'), // eslint-disable-line
  placeholder: 'Selecione...',
  children: 'default',
  theme: themeDefault,
  render: {
    data: [{ char: 'a' }, { char: 'b' }],
    title: ['a', 'b'],
  },
};

// EXPORT
export default Select;
