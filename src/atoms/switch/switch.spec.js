import React from 'react';

import Switch from '.';

it('should render a switch', () => {
  const wrapper = mount(
    <Switch />,
  );
  expect(wrapper).toMatchSnapshot();
});
