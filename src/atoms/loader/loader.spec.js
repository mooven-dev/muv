import React from 'react';

import Loader from '.';

it('should render a loader', () => {
  const wrapper = mount(
    <Loader />,
  );
  expect(wrapper).toMatchSnapshot();
});
