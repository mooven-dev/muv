// IMPORTS
import { node, number, string } from 'prop-types';
import React, { Component } from 'react';

import { botAvatarImg, userAvatarImg } from '../../utils';
import Icon from '../../atoms/icon';
import config from '../../env';
import Bot from './context';

// COMPONENTS
import ChatBox from './components/chatBox';
import BotFab from './components/botFab';


const { conversation_api, workspace_id } = config;

// COMPONENT
class Chatbot extends Component {
  constructor(props) {
    super(props);

    // OPEN/CLOSES CHAT
    this.toogleChat = () => this.setState(({ open }) => ({ open: !open, newMessages: 0 }));

    // CLOSE BOT
    this.closeBot = () => this.setState({ open: false, newMessages: 1 });

    // UPDATES NEW MESSAGES BADGE
    this.setNotification = () => {
      const { open } = this.state;
      if (open) this.setState({ newMessages: 0 });
      else this.setState(({ newMessages }) => ({ newMessages: newMessages + 1 }));
    };

    // UPDATE THE CONVERSATION
    this.updateMessages = (messages, isLoad) => this.setState({ messages, isLoad });

    // STATE
    this.state = {
      open: true,
      messages: [],
      updateMessages: this.updateMessages,
      workSpace: this.props.workSpace,
      endPoint: this.props.endPoint,
      timeOut: this.props.timeOut,
      toogleChat: this.toogleChat,
      changeName: this.changeName,
      resetWarns: this.resetWarns,
      closeBot: this.closeBot,
    };
  }

  componentDidUpdate(prevPros, prevState) {
    // LOOKS FOR NEW MESSAGES
    const newMessages = this.state.messages;
    const oldMessages = prevState.messages;
    if (newMessages.length > oldMessages.length) {
      this.setNotification();
    }
  }

  render() {
    const { children, ...rest } = this.props;
    return (
      <Bot.Provider value={this.state}>
        {/* BOT BUTTON */}
        <BotFab>{children}</BotFab>
        {/* BOT WINDOW */}
        <ChatBox {...rest} />
      </Bot.Provider>
    );
  }
}

// DOCUMENTATION
Chatbot.propTypes = {
  /** path to the conversation api */
  endPoint: string,
  /** the dialog workspace_id */
  workSpace: string,
  /** the name displayed close to the user avatar */
  userName: string,
  /** path to the image of the user avatar */
  userAvatar: string,
  /** the name displayed on the box screen header */
  botTitle: string,
  /** the name displayed close to the bot avatar */
  botName: string,
  /** path to the image of the bot avatar */
  botAvatar: string,
  /** sets the user inactivity threshold (in miliseconds) */
  timeOut: number,
  /** the icon, component, or image rendered inside the bot button */
  children: node,
};

Chatbot.defaultProps = {
  children: <Icon fontSize="2rem" name="contacts" color="white" />,
  endPoint: conversation_api,
  botTitle: 'Skynet ChatBot',
  userAvatar: userAvatarImg,
  botAvatar: botAvatarImg,
  workSpace: workspace_id,
  userName: 'Sarah',
  botName: 'T-800',
  timeOut: 50000,
};

// EXPORT
export default Chatbot;
