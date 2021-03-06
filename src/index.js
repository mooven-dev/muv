/*
 * DO NOT EDIT THIS FILE DIRECTLY !!!!
 * DO NOT EDIT THIS FILE DIRECTLY !!!!
 * DO NOT EDIT THIS FILE DIRECTLY !!!!
 * DO NOT EDIT THIS FILE DIRECTLY !!!!
 */

// EXTERNAL LIBS
import styled, { ThemeProvider, createGlobalStyle, ServerStyleSheet } from 'styled-components';
import { version } from '../package.json';
import { createTheme } from './utils';

// ATOMS
import Switch from './atoms/switch';
import Badge from './atoms/badge';
import Counter from './atoms/counter';
import Loader from './atoms/loader';
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
import MenuButton from './molecules/menuButton';
import Menu from './molecules/menu';
import Body from './molecules/body';
import Footer from './molecules/footer';
import Header from './molecules/header';
import LoadScreen from './molecules/loadScreen';
import Select from './molecules/select';
import Fieldset from './molecules/fieldset';
import Modal from './molecules/modal';

// ORGANISMS
import Chatbot from './organisms/chatbot';

// TEMPLATES
import Page from './templates/page';


// GLOBALS
// eslint-disable-next-line
if (process.env.NODE_ENV === 'development') console.log('muv @', version);
const GlobalStyle = createGlobalStyle`
  body {
    font-size: 16px;
    padding: 0px;
    margin: 0px;
    color: #222;
    * {
      box-sizing: border-box;
      font-family: 'Ubuntu', sans-serif;
    }
    a {
      color: ${({ theme }) => theme.color.primary}
    }
  }
`;

// EXPORTS
export default styled;
export {
  createGlobalStyle,
  ServerStyleSheet,
  ThemeProvider,
  GlobalStyle,
  createTheme,
  // COMPONENTS
  Switch,
  MenuButton,
  Menu,
  Body,
  Footer,
  Header,
  Page,
  Badge,
  Counter,
  LoadScreen,
  Loader,
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
