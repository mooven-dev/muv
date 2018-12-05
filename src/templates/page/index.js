// IMPORTS
import { node, func } from 'prop-types';
import React from 'react';

import Container from '../../atoms/container';
import Row from '../../atoms/row';
import Header from '../../molecules/header';
import Footer from '../../molecules/footer';

// COMPONENT
const Page = ({
  fluid, textProps, header, headerProps, body, footer, footerProps, full, ...rest
}) => {
  const templateProps = { fluid, textProps };
  const contentProps = { fluid, ...rest };
  return (
    <Container flex fluid full={full}>
      {header({ ...templateProps, ...headerProps })}
      {body({ ...contentProps })}
      {footer({ ...templateProps, ...footerProps })}
    </Container>
  );
};

// DOCUMENTATION
Page.propTypes = {
  /** accepts only valid react nodes as children */
  children: node,
  header: func,
  footer: func,
  body: func,
};

Page.defaultProps = {
  children: 'props.children',
  header: props => <Header {...props} />,
  body: props => <Row hasContent {...props} />,
  footer: props => <Footer {...props} />,
};

// EXPORT
export default Page;
