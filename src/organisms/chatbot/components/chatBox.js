import React, { Component } from 'react';
import styled from 'styled-components';

import Container from '../../../atoms/container';
import themeDefault from '../../../theme';
import Link from '../../../atoms/link';
import Text from '../../../atoms/text';
import Icon from '../../../atoms/icon';
import Row from '../../../atoms/row';
import BotFooter from './botFooter';
import BotContext from '../context';
import ChatArea from './chatArea';
import Personas from '../personas';


const StyledChatBox = styled(Container)`
${({ open, theme }) => (open ? theme.animation.popIn : theme.animation.popOut)};
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

StyledChatBox.defaultProps = {
  theme: themeDefault,
  bordered: true,
  width: '320px',
};

const Wrap = styled.div`
position: relative;
`;

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { open, isLoad, toogleChat } = this.context;
    // const { name } = this.state;
    const { botTitle, botName, ...rest } = this.props;
    return (
      <StyledChatBox flex open={(isLoad && open)}>
        <Wrap>
          {/* PERSONAS */}
          <Personas {...this.props} {...rest} />

          {/* HEADER */}
          <Row noRadius secondary grow={0} hasContent bordered justify="space-between">
            <Text white strong>{this.context.bot.title}</Text>
            <Link white noLine onClick={toogleChat}>
              <Icon color="white" name="close" />
            </Link>
          </Row>

          {/* BODY (MESSAGES GOES HERE) */}
          <ChatArea {...this.props} {...rest} />

          {/* FOOTER */}
          <BotFooter botName={botName} {...this.props} {...rest} />
        </Wrap>
      </StyledChatBox>
    );
  }
}

ChatBox.contextType = BotContext;

export default ChatBox;
