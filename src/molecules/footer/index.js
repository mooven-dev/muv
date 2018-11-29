// IMPORTS
import styled from 'styled-components';
import { node } from 'prop-types';
import React from 'react';

import themeDefault from '../../theme';

// STYLES
const StyledFooter = styled.footer`
color: ${({ theme }) => theme.color.primary};
`;

// THEME DEFAULT
StyledFooter.defaultProps = {
  theme: themeDefault,
};

// COMPONENT
const Footer = props => (
  <StyledFooter {...props} />
);

// DOCUMENTATION
Footer.propTypes = {
  /** accepts only valid react nodes as children */
  children: node,
};

Footer.defaultProps = {
  children: 'footer',
};

// EXPORT
export default Footer;
