/*
 * DO NOT EDIT THIS FILE DIRECTLY !!!!
 * DO NOT EDIT THIS FILE DIRECTLY !!!!
 * DO NOT EDIT THIS FILE DIRECTLY !!!!
 * DO NOT EDIT THIS FILE DIRECTLY !!!!
 */

// EXTERNAL LIBS
import styled, { ThemeProvider, injectGlobal, ServerStyleSheet } from 'styled-components';

// ATOMS
import Icon from './atoms/icon';
import Fab from './atoms/fab';
import Divider from './atoms/divider';
import Arrow from './atoms/arrow';
import Container from './atoms/container';
import Col from './atoms/col';
import Row from './atoms/row';
import Overlay from './atoms/overlay';
import Input from './atoms/input';
import Link from './atoms/link';
import Button from './atoms/button';
import Text from './atoms/text';

// MOLECULES
import ChatMessage from './molecules/chatMessage';
import Select from './molecules/select';
import Fieldset from './molecules/fieldset';
import Modal from './molecules/modal';

// ORGANISMS
import Chatbot from './organisms/chatbot';

// TEMPLATES


// GLOBALS
injectGlobal`
  body {
    font-size: 16px;
    padding: 0px;
    margin: 0px;
    color: #222;
    * {
      box-sizing: border-box;
      font-family: 'Ubuntu', sans-serif;
    }
  }
`;

// EXPORTS
export default styled;
export {
  ServerStyleSheet,
  ThemeProvider,
  injectGlobal,
  // COMPONENTS
  ChatMessage,
  Icon,
  Fab,
  Chatbot,
  Divider,
  Arrow,
  Select,
  Container,
  Col,
  Row,
  Fieldset,
  Overlay,
  Modal,
  Input,
  Link,
  Button,
  Text,
};
