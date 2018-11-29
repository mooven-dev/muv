// IMPORTS
// import styled from 'styled-components';
import { node } from 'prop-types';
import React from 'react';

import Container from '../../atoms/container';
import Text from '../../atoms/text';
import Row from '../../atoms/row';
import Col from '../../atoms/col';

// COMPONENT
const Header = ({ title, textProps, fluid, ...rest }) => (
  <Container fluid noRadius lightGray {...rest}>
    <Container fluid={fluid}>
      <Row justify="space-between" hasContent>
        <Col><Text {...textProps} type="h3">|||</Text></Col>
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
