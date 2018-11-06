import React from 'react';

import Container from '.';

it('should render a Container', () => {
  const wrapper = mount(
    <Container />,
  );
  expect(wrapper).toMatchSnapshot();
});
