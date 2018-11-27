// IMPORTS
import { node, number } from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import Axios from 'axios';

import ChatMessage from '../../molecules/chatMessage';
import Container from '../../atoms/container';
import Button from '../../atoms/button';
import themeDefault from '../../theme';
import Badge from '../../atoms/badge';
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
transform-origin: bottom right;
overflow: hidden;
position: fixed;
z-index: 999;
bottom: 4.5rem;
right: 4.5rem;
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
    // SEND MESSAGE
    this.messageRequest = (data) => {
      this.updateChat(data);
      Axios.post(conversation, JSON.stringify(data))
        .then((res) => {
          this.updateChat(res.data);
        })
        .catch(err => console.log('error', err)); // eslint-disable-line
    };
    // eslint-disable-next-line
    this.close = () => this.setState({ open: false, willClose: '', newMessages: 2 });
    this.prepareToClose = () => {
      // eslint-disable-next-line
      this.setState({ secondWarn: '', willClose: setTimeout(this.close, this.props.timeOut) });
    };
    this.startSecondWarn = (data) => {
      const sendSecondWarn = () => {
        const newData = data;
        newData.input.text = 'second-warn';
        this.messageRequest(newData);
        this.prepareToClose();
      };
      // eslint-disable-next-line
      this.setState({ firstWarn: '', secondWarn: setTimeout(sendSecondWarn, this.props.timeOut) });
    };
    this.startFirstWarn = (data) => {
      const sendFirstWarn = () => {
        const newData = data;
        newData.input.text = 'first-warn';
        newData.automatic = true;
        this.messageRequest(newData);
        this.startSecondWarn(newData);
      };
      // eslint-disable-next-line
      this.setState({ firstWarn: setTimeout(sendFirstWarn, this.props.timeOut) });
    };
    // SEND MESSAGES
    this.sendMessage = (message) => {
      // eslint-disable-next-line
      this.setState({ disabled: true, firstWarn: '', secondWarn: '', willClose: '' });
      // DEFAULT MESSAGE
      const automatic = (message === undefined);
      const text = (message || 'ola');
      // GET CONTEXT
      const { messages } = this.state;
      const lastMessage = (messages.length && messages[messages.length - 1]);
      const { context } = lastMessage;
      // SETUP
      const data = {
        workspace_id,
        automatic,
        context,
        input: {
          text,
        },
      };
      this.startFirstWarn(data);
      this.messageRequest(data);
    };
    // OPENS AND CLOSES CHAT WINDOW
    this.toogleChat = () => this.setState(({ open }) => ({ open: !open, newMessages: 0 }));
    // LOOKS FOR NEW MESSAGES AND SCROLL CHAT WINDOW
    this.scrollOnNewMessage = () => {
      const box = this.scrollRef.current;
      if (box) box.scrollIntoView({ behavior: 'smooth', block: 'end' });
    };
    // SEND USER MESSAGES TO BOT AND HANDLES HIS RESPONSE
    this.submitMessage = (e) => {
      if (e) e.preventDefault();
      const { text } = this.state;
      this.sendMessage(text);
    };
    this.setNotification = () => {
      const { open } = this.state;
      if (open) this.setState({ newMessages: 0 });
      else this.setState(({ newMessages }) => ({ newMessages: newMessages + 1 }));
    };
  }

  componentDidMount() {
    this.sendMessage();
  }

  componentDidUpdate(prevPros, prevState) {
    const newMessages = this.state.messages;
    const oldMessages = prevState.messages;
    if (newMessages.length > oldMessages.length) {
      this.scrollOnNewMessage();
      this.setNotification();
    }
  }

  render() {
    const { open, messages, isLoad, disabled, newMessages } = this.state;
    const { children, ...messageProps } = this.props;
    return (
      <>
        <Fab onClick={this.toogleChat}>
          <span>
            <Badge>{Math.floor(newMessages / 2)}</Badge>
            {children}
          </span>
        </Fab>
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
                messages.map(({ output, input, automatic }, index) => (
                  (!automatic) ? (
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
  timeOut: number,
  /** accepts only valid react nodes as children */
  children: node,
};

Chatbot.defaultProps = {
  children: <Icon fontSize="2rem" name="contacts" color="white" />,
  timeOut: 60000,
};

// EXPORT
export default Chatbot;
