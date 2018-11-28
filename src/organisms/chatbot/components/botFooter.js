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
  constructor(props) {
    super(props);
    this.state = {};

    // UPDATE CHAT SCREEEN
    this.updateChat = (message) => {
      const { messages } = this.context;
      const newMessages = messages.concat([message]);
      let disabled = false;
      if (message.output === undefined) disabled = true;
      this.setState({ text: '', disabled });
      this.context.updateMessages(newMessages, true);
    };

    // SEND MESSAGE
    this.messageRequest = async (data, isUser) => {
      const { endPoint } = this.context;
      // INPUT || USER
      if (isUser) await this.updateChat(data);
      Axios.post(endPoint, JSON.stringify(data))
        .then((res) => {
          const botMessage = res.data;
          botMessage.time = moment().format('HH:MM');
          // OUTPUT || BOT
          this.updateChat(res.data);
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
        return { disabled: true, firstWarn: '', secondWarn: '', willClose: '' };
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
      // eslint-disable-next-line
      this.setState({ firstWarn: '', secondWarn: setTimeout(sendSecondWarn, this.context.timeOut) });
    };

    // WARN TO INACTIVE USER (FIRST TRY)
    this.startFirstWarn = (data) => {
      const sendFirstWarn = async () => {
        const newData = data;
        newData.input.text = 'first-warn';
        // newData.automatic = true;
        await this.messageRequest(newData);
        this.startSecondWarn(newData);
      };
      // eslint-disable-next-line
      this.setState({ firstWarn: setTimeout(sendFirstWarn, this.context.timeOut) });
    };

    // SEND USER MESSAGES TO BOT
    this.sendMessage = async (message) => {
      // eslint-disable-next-line
      await this.resetWarns();
      // DEFAULT MESSAGE
      const isUser = (message !== undefined);
      const text = (message || 'ola');
      // GET CONTEXT
      const { messages, workSpace } = this.context;
      const lastMessage = (messages.length && messages[messages.length - 1]);
      const { context } = lastMessage;
      const time = moment().format('HH:MM');
      // SETUP
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
    const { text, disabled } = this.state;
    const { open } = this.context;
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
