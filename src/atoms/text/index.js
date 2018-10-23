// IMPORTS
import { string, bool, number } from 'prop-types';
import styled from 'styled-components';
import React from 'react';

// STYLES

const commonStyles = ({
  strong, align, margin, color, transform,
}) => (`
font-weight: ${(strong ? 'bold' : 'inherit')};
text-transform: ${transform};
text-align: ${align};
margin: ${margin};
color: ${color};
`);

export const P = styled.p`
${props => commonStyles(props)}
font-family: sans-serif;
font-size: 1rem;
`;

export const H1 = styled.h1`
${props => commonStyles(props)}
font-family: sans-serif;
font-size: 2.5rem;
`;

export const H2 = styled.h2`
${props => commonStyles(props)}
font-family: sans-serif;
font-size: 1.5rem;
`;

export const H3 = styled.h3`
${props => commonStyles(props)}
font-family: sans-serif;
font-size: 1.25rem;
`;

export const H4 = styled.h4`
${props => commonStyles(props)}
font-family: sans-serif;
font-size: 1rem;
`;

export const H5 = styled.h5`
${props => commonStyles(props)}
font-family: sans-serif;
font-size: .9rem;
`;

export const H6 = styled.h6`
${props => commonStyles(props)}
font-family: sans-serif;
font-size: .825rem;
`;

// COMPONENT
const Text = ({ h, strong, ...props }) => {
  switch (h) {
    case 1:
      return <H1 strong={!strong} {...props} />;
    case 2:
      return <H2 strong={!strong} {...props} />;
    case 3:
      return <H3 strong={!strong} {...props} />;
    case 4:
      return <H4 strong={!strong} {...props} />;
    case 5:
      return <H5 strong={!strong} {...props} />;
    case 6:
      return <H6 strong={!strong} {...props} />;
    default:
      return <P strong={strong} {...props} />;
  }
};

// DOCUMENTATION
Text.propTypes = {
  /** accepts only text as children */
  children: string,
  /** sets color of the text as the color prop */
  color: string,
  /** sets text-transform value */
  transform: string,
  /** sets font-weight as bold */
  strong: bool,
  /** sets the margins */
  margin: string,
  /** sets the text-align */
  align: string,
  /** sets the heading hierarch */
  h: number,
};

Text.defaultProps = {
  children: 'default',
  transform: 'normal',
  margin: '0 0 0 0',
  color: '#0082c8',
  align: 'left',
  strong: false,
  h: 0,
};

// EXPORT
export default Text;
