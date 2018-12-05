import React from 'react';

import Fab from '.';

it('should render a fab', () => {
  const wrapper = mount(
    <Fab />,
  );
  expect(wrapper).toMatchSnapshot();
});
