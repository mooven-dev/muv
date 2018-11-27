// IMPORTS
import styled from 'styled-components';
import { number } from 'prop-types';
import React from 'react';

import themeDefault from '../../theme';

// STYLES
const StyledBadge = styled.span`
@keyframes popIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
background-color: ${({ theme }) => theme.color.error};
animation: popIn ${({ theme }) => theme.transition.time};
color: ${({ theme }) => theme.color.white};
justify-content: center;
align-items: center;
border-radius: 50%;
position: absolute;
font-weight: bold;
font-size: .875rem;
display: flex;
height: 1.5rem;
width: 1.5rem;
right: -.5rem;
top: -.5rem;
`;

// THEME DEFAULT
StyledBadge.defaultProps = {
  theme: themeDefault,
};

// COMPONENT
const Badge = ({ children }) => (
  children ? <StyledBadge>{children}</StyledBadge> : null
);

// DOCUMENTATION
Badge.propTypes = {
  /** accepts only valid react nodes as children */
  children: number,
};

Badge.defaultProps = {
  children: 0,
};

// EXPORT
export default Badge;
