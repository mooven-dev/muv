// IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import { node } from 'prop-types';
import Axios from 'axios';

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
import config from '../../env';

const { conversation, workspace_id } = config;

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
z-index: 999;
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
  hasContent: true,
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
box-sizing: border-box;
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
      messages: [],
      open: true,
    };
    // REF TO SCROLL CHAT WINDOW ON NEW MESSAGE
    this.scrollRef = React.createRef();
    // UPDATE CHAT SCREEEN
    this.updateChat = (message) => {
      const { messages } = this.state;
      const newMessages = messages.concat([message]);
      let disabled = false;
      if (message.output === undefined) disabled = true;
      this.setState({ messages: newMessages, text: '', isLoad: true, disabled });
    };
    // SEND MESSAGES
    this.sendMessage = (text = 'ola') => {
      this.setState({ disabled: true });
      const { messages } = this.state;
      const lastMessage = (messages.length && messages[messages.length - 1]);
      const { context } = lastMessage;
      // SETUP
      const data = {
        workspace_id,
        context,
        input: {
          text,
        },
      };
      this.updateChat(data);
      Axios.post(conversation, JSON.stringify(data))
        .then((res) => {
          this.updateChat(res.data);
        })
        .catch(err => console.log('error', err)); // eslint-disable-line
    };
    // OPENS AND CLOSES CHAT WINDOW
    this.toogleChat = () => this.setState(({ open }) => ({ open: !open }));
    // LOOKS FOR NEW MESSAGES AND SCROLL CHAT WINDOW
    this.scrollOnNewMessage = (newState, oldState) => {
      const newMessages = newState.messages;
      const oldMessages = oldState.messages;
      if (newMessages.length > oldMessages.length) {
        const box = this.scrollRef.current;
        if (box) box.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    };
    // SEND USER MESSAGES TO BOT AND HANDLES HIS RESPONSE
    this.submitMessage = (e) => {
      if (e) e.preventDefault();
      const { text } = this.state;
      this.sendMessage(text);
    };
  }

  componentDidMount() {
    this.sendMessage();
  }

  componentDidUpdate(prevPros, prevState) {
    this.scrollOnNewMessage(this.state, prevState);
  }

  render() {
    const { open, messages, isLoad, disabled } = this.state;
    const { children, ...messageProps } = this.props;
    return (
      <>
        <Fab onClick={this.toogleChat}>{children}</Fab>
        <ChatBox flex open={(isLoad && open)}>
          {/* HEADER */}
          <Header secondary grow={0} hasContent bordered justify="space-between">
            <Text white strong>Chatbot</Text>
            <Link white noLine onClick={this.toogleChat}>
              <Icon color="white" name="close" />
            </Link>
          </Header>
          {/* BODY */}
          <Body open={open}>
            <div ref={this.scrollRef}>
              {
                messages.map(({ output, input }, index) => (
                  index ? (
                    <ChatMessage
                      user={output === undefined}
                      key={`message-${index}`}
                      {...messageProps}
                    >
                      {output ? output.text[0] : input.text}
                    </ChatMessage>
                  ) : null
                ))
              }
            </div>
          </Body>
          {/* FOOTER */}
          <form>
            <Row grow={0} padding="0">
              <Col padding="0">
                <StyledInput
                  disabled={disabled}
                  disabledPlaceholder="Aguarde..."
                  placeholder="Digite sua mensagem..."
                  onChange={e => this.setState({ text: e.target.value })}
                  value={this.state.text}
                />
              </Col>
              <Col padding="0" grow={0}>
                <StyledButton secondary inset onClick={this.submitMessage}>
                  <Icon name="paper-plane" color="white" />
                </StyledButton>
              </Col>
            </Row>
          </form>
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
