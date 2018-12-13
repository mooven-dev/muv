// IMPORTS
import { bool, string } from 'prop-types';
import styled from 'styled-components';
import React from 'react';

import themeDefault from '../../theme';
import { setColor } from '../../utils';

const commonStyles = ({ transform, strong, align, theme, isLabel, spacing, ...rest }) => (`
font-weight: ${(strong || isLabel ? 'bold' : 'inherit')};
letter-spacing: ${spacing || theme.font.spacing};
white-space: ${isLabel ? 'nowrap' : 'wrap'};
color: ${setColor({ theme, ...rest })};
font-family: ${theme.font.family};
text-transform: ${transform};
text-align: ${align};
margin: .125em;
line-height: 1;
`);

export const P = styled.p`
font-size: ${({ isLabel, small }) => (isLabel || small ? '.875rem' : '1rem')};
${props => commonStyles(props)}
`;

P.defaultProps = {
  theme: themeDefault,
};

export const Span = styled.span`
font-size: ${({ isLabel, small }) => (isLabel || small ? '.875rem' : '1rem')};
${props => commonStyles(props)}
`;

Span.defaultProps = {
  theme: themeDefault,
};

export const H1 = styled.h1`
${props => commonStyles(props)}
font-size: 4rem;
`;

H1.defaultProps = {
  theme: themeDefault,
};

export const H2 = styled.h2`
${props => commonStyles(props)}
font-size: 2rem;
`;

H2.defaultProps = {
  theme: themeDefault,
};

export const H3 = styled.h3`
${props => commonStyles(props)}
font-size: 1.5rem;
`;

H3.defaultProps = {
  theme: themeDefault,
};

export const H4 = styled.h4`
${props => commonStyles(props)}
font-size: 1.25rem;
`;

H4.defaultProps = {
  theme: themeDefault,
};

export const H5 = styled.h5`
${props => commonStyles(props)}
font-size: 1rem;
`;

H5.defaultProps = {
  theme: themeDefault,
};

export const H6 = styled.h6`
${props => commonStyles(props)}
font-size: .875rem;
`;

H6.defaultProps = {
  theme: themeDefault,
};

// COMPONENT
const Text = ({ type, ...props }) => {
  const { strong } = props;
  switch (type) {
    case 'span':
      return <Span {...props} />;
    case 'h1':
      return <H1 strong={!strong} {...props} />;
    case 'h2':
      return <H2 strong={!strong} {...props} />;
    case 'h3':
      return <H3 strong={!strong} {...props} />;
    case 'h4':
      return <H4 strong={!strong} {...props} />;
    case 'h5':
      return <H5 strong={!strong} {...props} />;
    case 'h6':
      return <H6 strong={!strong} {...props} />;
    default:
      return <P {...props} />;
  }
};

// DOCUMENTATION
Text.propTypes = {
  /** accepts only text as children */
  children: string,
  /** sets text-transform value */
  transform: string,
  /** sets font-weight as bold */
  strong: bool,
  /** sets font-size to 80% */
  small: bool,
  /** sets font-weight and size to matchs isLabel style */
  isLabel: bool,
  /** sets the text-align */
  align: string,
  /** sets the heading hierarch */
  type: string,
};

Text.defaultProps = {
  transform: 'none',
  children: 'default',
  strong: false,
  small: false,
  isLabel: false,
  align: 'left',
  type: '',
};

// EXPORT
export default Text;
