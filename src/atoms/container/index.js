// IMPORTS
import { node, string, bool } from 'prop-types';
import styled from 'styled-components';
import React from 'react';

import themeDefault from '../../theme';
import { setColor } from '../../utils';

const setMaxWidth = (props) => {
  const { fluid, theme, maxWidth } = props;
  if (fluid) return '100%'; // first
  if (maxWidth) return maxWidth;
  return theme.shape.maxWidth;
};

// STYLES
const StyledContainer = styled.div`
padding: ${({ theme, hasContent, padding }) => (hasContent ? theme.shape.padding : padding)};
border-radius: ${({ theme, noRadius }) => (noRadius ? 0 : theme.shape.radius)};
border: ${({ theme, bordered }) => (bordered ? theme.shape.border : 'none')};
min-height: ${({ minHeight, full }) => (full ? '100vh' : minHeight)};
display: ${({ flex, full }) => (full || flex ? 'flex' : 'block')};
background: ${props => setColor(props, 'transparent')};
max-height: ${({ maxHeight }) => maxHeight};
max-width: ${props => setMaxWidth(props)};
min-width: ${({ minWidth }) => minWidth};
height: ${({ height }) => height};
margin: ${({ margin }) => margin};
width: ${({ width }) => width};
flex-direction: column;
align-items: stretch;
position: relative;
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
  maxWidth: string,
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
  /** sets width using a "inline style" logic */
  width: string,
  /** removes border radius */
  noRadius: bool,
};

Container.defaultProps = {
  children: 'container',
  margin: '0 auto',
  noRadius: false,
  maxHeight: '',
  minHeight: '',
  width: '100%',
  minWidth: '',
  padding: '0',
  fluid: false,
  maxWidth: '',
  full: false,
  height: '',
};

// EXPORT
export default Container;
