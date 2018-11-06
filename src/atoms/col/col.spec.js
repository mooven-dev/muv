import React from 'react';

import Col from '.';

it('should render a col', () => {
  const wrapper = mount(
    <Col />,
  );
  expect(wrapper).toMatchSnapshot();
});
