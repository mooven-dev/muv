import React from 'react';

import Badge from '.';

it('should render a badge', () => {
  const wrapper = mount(
    <Badge />,
  );
  expect(wrapper).toMatchSnapshot();
});
