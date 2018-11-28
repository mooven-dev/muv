import React, { Component } from 'react';
import styled from 'styled-components';

import Container from '../../../atoms/container';
import ChatMessage from './chatMessage';
import BotContext from '../context';

const Body = styled(Container)`
&::-webkit-scrollbar-thumb { display: none; }
&::-webkit-scrollbar-track { display: none; }
&::-webkit-scrollbar { display: none; }
> div {
  transform: rotate(-180deg);
}
transform: rotate(180deg);
scroll-behavior: smooth;
overflow-x: hidden;
overflow-y: auto;
height: 450px;
`;

Body.defaultProps = {
  hasContent: true,
  white: true,
};

class ChatArea extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { messages } = this.context;
    return (
      <Body>
        <div>
          <div>
            {
              messages.map(({ output, input, ...rest }, index) => (
                <ChatMessage
                  user={output === undefined}
                  key={`message-${index}`}
                  {...this.props}
                  {...rest}
                >
                  {output ? output.text[0] : input.text}
                </ChatMessage>
              ))
            }
          </div>
        </div>
      </Body>
    );
  }
}

ChatArea.contextType = BotContext;

export default ChatArea;
