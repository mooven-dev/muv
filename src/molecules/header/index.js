// IMPORTS
// import styled from 'styled-components';
import { node } from 'prop-types';
import React from 'react';

import Container from '../../atoms/container';
import Text from '../../atoms/text';
import Row from '../../atoms/row';
import Col from '../../atoms/col';
import Menu from '../../molecules/menu';

// COMPONENT
const Header = ({ title, textProps, fluid, children, button, ...rest }) => (
  <Container fluid noRadius lightGray {...rest}>
    <Container fluid={fluid}>
      {children && <Row>{children}</Row> }
      <Row justify="space-between" hasContent>
        <Col><Menu /></Col>
        <Col grow={8} align="center"><Text {...textProps} type="h3">{title}</Text></Col>
        <Col><span /></Col>
      </Row>
    </Container>
  </Container>
);

// DOCUMENTATION
Header.propTypes = {
  /** accepts only valid react nodes as children */
  title: node,
};

Header.defaultProps = {
  title: 'header',
};

// EXPORT
export default Header;
