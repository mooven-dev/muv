// IMPORTS
import { node, bool, string, objectOf, any } from 'prop-types';
import React, { PureComponent as Component } from 'react';
import htmlParser from 'react-html-parser';
import styled from 'styled-components';
import Utils from '../build-your/helper/utils';

import { botAvatarImg, userAvatarImg } from '../../../../utils';
import Container from '../../../../atoms/container';
import Loader from '../../../../atoms/loader';
import themeDefault from '../../../../theme';
import Text from '../../../../atoms/text';
import Icon from '../../../../atoms/icon';
import Row from '../../../../atoms/row';
import Col from '../../../../atoms/col';
import BotContext from '../../context';
import BuildYour from '../build-your';
import Options from './widgetOptions';
import BotFooter from '../botFooter';
import constants from './constants';

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
font-size: 0.5rem;
padding: 0.5rem;
opacity: 0.7;
bottom: 0;
right: 0;
`;

const Name = styled(Text)`
margin-bottom: 0.5rem;
font-size: 0.75rem;
opacity: 0.7;
`;

const Avatar = styled.div`
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
height: calc(${({ contentHeight }) => contentHeight}px + .5rem);
transition: ${({ theme }) => theme.transition.time};
margin-bottom: 0.5rem;
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

    // SET A REF TO THE CONTENT (TO GET DOM INFO)
    this.contentRef = React.createRef();

    // UPDATES THE HEIGHT OF THE CONTENT (FOR ANIMATION PURPOSES)
    this.updateHeight = () => {
      const { height } = this.contentRef.current.getBoundingClientRect();
      this.setState({ height });
    };
    this.cntFixed = Utils.createElement('div', { class: 'web-chat-fixed-container' });
    // PARSE STRINGS TO HTML (IF IT HAVE)
    this.parseText = () => {
      const { children, user } = this.props;
      if (typeof children === 'string') {
        return (
          <Text small white={user}>
            {htmlParser(children)}
          </Text>
        );
      }
      return children;
    };

    this.startBuildYour = () => {
      const { disableInput } = this.context;
      const build = new BuildYour({
        postMessage: BotFooter.send(this),
        $elPanelCar: this.cntFixed,
        onClosed: () => {
          // this.chat.checkerTimerPaused = false;
          disableInput(false);
        },
      });
      build.start().then(() => {
        disableInput(true);
      });
    };

    //
    this.widgetClick = (value) => {
      const { disableInput, sendMessage } = this.context;
      sendMessage(value, true);
      disableInput(false);
    };

    // RENDER THE WIDGETS AFTER THE MESSAGE TEXT (IF ANY)
    this.renderWidget = () => {
      // SETUP
      const { context, router } = this.props;
      const { _nextWidget, ITSM_page, ...rest } = context;
      const {
        toContext,
        disableInput,
        bot: { _widgets },
      } = this.context;
      const {
        WIDGET_THUMBS_UP_DOWN,
        WIDGET_OPTIONS_UNLOCK,
        WIDGET_OPTIONS,
        WIDGET_YES_NO,
        WIDGET_BUILD,
        WIDGET_EMAIL,
        WIDGET_NAME,
        WIDGET_CPF,
      } = constants;
      // CHANGE ROUTER
      if (ITSM_page && router) router.push(ITSM_page);
      // RETURN RIGHT WIDGET
      switch (_nextWidget) {
        case WIDGET_EMAIL:
          if (_widgets[WIDGET_EMAIL]) {
            return toContext({ inputValidation: 'email' });
          }
        case WIDGET_NAME:
          if (_widgets[WIDGET_NAME]) {
            return toContext({ inputValidation: 'name' });
          }
        case WIDGET_CPF:
          if (_widgets[WIDGET_CPF]) {
            return toContext({ inputValidation: 'cpf' });
          }
        case WIDGET_OPTIONS_UNLOCK:
          if (_widgets[WIDGET_OPTIONS_UNLOCK]) {
            return (
              <Options onClick={this.widgetClick}>
                {rest[WIDGET_OPTIONS_UNLOCK]}
              </Options>
            );
          }
        case WIDGET_OPTIONS:
          if (_widgets[WIDGET_OPTIONS]) {
            return (
              <Options onClick={this.widgetClick}>
                {rest[WIDGET_OPTIONS]}
              </Options>
            );
          }
        case WIDGET_YES_NO:
          if (_widgets[WIDGET_YES_NO]) {
            return (
              <Options onClick={this.widgetClick}>
                {[
                  { label: 'Sim', value: 'sim' },
                  { label: 'Não', value: 'nao' },
                ]}
              </Options>
            );
          }
        case WIDGET_THUMBS_UP_DOWN:
          if (_widgets[WIDGET_THUMBS_UP_DOWN]) {
            return (
              <Options onClick={this.widgetClick}>
                {[
                  {
                    label: <Icon color="white" name="thumbs-down" />,
                    value: 'thumbs-down',
                  },
                  {
                    label: <Icon color="white" name="thumbs-up" />,
                    value: 'thumbs-up',
                  },
                ]}
              </Options>
            );
          }
        case WIDGET_BUILD:
          if (_widgets[WIDGET_BUILD]) {
            this.startBuildYour();
            break;
          }
        default:
          return disableInput(false);
      }
    };

    // ANIMATIONS
    this.lazyRender = () => {
      // SETUP
      const { user } = this.props;
      // FUNCTION
      const renderContent = () => {
        const content = (
          <>
            {this.parseText()}
            {!user && this.renderWidget()}
          </>
        );

        this.setState({ content }, this.updateHeight);
      };
      // EXECUTION
      setTimeout(renderContent, user ? 300 : 600);
    };
  }

  componentDidMount() {
    // DO MESSAGE ANIMATIONS
    this.lazyRender();
  }

  render() {
    const { user, userAvatar, userName, botAvatar: propsBotAvatar, botName: propsBotName, time } = this.props;
    const { botName: contextBotName, botAvatar: contextBotAvatar } = this.context;
    const { content, height } = this.state;
    return (
      <Container>
        <MessageRow align="flex-end" user={user}>
          {/* USER OR BOT AVATAR IMAGE */}
          <Avatar
            src={user ? userAvatar : contextBotAvatar || propsBotAvatar}
            padding="1px"
            bordered
            grow={0}
          />

          {/* MESSAGE BOX */}
          <Balloon
            user={user}
            primary={user}
            lightGray={!user}
            grow={5 / 6}
            margin=".5rem"
            bordered
            hasContent
          >
            {/* USER OR BOT NAME */}
            <Name white={user} isLabel>
              {user ? userName : contextBotName || propsBotName}
            </Name>

            {/* SHOW MESSAGE CONTENT (COULD INCLUDES WIDGET) */}
            <Content contentHeight={height}>
              <div ref={this.contentRef}>{content}</div>
            </Content>

            {/* SHOW THE MESSAGE TIMESTAMP OR LOADER */}
            <Hour white={user}>
              {content ? <span>{time}</span> : <Loader white />}
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
