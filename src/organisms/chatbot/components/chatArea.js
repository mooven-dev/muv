import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import ReverseScroll from 'react-inverted-scrollview';
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

const GlobalStyle = createGlobalStyle`
  .reverseScroll {
    &::-webkit-scrollbar-thumb { display: none; }
    &::-webkit-scrollbar-track { display: none; }
    &::-webkit-scrollbar { display: none; }
  }
`

Body.defaultProps = {
  hasContent: true,
  white: true,
};

class ChatArea extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  scrollToBottom() {
      if (!this.scrollView) return;
      this.scrollView.scrollToBottom();
  };

  scrollToTop() {
      if (!this.scrollView) return;
      this.scrollView.scrollToTop();
  };

  handleScroll = ({ scrollTop, scrollBottom }) => {
      console.log('scrollTop', scrollTop);
      console.log('scrollBottom', scrollBottom);
  };

  render() {
    const { messages } = this.context;
    return (
      <Body>
        <div>
          <ReverseScroll width={'100%'} height={'450px'} className={'reverseScroll'} ref={ref => (this.scrollView = ref)} onScroll={this.handleScroll}>
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
          </ReverseScroll>
        </div>
        <GlobalStyle/>
      </Body>
    );
  }
}

ChatArea.contextType = BotContext;

export default ChatArea;
