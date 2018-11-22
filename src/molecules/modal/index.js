// IMPORTS
import { node, objectOf, string, bool } from 'prop-types';
import React, { PureComponent } from 'react';
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
class Modal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
    };
    this.toogleModal = () => this.setState(prevState => ({ visible: !prevState.visible }));
  }

  componentDidMount() {
    if (this.props.visible === true) this.toogleModal();
  }

  componentWillUpdate(prevProps) {
    if (this.props.visible === true && prevProps.visible === false) this.toogleModal();
  }

  render() {
    const { noButton } = this.props;
    const { visible } = this.state;
    return (
      <>
        {
          noButton
            ? null
            : <Button onClick={this.toogleModal}>test</Button>
        }
        <Overlay visible={visible} onClick={this.toogleModal}>
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
  /** receive theme props from Theme Provider or default */
  theme: objectOf(objectOf(string)).isRequired,
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
