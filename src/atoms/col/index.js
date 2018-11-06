// IMPORTS
import { node, objectOf, string, number } from 'prop-types';
import styled from 'styled-components';
import React from 'react';

import themeDefault from '../../theme';
import Row from '../row';

// STYLES
const StyledCol = styled(Row)`
flex-direction: column;
`;


// COMPONENT
const Col = ({ children, ...props }) => (
  <StyledCol {...props}>{children}</StyledCol>
);

// DOCUMENTATION
Col.propTypes = {
  /** accepts only valid react nodes as children */
  children: node,
  /** receive theme props from Theme Provider or default */
  theme: objectOf(objectOf(string)),
  /** sets flex-grow using a "inline style" logic */
  grow: number,
  /** sets justify-content using a "inline style" logic */
  justify: string,
  /** sets align-items using a "inline style" logic */
  align: string,
};

Col.defaultProps = {
  justify: 'flex-start',
  theme: themeDefault,
  align: 'flex-start',
  children: 'col',
  grow: 1,
};

// EXPORT
export default Col;
