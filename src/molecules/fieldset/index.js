// IMPORTS
import { node, objectOf, string } from 'prop-types';
import styled from 'styled-components';
import React from 'react';

import themeDefault from '../../theme';

// STYLES
const StyledFieldset = styled.p`
color: ${({ theme }) => theme.color.primary};
`;

// COMPONENT
const Fieldset = props => (
  <StyledFieldset {...props} />
);

// DOCUMENTATION
Fieldset.propTypes = {
  /** accepts only valid react nodes as children */
  children: node,
  /** receive theme props from Theme Provider or default */
  theme: objectOf(objectOf(string)),
};

Fieldset.defaultProps = {
  children: 'default',
  theme: themeDefault,
};

// EXPORT
export default Fieldset;
