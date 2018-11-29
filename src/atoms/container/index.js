// IMPORTS
import { node, string, bool } from 'prop-types';
import styled from 'styled-components';
import React from 'react';

import themeDefault from '../../theme';
import { setColor } from '../../utils';
// STYLES
const StyledContainer = styled.div`
padding: ${({ theme, hasContent, padding }) => (hasContent ? theme.shape.padding : padding)};
flex-basis: ${({ hasContent, padding }) => ((hasContent || padding !== '0') ? 'auto' : 0)};
border-radius: ${({ theme, noRadius }) => (noRadius ? 0 : theme.shape.radius)};
max-width: ${({ fluid, theme }) => (fluid ? '100%' : theme.shape.maxWidth)};
border: ${({ theme, bordered }) => (bordered ? theme.shape.border : 'none')};
display: ${({ flex, full }) => (full || flex ? 'flex' : 'block')};
height: ${({ height, full }) => (full ? '100vh' : height)};
width: ${({ width, full }) => (full ? '100%' : width)};
background: ${props => setColor(props, 'transparent')};
min-height: ${({ minHeight }) => minHeight};
max-height: ${({ maxHeight }) => maxHeight};
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
  /** makes the container to has 100% width */
  fluid: bool,
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
  /** removes border radius */
  noRadius: bool,
};

Container.defaultProps = {
  children: 'container',
  maxHeight: 'auto',
  minHeight: 'auto',
  minWidth: 'auto',
  margin: '0 auto',
  noRadius: false,
  height: 'auto',
  padding: '0',
  fluid: false,
  full: false,
};

// EXPORT
export default Container;
