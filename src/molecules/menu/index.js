// IMPORTS
import styled from 'styled-components';
import { node } from 'prop-types';
import React, { Component } from 'react';

import themeDefault from '../../theme';
import Button from '../../atoms/button';

// STYLES
const StyledMenu = styled.p`
color: ${({ theme }) => theme.color.primary};
`;

// THEME DEFAULT
StyledMenu.defaultProps = {
  theme: themeDefault,
};

// COMPONENT
class Menu extends Component {
  constructor(props) {
    super(props);

    //OPEN MENU
    this.handleMenu = () => {
      console.log('zzzz');
    };
  }

  render() {
    return (
      <Button onClick={this.handleMenu} />
    )
  }
}

// DOCUMENTATION
Menu.propTypes = {
  /** accepts only valid react nodes as children */
  children: node,
};

Menu.defaultProps = {
  children: 'default',
};

// EXPORT
export default Menu;
