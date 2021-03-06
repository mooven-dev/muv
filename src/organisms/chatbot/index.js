// IMPORTS
import { node, number, string, bool } from 'prop-types';
import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';

import { botAvatarImg, userAvatarImg } from '../../utils';
import Icon from '../../atoms/icon';
import config from '../../env';
import Bot from './context';

// COMPONENTS
import ChatBox from './components/chatBox';
import BotFab from './components/botFab';


const { endPoint } = config;

// COMPONENT
class Chatbot extends Component {
  constructor(props) {
    super(props);

    this.startBot = () => {
      const { id } = this.props;
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzBmZTFhMDdkNTE2NDA4MTg0NWYyZmUiLCJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIkMmIkMTAkOG5maC9OdS5wNjZISFJwb0FHTGNsdTVhcEVySVlJOWthMEZyYzI4N1NXOWlDRFhyT0FRTFMiLCJfX3YiOjAsImlhdCI6MTU0NDY0MTA0N30.DJuxJGl-9OBI62M7iV0dCdewdeCZRUInisXptKUfP7A';
      // Axios.get(`${endPoint}chatbots/${id}`, { headers: { Authorization: `Bearer ${token}` } })

      // SOLITANDO AO SERVIDOR AS CONFIGURAÇÕES REFENTE AO CHATBOT
      Axios.get(`${endPoint}chatbots/${id}`)
        .then((res) => {
          // criando chave unica de acesso
          const resData = res.data;
          resData.clientId = `x${Math.random().toString(36).slice(-8)}`;
          this.setState(
            { botLoaded: true, bot: resData },
          );
        })
        .catch(err => console.log(err));
    };


    // confirmar item DR
    // GENERIC CONTEXT METHOD
    this.toContext = data => this.setState(data);

    // OPEN/CLOSES CHAT
    this.toogleChat = () => this.setState(({ open }) => ({ open: !open, newMessages: 0 }));

    // CLOSE BOT
    this.closeBot = () => {
      this.setState(({ newMessages, open }) => ({
        open: false, newMessages: (open ? newMessages + 1 : newMessages),
      }));
    };

    // UPDATES NEW MESSAGES BADGE
    this.setNotification = () => {
      const { open } = this.state;
      if (!open) this.setState(({ newMessages }) => ({ newMessages: newMessages + 1 }));
    };

    // UPDATE THE CONVERSATION
    this.updateMessages = (messages, isLoad) => {
      this.setState({ messages, isLoad });
    };

    // CHANGES THE INPUT DISABLE VALUE
    this.disableInput = (disabled) => {
      this.setState({ disabled });
    };

    // STATE
    this.state = {
      updateMessages: this.updateMessages,
      disableInput: this.disableInput,
      endPoint: this.props.endPoint,
      personas: this.props.personas,
      botName: this.props.botName,
      timeOut: this.props.timeOut,
      toogleChat: this.toogleChat,
      changeName: this.changeName,
      resetWarns: this.resetWarns,
      toContext: this.toContext,
      closeBot: this.closeBot,
      open: this.props.open,
      newMessages: 0,
      messages: [],
    };
  }

  componentDidMount() {
    this.startBot();
  }

  componentDidUpdate(prevPros, prevState) {
    // LOOKS FOR NEW MESSAGES
    const oldMessages = prevState.messages;
    const { messages } = this.state;
    if (messages.length > oldMessages.length) {
      this.setNotification();
    }
  }

  render() {
    const { children, ...rest } = this.props;
    const { botLoaded } = this.state;
    return (
      <Bot.Provider value={this.state}>
        {/* BOT BUTTON */}
        <BotFab>{children}</BotFab>
        {/* BOT WINDOW */}
        {botLoaded && <ChatBox {...rest} />}
      </Bot.Provider>
    );
  }
}

// DOCUMENTATION
Chatbot.propTypes = {
  /** the bot profile id */
  id: string,
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
  /** sets if the bot starts opened */
  open: bool,
  personas: bool,
};

Chatbot.defaultProps = {
  children: <Icon fontSize="2rem" name="contacts" color="white" />,
  id: '5c3b749b138323005278502a',
  botTitle: 'Assistente Hyundai',
  userAvatar: userAvatarImg,
  botAvatar: botAvatarImg,
  router: () => null,
  userName: 'User',
  botName: 'Please inform botName Property',
  personas: false,
  timeOut: 50000,
  open: false,
  endPoint,
};

// EXPORT
export default Chatbot;
