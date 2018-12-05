// IMPORTS
import { node } from 'prop-types';
import React from 'react';

import Container from '../../atoms/container';
import Text from '../../atoms/text';
import Row from '../../atoms/row';
import Col from '../../atoms/col';

// COMPONENT
const Body = ({ title, textProps, fluid, ...rest }) => (
  <Container fluid noRadius lightGray {...rest}>
    <Container fluid={fluid}>
      <Row justify="space-between" hasContent>
        <Col grow={8} align="center"><Text {...textProps} type="h3">{title}</Text></Col>
      </Row>
    </Container>
  </Container>
);

// DOCUMENTATION
Body.propTypes = {
  /** accepts only valid react nodes as children */
  title: node,
};

Body.defaultProps = {
  title: 'body',
};

// EXPORT
export default Body;
