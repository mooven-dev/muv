// IMPORTS
import { node } from 'prop-types';
import React from 'react';

import Container from '../../atoms/container';
import Header from '../../molecules/header';
import Footer from '../../molecules/footer';
import { getColorProps } from '../../utils';

// COMPONENT
const Page = ({ fluid, textProps, header, ...props }) => {
  const { colorProps, ...rest } = getColorProps(props);
  const templateProps = { fluid, textProps, ...colorProps };
  const contentProps = { fluid, ...rest };
  return (
    <>
      {header({ ...templateProps })}
      <Container {...contentProps} />
      <Footer {...templateProps} />
    </>
  );
};

// DOCUMENTATION
Page.propTypes = {
  /** accepts only valid react nodes as children */
  children: node,
};

Page.defaultProps = {
  children: 'default',
  header: props => <Header {...props} />,
};

// EXPORT
export default Page;
