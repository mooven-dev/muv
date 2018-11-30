import React from 'react';

import Menu from '.';

it('should render a menu', () => {
  const wrapper = mount(
    <Menu />,
  );
  expect(wrapper).toMatchSnapshot();
});
