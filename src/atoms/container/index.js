// IMPORTS
import { node, objectOf, string, bool } from 'prop-types';
import styled from 'styled-components';
import React from 'react';

import themeDefault from '../../theme';
import { setColor } from '../../utils';

// STYLES
const StyledContainer = styled.div`
border: ${({ theme, bordered }) => (bordered ? theme.shape.border : 'none')};
padding: ${({ theme, content }) => (content ? theme.shape.padding : 0)};
display: ${({ flex, full }) => (full || flex ? 'flex' : 'block')};
height: ${({ height, full }) => (full ? '100vh' : height)};
width: ${({ width, full }) => (full ? '100%' : width)};
background: ${props => setColor(props, 'transparent')};
border-radius: ${({ theme }) => theme.shape.radius};
max-height: ${({ maxHeight }) => maxHeight};
min-height: ${({ minHeight }) => minHeight};
max-width: ${({ maxWidth }) => maxWidth};
min-width: ${({ minWidth }) => minWidth};
flex-direction: column;
margin: 0 auto;
`;

StyledContainer.defaultProps = {
  theme: themeDefault,
};

// COMPONENT
const Container = props => (
  <StyledContainer {...props} />
);

// DOCUMENTATION
Container.propTypes = {
  /** accepts only valid react nodes as children */
  children: node,
  /** receive theme props from Theme Provider or default */
  theme: objectOf(objectOf(string)).isRequired,
  /** sets max-height using a "inline style" logic */
  maxHeight: string,
  /** sets min-height using a "inline style" logic */
  minHeight: string,
  /** sets max-width using a "inline style" logic */
  maxWidth: string,
  /** sets min-width using a "inline style" logic */
  minWidth: string,
  /** sets height using a "inline style" logic */
  height: string,
  /** sets width using a "inline style" logic */
  width: string,
  /** sets display to flex, width to 100% and height to 100vh */
  full: bool,
};

Container.defaultProps = {
  children: 'container',
  maxHeight: 'auto',
  minHeight: 'auto',
  maxWidth: 'auto',
  minWidth: 'auto',
  height: 'auto',
  width: 'auto',
  full: false,
};

// EXPORT
export default Container;
