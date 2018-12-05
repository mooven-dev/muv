import React from 'react';

import Arrow from '.';

it('should render a arrow', () => {
  const wrapper = mount(
    <Arrow />,
  );
  expect(wrapper).toMatchSnapshot();
});
