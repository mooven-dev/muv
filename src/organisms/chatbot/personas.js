import React, { Component } from 'react';
import styled from 'styled-components';

import Button from '../../atoms/button';
import themeDefault from '../../theme';
import Text from '../../atoms/text';
import BotContext from './context';
import Col from '../../atoms/col';

import { avatarDayImg, avatarHyunImg, hyun, dai } from '../../utils';

const StyledPersonas = styled.aside`
background: ${({ theme }) => theme.color.secondary};
position: absolute;
z-index: 1;
bottom: 0;
right: 0;
left: 0;
top: 0;
`;

StyledPersonas.defaultProps = {
  theme: themeDefault,
};

const AvatarPersonas = styled.img`
background-image: url(${({ src }) => src});
margin: 3.5rem 0;
height: 110px;
width: 110px;
bottom: 0;
right: 0;
left: 0;
top: 0;
`;

AvatarPersonas.defaultProps = {
  theme: themeDefault,
};

const StyledText = styled(Text)`
text-align: center;
padding: 0.4rem 0 0.2rem 0;
letter-spacing: 0.02rem;
font-weight: 100;
font-size: 0.8rem;
`;

const StyledButton = styled(Button)`
margin: 2.5rem 0 1.5rem 0;
`;

const StyledAnchor = styled.a`
color: #00b0d6;
font-size: 0.8rem;
align-items: center;
text-decoration:none; 
`;


class Personas extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.selectPersona = () => {
      const { avatarHyun, avatarDay, nameHyun, nameDay, gifHyun, gifDai } = this.props;
      const choseOne = (Math.random() > 0.5);
      this.context.toContext({
        botAvatar: choseOne ? avatarHyun : avatarDay,
        personaGif: choseOne ? gifHyun : gifDai,
        botName: choseOne ? nameHyun : nameDay,
      });
    };
  }

  componentWillMount() {
    this.selectPersona();
  }

  render() {
    const { personas, dismissPersonas, toContext, personaGif, botName } = this.context;
    return (
      <div>
        {personas && !dismissPersonas && (
          <StyledPersonas>
            <Col content align="center" justify="space-around">
              <AvatarPersonas src={personaGif} />
              <StyledText type="h6" center white>
                Olá ; )
                <br />
                Eu sou
                {' '}
                {botName}
                , assistente virtual da Hyundai!
                <br />
                Estou aqui para tirar dúvidas sobre a
                <br />
                marca, carros e outros assuntos.
                <br />
              </StyledText>
              <StyledButton inline onClick={() => toContext({ dismissPersonas: true })}>VAMOS COMEÇAR ?</StyledButton>
              <StyledText type="h6" white>
                Para descobrir novidades Hyundai
              </StyledText>
              <StyledAnchor href="https://www.hyundai.com.br/">
                Clique Aqui
              </StyledAnchor>
            </Col>
          </StyledPersonas>
        )}
      </div>
    );
  }
}

Personas.defaultProps = {
  gifHyun: avatarHyunImg,
  gifDai: avatarDayImg,
  avatarHyun: hyun,
  avatarDay: dai,
  nameHyun: 'Hyun',
  nameDay: 'Dai',
};

Personas.contextType = BotContext;

export default Personas;
