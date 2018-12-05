// IMPORTS
import { node } from 'prop-types';
import React from 'react';
import moment from 'moment';

import Container from '../../atoms/container';
import Text from '../../atoms/text';
import Row from '../../atoms/row';

// COMPONENT
const Footer = ({ title, textProps, fluid, children, ...rest }) => (
  <Container fluid noRadius lightGray {...rest}>
    <Container fluid={fluid}>
      {children && <Row hasContent>{children}</Row>}
      <Row justify="space-around" hasContent>
        <Text {...textProps} isLabel>
          {title}
          &nbsp;&copy;&nbsp;
          {moment().format('YYYY')}
        </Text>
      </Row>
    </Container>
  </Container>
);

// DOCUMENTATION
Footer.propTypes = {
  /** accepts only valid react nodes as children */
  title: node,
};

Footer.defaultProps = {
  title: 'props.title',
};

// EXPORT
export default Footer;
