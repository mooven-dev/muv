// IMPORTS
import { node, bool } from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

import Overlay from '../../atoms/overlay';
import Button from '../../atoms/button';
import themeDefault from '../../theme';

// STYLES
const StyledModal = styled.div`
margin-top: ${({ visible }) => (visible ? 0 : 100)}px;
border-radius: ${({ theme }) => theme.shape.radius};
transition: ${({ theme }) => theme.transition.time};
box-shadow: ${({ theme }) => theme.shape.shadow};
background: ${({ theme }) => theme.color.white};
padding: ${({ theme }) => theme.shape.size};
`;

StyledModal.defaultProps = {
  theme: themeDefault,
};

// COMPONENT
class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // IMPORTANT TO BE EXACTALLY TRUE OR FALSE HERE
    this.open = () => this.setState({ visible: true });
    this.close = () => this.setState({ visible: false });
  }

  static getDerivedStateFromProps(props, state) {
    // FULL UNCONTROLLED
    if (props.visible === undefined) return null;
    // FULL CONTROLLED
    if (state.visible === undefined) {
      if (props.visible === true) return { visible: true };
      return { visible: undefined };
    }
    // DEFAULT (GIVES CONTROLL)
    return { visible: undefined };
  }

  render() {
    const { noButton } = this.props;
    const { visible } = this.state;
    return (
      <>
        {
          noButton
            ? null
            : <Button onClick={this.open}>test</Button>
        }
        <Overlay visible={visible} onClick={this.close}>
          <StyledModal {...this.props} visible={visible} onClick={e => e.stopPropagation()} />
        </Overlay>
      </>
    );
  }
}

// DOCUMENTATION
Modal.propTypes = {
  /** accepts only valid react nodes as children */
  children: node,
  /** hide the button component */
  noButton: bool,
  /** you can use this prop to control the component from outside */
  visible: bool,
};

Modal.defaultProps = {
  children: 'content',
  noButton: false,
  visible: false,
};

// EXPORT
export default Modal;
