import React from 'react';

import Icon from '.';

it('should render a icon', () => {
  const wrapper = mount(
    <Icon />,
  );
  expect(wrapper).toMatchSnapshot();
});
