// IMPORTS
import { node, bool, func, string } from 'prop-types';
import React from 'react';

import Container from '../../atoms/container';
import Text from '../../atoms/text';
import Row from '../../atoms/row';
import Col from '../../atoms/col';
import Menu from '../menu';

// COMPONENT
const Header = ({
  children, dark, title, fluid, left, leftProps, right, rightProps, ...rest
}) => (
  <Container fluid noRadius lightGray {...rest}>
    <Container fluid={fluid}>
      <Row justify="space-between">
        {/* MENU / LEFT COMPONENT */}
        <Col hasContent grow={0}>{left(leftProps)}</Col>
        {/* PAGE TITLE */}
        <Col hasContent align="center">
          <Text transform="capitalize" white={dark} type="h3">{title}</Text>
        </Col>
        {/* RIGHT COMPONENT */}
        <Col hasContent grow={0}>{right(rightProps)}</Col>
      </Row>
      {children && <Row hasContent>{children}</Row>}
    </Container>
  </Container>
);

// DOCUMENTATION
Header.propTypes = {
  /** the header or page title */
  title: string,
  /** accepts valid react nodes as children, usefull to render navbars, for example */
  children: node,
  /** used to change the text color to set dark backgrounds */
  dark: bool,
  /** sets the inner container to fluid (max-width: 100%) */
  fluid: bool,
  /** component to be rendered on the right side of the header */
  right: node,
  /** component to be rendered on the left side of the header, like a logo or a menu */
  left: func,
};

Header.defaultProps = {
  left: props => <Menu {...props} />,
  right: props => <span />,
  title: 'props.title',
  children: null,
  fluid: false,
  dark: false,
};

// EXPORT
export default Header;
