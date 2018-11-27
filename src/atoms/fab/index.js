// IMPORTS
import { node, func } from 'prop-types';
import styled from 'styled-components';
import React from 'react';

import themeDefault from '../../theme';
import Button from '../button';

// STYLES
const StyledFab = styled(Button)`
box-shadow: ${({ theme }) => theme.shape.float};
bottom: ${({ theme }) => theme.shape.size};
right: ${({ theme }) => theme.shape.size};
justify-content: center;
align-items: center;
border-radius: 50%;
position: fixed;
height: 3.5rem;
display: flex;
width: 3.5rem;
z-index: 999;
padding: 0;
`;

// THEME DEFAULT
StyledFab.defaultProps = {
  theme: themeDefault,
};

// COMPONENT
const Fab = props => (
  <StyledFab {...props} />
);

// DOCUMENTATION
Fab.propTypes = {
  /** receive a function as prop onClick */
  onClick: func,
  /** accepts only valid react nodes as children */
  children: node,
};

Fab.defaultProps = {
  onClick: () => null,
  children: 'FAB',
};

// EXPORT
export default Fab;
