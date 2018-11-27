// IMPORTS
import { node, bool, string } from 'prop-types';
import htmlParser from 'react-html-parser';
import React, { Component } from 'react';
import styled from 'styled-components';

import Container from '../../atoms/container';
import Loader from '../../atoms/loader';
import themeDefault from '../../theme';
import Text from '../../atoms/text';
import Row from '../../atoms/row';
import Col from '../../atoms/col';

// UNIQUE COMPONENTS
const MessageRow = styled(Row)`
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
flex-direction: ${({ user }) => (user ? 'row-reverse' : 'row')};
align-self: ${({ user }) => (user ? 'flex-end' : 'flex-start')};
animation: fadeIn ${({ theme }) => theme.transition.time};
`;

MessageRow.defaultProps = {
  theme: themeDefault,
};

const Balloon = styled(Col)`
${({ user }) => (user ? 'border-bottom-right-radius: 0' : 'border-bottom-left-radius: 0')};
flex-basis: 0;
`;

const Hour = styled(Text)`
margin-top: .5rem;
text-align: right;
font-size: .7rem;
opacity: .7;
`;

const Name = styled(Text)`
margin-bottom: .5rem;
font-size: .75rem;
opacity: .7;
`;

const Avatar = styled(Col)`
background-color: ${({ theme }) => theme.color.overlay};
background-image: url(${({ src }) => src});
background-position: center;
background-size: cover;
color: transparent;
border-radius: 50%;
overflow: hidden;
height: 3rem;
width: 3rem;
`;

Avatar.defaultProps = {
  theme: themeDefault,
};

// COMPONENT
class ChatMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: <Loader white />,
    };
    this.renderChildren = () => {
      const { children, user } = this.props;
      if (typeof children === 'string') return <Text small white={user}>{htmlParser(children)}</Text>;
      return children;
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ content: this.renderChildren() }), 1000);
  }

  render() {
    const { user, userAvatar, userName, botAvatar, botName } = this.props;
    const { content } = this.state;
    return (
      <Container>
        <MessageRow align="flex-end" user={user}>
          <Avatar bordered grow={0} src={(user ? userAvatar : botAvatar)} />
          <Balloon user={user} primary={user} lightgray={!user} grow={5 / 6} margin=".5rem" bordered hasContent>
            <Name white={user} isLabel>{(user ? userName : botName)}</Name>
            {content}
            <Hour white={user}>0:00</Hour>
          </Balloon>
        </MessageRow>
      </Container>
    );
  }
}


// DOCUMENTATION
ChatMessage.propTypes = {
  /** change the style to match user style or bot style */
  user: bool,
  /** its the content of the chat message */
  children: node,
  /** a url of the user avatar img */
  userAvatar: string,
  userName: string,
  /** a url of the bot avatar img */
  botAvatar: string,
  botName: string,
};

ChatMessage.defaultProps = {
  userAvatar: 'http://www.robots-and-dragons.de/sites/default/files/styles/artikel_-_bild__ber_artikel/public/field/image/preview/terminator-linda-hamilton.jpg?itok=J4P32hm8',
  botAvatar: 'https://slm-assets2.secondlife.com/assets/6327589/view_large/Snapshot_025.jpg?1348721138',
  children: 'Mussum Ipsum, cacilds vidis litro abertis. Quem num gosta di mim que vai caçá sua turmis! Leite de capivaris, leite de mula manquis sem cabeça. Quem manda na minha terra sou euzis! Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum.',
  userName: 'Sarah',
  botName: 'T-800',
  user: false,
};

// EXPORT
export default ChatMessage;
