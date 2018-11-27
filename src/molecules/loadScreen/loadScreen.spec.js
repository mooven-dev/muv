import React from 'react';

import LoadScreen from '.';

it('should render a loadScreen', () => {
  const wrapper = mount(
    <LoadScreen />,
  );
  expect(wrapper).toMatchSnapshot();
});
