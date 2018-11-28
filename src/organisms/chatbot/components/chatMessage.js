
// IMPORTS
import React, { PureComponent as Component } from 'react';
import { node, bool, string, objectOf, any } from 'prop-types';
import htmlParser from 'react-html-parser';
import styled from 'styled-components';

import { botAvatarImg, userAvatarImg } from '../../../utils';
import Container from '../../../atoms/container';
import Loader from '../../../atoms/loader';
import themeDefault from '../../../theme';
import Text from '../../../atoms/text';
import Row from '../../../atoms/row';
import Col from '../../../atoms/col';

import BotContext from '../context';

// UNIQUE COMPONENTS
const MessageRow = styled(Row)`
flex-direction: ${({ user }) => (user ? 'row-reverse' : 'row')};
align-self: ${({ user }) => (user ? 'flex-end' : 'flex-start')};
${({ theme }) => theme.animation.fadeIn};
`;

MessageRow.defaultProps = {
  theme: themeDefault,
};

const Balloon = styled(Col)`
${({ user }) => (user ? 'border-bottom-right-radius: 0' : 'border-bottom-left-radius: 0')};
position: relative;
flex-basis: 0;
`;

const Hour = styled(Text)`
position: absolute;
text-align: right;
font-size: .5rem;
padding: .5rem;
opacity: .7;
bottom: 0;
right: 0;
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

const Content = styled.div`
transition: ${({ theme }) => theme.transition.time};
height: ${({ contentHeight }) => contentHeight}px;
padding-bottom: .125rem;
margin-bottom: .5rem;
overflow: hidden;
`;

Content.defaultProps = {
  theme: themeDefault,
};


// COMPONENT
class ChatMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      height: 0,
    };

    // SET A REF TO THE CONTENT
    this.contentRef = React.createRef();

    // UPDATES THE HEIGHT OF THE CONTENT
    this.updateHeight = () => {
      const { height } = this.contentRef.current.getBoundingClientRect();
      this.setState({ height });
    };

    // PARSE STRING TO HTML
    this.parseText = () => {
      const { children, user } = this.props;
      if (typeof children === 'string') return <Text small white={user}>{htmlParser(children)}</Text>;
      return children;
    };

    // RENDER THE WIDGETS
    this.renderWidget = () => {
      const { context: { _nextWidget } } = this.props;
      // console.log('_nextWidget', _nextWidget);
      switch (_nextWidget) {
        // case '_getText':
        //   return this.parseText();
        default:
          return this.parseText();
      }
    };

    // ANIMATIONS
    this.lazyRender = () => {
      // SETUP
      const { user } = this.props;
      const renderContent = () => {
        this.setState({ content: this.renderWidget() }, this.updateHeight);
      };
      // EXECUTION
      setTimeout(renderContent, (user ? 300 : 600));
    };
  }

  componentDidMount() {
    this.lazyRender();
  }

  render() {
    const { user, userAvatar, userName, botAvatar, botName, time } = this.props;
    const { content, height } = this.state;
    return (
      <Container>
        <MessageRow align="flex-end" user={user}>
          <Avatar bordered grow={0} src={(user ? userAvatar : botAvatar)} />
          <Balloon user={user} primary={user} lightgray={!user} grow={5 / 6} margin=".5rem" bordered hasContent>
            <Name white={user} isLabel>{(user ? userName : botName)}</Name>
            <Content contentHeight={height}>
              <div ref={this.contentRef}>
                {content}
              </div>
            </Content>
            <Hour white={user}>
              {content ? <span>{ time }</span> : <Loader white />}
            </Hour>
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
  /** path to the image of the user avatar */
  userAvatar: string,
  /** the name displayed close to the user avatar */
  userName: string,
  /** path to the image of the bot avatar */
  botAvatar: string,
  /** the name displayed close to the bot avatar */
  botName: string,
  /** the timestamp of the message */
  time: string,
  /** context object from watson API */
  context: objectOf(any),
};

ChatMessage.defaultProps = {
  children: 'Come with me if you want to live!',
  userAvatar: userAvatarImg,
  botAvatar: botAvatarImg,
  userName: 'Sarah',
  botName: 'T-800',
  user: false,
  context: {},
  time: '',
};

ChatMessage.contextType = BotContext;

// EXPORT
export default ChatMessage;
