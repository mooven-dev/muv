import React from 'react';

import MenuButton from '.';

it('should render a menuButton', () => {
  const wrapper = mount(
    <MenuButton />,
  );
  expect(wrapper).toMatchSnapshot();
});
