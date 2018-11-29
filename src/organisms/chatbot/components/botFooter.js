import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Axios from 'axios';

import Button from '../../../atoms/button';
import themeDefault from '../../../theme';
import Input from '../../../atoms/input';
import Icon from '../../../atoms/icon';
import Row from '../../../atoms/row';
import Col from '../../../atoms/col';
import BotContext from '../context';


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

class BotFooter extends Component {
  static Instance() {}; // eslint-disable-line

  /**
   * @type {BotFooter}
   */

  static send(text) {
    console.log('user says', text);
    BotFooter.Instance.sendMessage(text, true);
  }

  constructor(props) {
    super(props);
    this.state = {};
    BotFooter.Instance = this;
    // UPDATE CHAT SCREEEN
    this.updateChat = (message) => {
      // SETUP
      const { messages, disableInput } = this.context;
      const newMessages = messages.concat([message]);
      // UPDATES
      this.setState({ text: '' }, () => {
        this.context.updateMessages(newMessages, true);
        disableInput(true);
      });
    };

    // SEND MESSAGE
    this.messageRequest = async (data, isUser) => {
      const { endPoint } = this.context;
      // INPUT || USER
      if (isUser) await this.updateChat(data);
      Axios.post(endPoint, JSON.stringify(data))
        .then((res) => {
          const botMessage = res.data;
          botMessage.time = moment().format('H:mm');
          // OUTPUT || BOT
          this.updateChat(botMessage);
        })
        .catch(err => console.log('error', err)); // eslint-disable-line
    };

    // RESET INNACTIVITY WARNS
    this.resetWarns = () => {
      this.setState((prevState) => {
        const { firstWarn, secondWarn, willClose } = prevState;
        if (firstWarn) clearTimeout(firstWarn);
        if (secondWarn) clearTimeout(secondWarn);
        if (willClose) clearTimeout(willClose);
        return { firstWarn: '', secondWarn: '', willClose: '' };
      });
    };

    // CLOSE BOT
    this.close = () => {
      this.setState({ willClose: '' });
      this.context.closeBot();
    };

    // PREPARE AUTO CLOSE
    this.prepareToClose = () => {
      this.setState({ secondWarn: '', willClose: setTimeout(this.close, this.context.timeOut) });
    };

    // WARN TO INACTIVE USER (SECOND TRY)
    this.startSecondWarn = (data) => {
      const sendSecondWarn = async () => {
        const newData = data;
        newData.input.text = 'second-warn';
        await this.messageRequest(newData);
        this.prepareToClose();
      };
      this.setState({ firstWarn: '', secondWarn: setTimeout(sendSecondWarn, this.context.timeOut) });
    };

    // WARN TO INACTIVE USER (FIRST TRY)
    this.startFirstWarn = (data) => {
      const sendFirstWarn = async () => {
        const newData = data;
        newData.input.text = 'first-warn';
        await this.messageRequest(newData);
        this.startSecondWarn(newData);
      };
      this.setState({ firstWarn: setTimeout(sendFirstWarn, this.context.timeOut) });
    };

    // SEND USER MESSAGES TO BOT
    this.sendMessage = async (message, isBot) => {
      await this.resetWarns();
      // DEFAULT MESSAGE
      const isUser = (message && !isBot);
      const text = (message || 'ola');
      // GET CONTEXT
      const { messages, workSpace } = this.context;
      const lastMessage = (messages.length && messages[messages.length - 1]);
      const { context } = lastMessage;
      if (context) context._nextWidget = ''; // eslint-disable-line
      const time = moment().format('H:mm');
      // SETUP MESSAGE DATA
      const data = {
        workspace_id: workSpace,
        context,
        time,
        input: {
          text,
        },
      };
      await this.startFirstWarn(data);
      this.messageRequest(data, isUser);
    };

    // SEND USER MESSAGES TO BOT AND HANDLES HIS RESPONSE
    this.submitMessage = (e) => {
      if (e) e.preventDefault();
      const { text } = this.state;
      this.sendMessage(text);
    };

    // GET THE USER FROM THE INPUT
    this.changeText = e => this.setState({ text: e.target.value });
  }

  componentDidMount() {
    // START CONVERSATION
    this.sendMessage();
  }

  render() {
    const { text } = this.state;
    const { open, disabled } = this.context;
    return (
      <form>
        <Row grow={0} padding="0">
          <Col padding="0">
            <StyledInput
              disabled={disabled || !open}
              disabledPlaceholder="Aguarde..."
              placeholder="Digite sua mensagem..."
              onChange={e => this.changeText(e)}
              value={text}
            />
          </Col>
          <Col padding="0" grow={0}>
            <StyledButton
              inset
              secondary
              onClick={this.submitMessage}
              disabled={disabled || !text}
            >
              <Icon name="paper-plane" color="white" />
            </StyledButton>
          </Col>
        </Row>
      </form>
    );
  }
}

BotFooter.contextType = BotContext;

export default BotFooter;
