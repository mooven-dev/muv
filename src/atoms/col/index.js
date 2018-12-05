// IMPORTS
import { node, string, number } from 'prop-types';
import styled from 'styled-components';
import React from 'react';

import themeDefault from '../../theme';
import Row from '../row';

// STYLES
const StyledCol = styled(Row)`
flex-direction: column;
flex-basis: 0;
`;

StyledCol.defaultProps = {
  theme: themeDefault,
};

// COMPONENT
const Col = ({ children, ...props }) => (
  <StyledCol {...props}>{children}</StyledCol>
);

// DOCUMENTATION
Col.propTypes = {
  /** accepts only valid react nodes as children */
  children: node,
  /** sets flex-grow using a "inline style" logic */
  grow: number,
  /** sets justify-content using a "inline style" logic */
  justify: string,
  /** sets align-items using a "inline style" logic */
  align: string,
};

Col.defaultProps = {
  justify: 'flex-start',
  children: 'col',
  align: 'strech',
  grow: 1,
};

// EXPORT
export default Col;
