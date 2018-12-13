// IMPORTS
import styled from 'styled-components';
import { bool } from 'prop-types';
import React from 'react';

import { setColor } from '../../utils';
import themeDefault from '../../theme';

// STYLES

const StyledMenuButton = styled.button`
all: unset;
position: relative;
cursor: pointer;
height: 1.3rem;
width: 2rem;
padding: 0;
> p {
  all: unset;
  transition: ${({ theme }) => theme.transition.time};
  border: ${({ theme }) => theme.shape.border};
  border-color: ${props => setColor(props)};
  transform-origin: center;
  border-radius: .125rem;
  display: inline-block;
  position: absolute;
  width: 100%;
  content: '';
  &:nth-child(1) {
    transform: rotate(${({ open }) => (open ? '45deg' : '0deg')});
    top: calc(${({ open }) => (open ? '50%' : '0%')} - .125rem);
  }
  &:nth-child(2) {
    transform: scaleX(${({ open }) => (open ? '0' : '1')});
    top: calc(50% - .1rem);
  }
  &:nth-child(3) {
    transform: rotate(${({ open }) => (open ? '-45deg' : '0deg')});
    bottom: calc(${({ open }) => (open ? '50%' : '0%')} - .125rem);
  }
}
`;

// THEME DEFAULT
StyledMenuButton.defaultProps = {
  theme: themeDefault,
};

// COMPONENT
const MenuButton = props => (
  <StyledMenuButton {...props}>
    <p />
    <p />
    <p />
    {props.children}
  </StyledMenuButton>
);

// DOCUMENTATION
MenuButton.propTypes = {
  /** accepts only valid react nodes as children */
  open: bool,
};

MenuButton.defaultProps = {
  open: false,
};

// EXPORT
export default MenuButton;
