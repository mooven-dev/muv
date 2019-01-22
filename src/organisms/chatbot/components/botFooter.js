import SpeechRecognition from 'react-speech-recognition';
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
import config from '../../../env';

require('events').EventEmitter.defaultMaxListeners = 15;
const JSON = require('circular-json');

const { endPoint } = config;

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
    let voiceActive = false;
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
      // INPUT || USER
      if (isUser) await this.updateChat(data);
      Axios.post(`${endPoint}conversation`, JSON.stringify(data))
        .then((res) => {
          const botMessage = res.data;
          botMessage.time = moment().format('H:mm');
          // OUTPUT || BOT
          this.updateChat(botMessage);
          (voiceActive && this.speak(botMessage));
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
      const { messages, bot } = this.context;
      const lastMessage = (messages.length && messages[messages.length - 1]);
      const { context } = lastMessage;
      if (context) context._nextWidget = ''; // eslint-disable-line
      const time = moment().format('H:mm');
      // SETUP MESSAGE DATA
      const data = {
        workspace_id: bot._workspace,
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
      this.context.toContext({ inputValidation: '' });
      const { text } = this.state;
      this.sendMessage(text);
    };

    // GET THE USER FROM THE INPUT
    this.changeText = e => this.setState({ text: e.target.value });

    // SpeechRecognition
    this.void = e => e.preventDefault();
    this.startRecording = async () => {
      await this.props.startListening();
      const base64string = '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';
      const snd = new Audio(`data:audio/wav;base64,${base64string}`);
      snd.play();
    };
    this.stopRecording = async () => {
      await this.props.stopListening();
      const base64string = 'AAAAHGZ0eXBNNEEgAAAAAE00QSBtcDQyaXNvbQAAAAFtZGF0AAAAAAAAB+QhAANAaBwhLA///8AAAAQdsZZECr66kjmKYAZQLlTYmH/iPmNXqMRNrMfMmUpOHRJ2LFj0CDmWm6X0ZMYQqYghJRrtlk8vV2I3tpEmZUzA+8NJ47GU5ZIBjFgpYMXeVraJe+YWGFui6bNVAygANSRd/Ut18sMtkpHp+Zgf7SfPpVJ/+kDG8dRAToV/YAAAAXKmxMP/EfchTvj/gf///+72W4UoRIO+0QK+1QJ+elOKO/v9p88VxVYfH9mEwn0gdW5REetl9ArFNMiSa1bFsVXohNgfB7EbQYpnT967WvqxpIOrbdnUfVKFXGi+vtmHRtspxqSO6fk6XcT1FiFHfk12dByIl1gD0g1qkOOmcto3UUNBKJpDyzHcPcmWVV0XkVbICEiC5AsAPrGWIjN4pi4E1EXrYnLcRWefo6/s3arNsUauF1I8nU29chpAAAZgi1ZIRn7h0yAk4FU/k42cOh+yI9849h8SogD3CiqNzm7eY+DcUNvziPXGwHF6D92kRiFO5K60hwzthByiBCkGQSJFUOy1E/pq7g4Ev4HBA5fsw9cCsw91llIWAD41xbX/cFVTbSh6CrQ4qATEwtwz7dBGBz+D8B+AEDq3KIj1svoFwCFsD//////wBF2ejMxBWI1EIQgZPnx6T5lfVQpMrS05dyPaa41ZwCONP+2eIvrmFvZWB52QkD+G/5Y+Bu85qZauzO00tDia61laK42EyLHaw2YzeZ+vzNfNLEmAiQi7vXI7vhW+HdJg7nW7seLMJgQyENZIrNW4EEtNOOPm8OtpKC54/VVWQ/pDtUxEeYvH0i0UMOBYAKKWBQzC0YjDUp0UrDWYAAJfifUPpv1ICeEboKc3m0CrdZulDDynW5ZzgAAJO2L0h7iR3nrfgZQaoCgD6PSAByEMD////4AABGsSwwaxMKRMZSWIxggggdXj13l9XEh21BkM3lW/9g27NODr+24LNhxBvLiHh0v3IXKvjQ0iweax4tJi3keyZqR1Myfb5mEIY3yWNP3gdD7fUMJLSQvPZQsgG2LwQMERUxFZY5/P6857oJTcru/hNe7sGWO3NgIjyDlXHIp0YY0pCUMWaKKAe+/vIxzooAAd6MAEELv4cDudFAHPoAAADiEMD////AAABEWZh2NiWGCIRRWGQmMIN+q+zWjgKijEPTHFhMpqSugR317rOjbNA1M11SLGq9RCwWVM5V0Hs43+iQKiPj2yLs2cUDUF5sLRS0YLlahYDqEJ2o58M1JEK4+iyPbbtzjbAWrZ8Zyk4aP8aige6vfBuXXr1yB0AAFbWyGQsAAAADZA7L/d+h2gAC3i4wO94u1Ohn7gAAAHIQwP////AAAEXZ4JYYKyZGAVEEGvnPmZ+LURfq8Q0fO7nQTJVphUG6tZ9n5tDDWBgK0JRGNjibFPODt13Lp75nOBCtMlZlJ8mkWL6u2fZAe7SQ1Q7qh+6glhmlyJ6RoBoX5+EAADdPWIBDMsSkFTKl6E736AgQv0VwABdbf/24sSCgIy/7XloAAqEAAG/ZaaAN/UAAADgCEMD////wAABD2xiQFjISxCMDCEEnzn235fWLoogJeeC3+gWllN4U8rpssz8CV1gCVVAVbNj5OIIhXMUiR1cLTnEJYCoZ80B7DyGW74REM5+2uuAINf9tvd21eDcCrvtTyl7/xwYQr7vG/T6nFdFChWNoXei0jjuYVCAFsHVselgWAABZYAAAZrGVxe9AoAAApq2AZ4gsJ0N/UAAADgIQwP////AAAELZWNYmHYYG57C4QCogKIgS575/MfSvMWelt6We7OtfvYPHV7pV1tqvZXtdSaVs4f3sn41z+NkB/HVrHIimAwa7Ox8mav9oNQ3FkhgwkSW2oCYTLAYR3WH4IM2M1wZvl7tmthez3u8ZametSpZKvbDGN8Fsg9zv0AFSAAPpSsiZILAAAAADL+//x9sAB3MYkAB7ulkCxP4C9k6G/qAAABwCEMFDWlBWJh2FiuJBCGwyExgMSghf8Pnc/A4FNrXS57jWvqeewNMT5kQlQLPWZ6mWxnSjUbfMsPqYGnrHchTsGk3gUtryJsnLVWSwvqDEUdrLHaSgJmbGH3qU1MUQ9bFRTeMeT2+Gu7rIopBzStSKvaifiXZrEgDRb/k8sVENAAAwAGh+j7caAAK1AT8tgBMAF/hHFHcAAJJ0PxHCEMFB2mD0FiwESWGQgFRAMiAlnznu6kaWO7SDT3xrr78A8g+pzddAoWoTwsSmSiiQlGsuBVvee5KmwlgYos8rH+dtMq8sMAWYtAojANoj47SXM2zHr3HqajXcAIG1nfVjqlUCq8o6qwcj9glZWE2Rd+H78f09mPiV1zGIAAzLKQY/KAAAAACvF/z3wmIAGOxYABv/NXMjoxAWNJtl0fdfGPFF/9xOjL1SO1afGKfD8RwCEMD////4AABEWajCKCkGBoOBUERhA59LHVnx5enQNN+CaXKuRVIP8BD3tvFH9Lv/sHppt59+u+w66zlnMooVwaLcWZvtMqB7DtrU+GtS2amj3PW50Df9dCUJ8KhQvUmmhdDZ2hHNSnBCi8Oi8001Y+zFMIbLuNf7VqppmKy2VmJE4QRBSRgw2tKeTlWcy7/bdS0BmOYSJkByZooZxB/mctDAc+dqABUBrhTBz6AAAC5VyKpB/gIe4hAANAaBwAAANmbW9vdgAAAGxtdmhkAAAAANhdZS/YXWUvAACsRAAAJvoAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAfh0cmFrAAAAXHRraGQAAAAB2F1lL9hdZS8AAAABAAAAAAAAJvoAAAAAAAAAAAAAAAABAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAGUbWRpYQAAACBtZGhkAAAAANhdZS/YXWUvAACsRAAANABVxAAAAAAAMWhkbHIAAAAAAAAAAHNvdW4AAAAAAAAAAAAAAABDb3JlIE1lZGlhIEF1ZGlvAAAAATttaW5mAAAAEHNtaGQAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAP9zdGJsAAAAZ3N0c2QAAAAAAAAAAQAAAFdtcDRhAAAAAAAAAAEAAAAAAAAAAAACABAAAAAArEQAAAAAADNlc2RzAAAAAAOAgIAiAAAABICAgBRAFQAYAAAB9AAAAfQABYCAgAISEAaAgIABAgAAABhzdHRzAAAAAAAAAAEAAAANAAAEAAAAABxzdHNjAAAAAAAAAAEAAAABAAAADQAAAAEAAABIc3RzegAAAAAAAAAAAAAADQAAAAYAAACQAAABOgAAANUAAACoAAAAngAAAJcAAACeAAAAqQAAAJwAAACxAAAAuAAAAAYAAAAUc3RjbwAAAAAAAAABAAAALAAAAPp1ZHRhAAAA8m1ldGEAAAAAAAAAImhkbHIAAAAAAAAAAG1kaXIAAAAAAAAAAAAAAAAAAAAAAMRpbHN0AAAAvC0tLS0AAAAcbWVhbgAAAABjb20uYXBwbGUuaVR1bmVzAAAAFG5hbWUAAAAAaVR1blNNUEIAAACEZGF0YQAAAAEAAAAAIDAwMDAwMDAwIDAwMDAwODQwIDAwMDAwMkI0IDAwMDAwMDAwMDAwMDI5MEMgMDAwMDAwMDAgMDAwMDAwMDAgMDAwMDAwMDAgMDAwMDAwMDAgMDAwMDAwMDAgMDAwMDAwMDAgMDAwMDAwMDAgMDAwMDAwMDA=';
      const snd = new Audio(`data:audio/wav;base64,${base64string}`);
      snd.play();
      let x = 0;
      const _this = this;
      const transcript = setInterval(() => {
        if (_this.props.finalTranscript != "") {
          _this.setState({ text: _this.props.finalTranscript });
          window.clearInterval(transcript)
          voiceActive = true;
          _this.submitMessage();
        } else if (++x > 5) {
          window.clearInterval(transcript)
          _this.setState({ text: 'Falha ao captar aúdio, tente novamente.' }); // change to audio
        }
        _this.props.resetTranscript();
      }, 500);
    };
    this.speak = async (message) => {
      console.log(this.props.botName)
      let awsCredentials = new AWS.Credentials('AKIAJYV6275VYYGL2FQQ', 'vD28MbTkRP56b38p8m1EIUedSFDwUR9lpIyWWGwm');
      
      let pollyVoiceId = this.props.botName == 'Day' ? 'Vitoria' : 'Ricardo';
      let settings = {
        awsCredentials,
        awsRegion: 'us-east-1',
        pollyVoiceId,
        cacheSpeech: true,
      };
      let kathy = ChattyKathy(settings);

      kathy.Speak(message.output.text.join('.'));

      if (kathy.IsSpeaking()) {
        kathy.ShutUp();
      }

      kathy.ForgetCachedSpeech();
    };
  }

  componentDidMount() {
    // START CONVERSATION
    this.sendMessage();
    this.context.toContext({ sendMessage: this.sendMessage });
  }

  render() {
    // SpeechRecognition
    const { open, disabled, inputValidation } = this.context;
    const { browserSupportsSpeechRecognition } = this.props;
    const { text } = this.state;
    return (
      <form>
        <Row grow={0} padding="0">
          <Col padding="0">
            <StyledInput
              value={text}
              validate={inputValidation}
              disabled={disabled || !open}
              disabledPlaceholder="Aguarde..."
              placeholder="Digite sua mensagem..."
              onChange={value => this.setState({ text: value })}
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
          {browserSupportsSpeechRecognition && (
            <Col padding="0" grow={0}>
              <StyledButton
                inset
                secondary
                onClick={this.void}
                onMouseDown={this.startRecording}
                onMouseUp={this.stopRecording}
              >
                <Icon name="microphone" color="white" />
              </StyledButton>
            </Col>
          )}
        </Row>
      </form>
    );
  }
}

const options = {
  autoStart: false,
};

BotFooter.contextType = BotContext;

export default SpeechRecognition(options)(BotFooter);
