// IMPORTS
import { node, objectOf, string } from 'prop-types';
import styled from 'styled-components';
import React from 'react';

import themeDefault from '../../theme';

// STYLES
const StyledChatbot = styled.p`
color: ${({ theme }) => theme.color.primary};
`;

StyledChatbot.defaultProps = {
  theme: themeDefault,
};

// COMPONENT
const Chatbot = props => (
  <StyledChatbot {...props} />
);

// DOCUMENTATION
Chatbot.propTypes = {
  /** accepts only valid react nodes as children */
  children: node,
  /** receive theme props from Theme Provider or default */
  theme: objectOf(objectOf(string)).isRequired,
};

Chatbot.defaultProps = {
  children: 'default',
};

// EXPORT
export default Chatbot;
