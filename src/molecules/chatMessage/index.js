// IMPORTS
import { node, bool, string } from 'prop-types';
import styled from 'styled-components';
import React from 'react';

import Container from '../../atoms/container';
import themeDefault from '../../theme';
import Text from '../../atoms/text';
import Row from '../../atoms/row';
import Col from '../../atoms/col';

// UNIQUE COMPONENTS
const MessageRow = styled(Row)`
flex-direction: ${({ user }) => (user ? 'row-reverse' : 'row')};
align-self: ${({ user }) => (user ? 'flex-end' : 'flex-start')};
`;

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
background-image: url(${({ src }) => src});
background-position: center;
background-size: cover;
border-radius: 50%;
overflow: hidden;
height: 3rem;
width: 3rem;
`;

// STYLES
const StyledChatMessage = styled.p`
color: ${({ theme }) => theme.color.primary};
`;

// THEME DEFAULT
StyledChatMessage.defaultProps = {
  theme: themeDefault,
};

// COMPONENT
const ChatMessage = ({ user, children, userAvatar, userName, botAvatar, botName }) => (
  <Container>
    <MessageRow align="flex-end" user={user}>
      <Avatar bordered grow={0} margin=".5rem" src={(user ? userAvatar : botAvatar)} />
      <Balloon user={user} primary={user} lightgray={!user} grow={5 / 6} margin=".5rem" bordered content>
        <Name white={user} label>{(user ? userName : botName)}</Name>
        {
          (typeof children === 'string')
            ? <Text small white={user}>{children}</Text>
            : children
        }
        <Hour white={user}>0:00</Hour>
      </Balloon>
    </MessageRow>
  </Container>
);


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
