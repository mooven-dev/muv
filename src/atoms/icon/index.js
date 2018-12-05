// IMPORTS
import { string, bool } from 'prop-types';
import styled from 'styled-components';
import Ionicon from 'react-ionicons';
import React from 'react';

import themeDefault from '../../theme';

// STYLES
const StyledIcon = styled(Ionicon)`
transform: scale(1.25);
`;

// THEME DEFAULT
StyledIcon.defaultProps = {
  theme: themeDefault,
};

// COMPONENT
const Icon = ({ name, color, fontSize, ios, ...props }) => (
  <StyledIcon {...props} fontSize={fontSize} color={color} icon={`${ios ? 'ios' : 'md'}-${name}`} />
);

// DOCUMENTATION
Icon.propTypes = {
  /** sets the font-size of the icon, using a inline logic */
  fontSize: string,
  /** sets the color of the icon, using a inline logic */
  color: string,
  /** name of the icon, from material icons */
  name: string,
  /** change the icon style from material design to ios style */
  ios: bool,
};

Icon.defaultProps = {
  fontSize: '1rem',
  color: 'inherit',
  name: 'inherit',
  ios: false,
};

// EXPORT
export default Icon;
