// IMPORTS
import { node, string, bool } from 'prop-types';
import styled from 'styled-components';
import React from 'react';

import themeDefault from '../../theme';
import { setColor } from '../../utils';
// STYLES
const StyledContainer = styled.div`
padding: ${({ theme, content, padding }) => (content ? theme.shape.padding : padding)};
flex-basis: ${({ content, padding }) => ((content || padding) ? 'auto' : 0)};
border: ${({ theme, bordered }) => (bordered ? theme.shape.border : 'none')};
display: ${({ flex, full }) => (full || flex ? 'flex' : 'block')};
height: ${({ height, full }) => (full ? '100vh' : height)};
width: ${({ width, full }) => (full ? '100%' : width)};
background: ${props => setColor(props, 'transparent')};
border-radius: ${({ theme }) => theme.shape.radius};
max-height: ${({ maxHeight }) => maxHeight};
min-height: ${({ minHeight }) => minHeight};
max-width: ${({ maxWidth }) => maxWidth};
min-width: ${({ minWidth }) => minWidth};
margin: ${({ margin }) => margin};
flex-direction: column;
align-items: stretch;
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
  /** sets display to flex, width to 100% and height to 100vh */
  full: bool,
  /** sets padding using a "inline style" logic */
  padding: string,
  /** sets margin using a "inline style" logic */
  margin: string,
};

Container.defaultProps = {
  children: 'container',
  maxHeight: 'auto',
  minHeight: 'auto',
  maxWidth: 'auto',
  minWidth: 'auto',
  height: 'auto',
  padding: '0',
  margin: '0',
  full: false,
};

// EXPORT
export default Container;
