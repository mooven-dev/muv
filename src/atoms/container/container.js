import React from 'react';

import Container from '.';

it('should render a view', () => {
  const wrapper = mount(
    <Container />,
  );
  expect(wrapper).toMatchSnapshot();
});
