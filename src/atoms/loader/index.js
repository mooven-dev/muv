// IMPORTS
import styled from 'styled-components';
import React from 'react';

import themeDefault from '../../theme';
import { setColor } from '../../utils';

// STYLES

const StyledLoader = styled.aside`
display: inline-block;
padding: .5rem .25rem;
position: relative;
margin: .5rem 1.5rem;
width: 0;
span {
  background-color: ${props => setColor(props, props.theme.color.primary)};
  box-shadow: 0 .1rem .1rem 0 ${({ theme }) => theme.color.overlay};
  animation: bounce 1s ease infinite;
  border-radius: 50%;
  position: absolute;
  filter: blur(.1px);
  height: .5rem;
  width: .5rem;
  content: '';
  bottom: 0;
  @keyframes bounce {
    from {
      bottom: 0;
    }
    25% {
      box-shadow: 0 .5rem .5rem 0 ${({ theme }) => theme.color.overlay};
      bottom: .5rem;
    }
    50% {
      bottom: 0;
    }
    to {
      bottom: 0;
    }
  }
  &:nth-child(1) {
    left: -1rem;
    animation-delay: .1s;
  }
  &:nth-child(2) {
    animation-delay: .2s;
    right: 0;
    left: 0;
  }
  &:nth-child(3) {
    animation-delay: .3s;
    right: -1rem;
  }
}
`;

// THEME DEFAULT
StyledLoader.defaultProps = {
  theme: themeDefault,
};

// COMPONENT
const Loader = props => (
  <StyledLoader {...props}>
    <span />
    <span />
    <span />
  </StyledLoader>
);

// DOCUMENTATION
Loader.propTypes = {};

Loader.defaultProps = {};

// EXPORT
export default Loader;
