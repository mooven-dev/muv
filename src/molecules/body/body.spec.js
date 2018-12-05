import React from 'react';

import Body from '.';

it('should render a body', () => {
  const wrapper = mount(
    <Body />,
  );
  expect(wrapper).toMatchSnapshot();
});
