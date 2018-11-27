import React from 'react';

import Counter from '.';

it('should render a counter', () => {
  const wrapper = mount(
    <Counter />,
  );
  expect(wrapper).toMatchSnapshot();
});
