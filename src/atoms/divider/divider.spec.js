import React from 'react';

import Divider from '.';

it('should render a divider', () => {
  const wrapper = mount(
    <Divider />,
  );
  expect(wrapper).toMatchSnapshot();
});
