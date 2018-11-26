// IMPORTS
import { node } from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

import ChatMessage from '../../molecules/chatMessage';
import Container from '../../atoms/container';
import Button from '../../atoms/button';
import themeDefault from '../../theme';
import Input from '../../atoms/input';
import Link from '../../atoms/link';
import Text from '../../atoms/text';
import Icon from '../../atoms/icon';
import Row from '../../atoms/row';
import Fab from '../../atoms/fab';
import Col from '../../atoms/col';

// STYLES
const ChatBox = styled(Container)`
transform: scale3d(${({ open }) => (open ? '1, 1, 1' : '.5, .5, 1')});
box-shadow: ${({ theme, open }) => (open ? theme.shape.float : 0)};
pointer-events: ${({ open }) => (open ? 'auto' : 'none')};
transition: ${({ theme }) => theme.transition.time};
opacity: ${({ open }) => (open ? 1 : 0)};
transform-origin: bottom;
overflow: hidden;
position: fixed;
bottom: 5rem;
right: 5rem;
`;

ChatBox.defaultProps = {
  theme: themeDefault,
  bordered: true,
  width: '320px',
};

const Body = styled(Container)`
overflow-x: hidden;
overflow-y: auto;
height: 450px;
`;

Body.defaultProps = {
  content: true,
  white: true,
};

const Header = styled(Row)`
border-radius: 0;
`;

const StyledButton = styled(Button)`
border-radius: 0;
height: 100%;
`;

const StyledInput = styled(Input)`
border-width: 2px 0 0 0;
border-radius: 0;
&:focus{
  border-color: ${({ theme }) => theme.color.overlay};
}
`;

StyledInput.defaultProps = {
  theme: themeDefault,
};

// COMPONENT
class Chatbot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
    this.toogleChat = () => this.setState(({ open }) => ({ open: !open }));
  }

  render() {
    const { open } = this.state;
    const { children, ...messageProps } = this.props;
    return (
      <>
        <Fab onClick={this.toogleChat}>{children}</Fab>
        <ChatBox flex open={open}>
          {/* HEADER */}
          <Header secondary grow={0} content bordered justify="space-between">
            <Text white strong>Chatbot</Text>
            <Link white noLine onClick={this.toogleChat}>
              <Icon color="white" name="close" />
            </Link>
          </Header>
          {/* BODY */}
          <Body open={open}>
            <ChatMessage {...messageProps} />
            <ChatMessage {...messageProps} user />
          </Body>
          {/* FOOTER */}
          <Row grow={0} padding="0">
            <Col padding="0">
              <StyledInput placeholder="Digite sua mensagem..." />
            </Col>
            <Col padding="0" grow={0}>
              <StyledButton secondary inset onClick={() => null}>
                <Icon name="paper-plane" color="white" />
              </StyledButton>
            </Col>
          </Row>
        </ChatBox>
      </>
    );
  }
}

// DOCUMENTATION
Chatbot.propTypes = {
  /** accepts only valid react nodes as children */
  children: node,
};

Chatbot.defaultProps = {
  children: <Icon fontSize="2rem" name="contacts" color="white" />,
};

// EXPORT
export default Chatbot;
