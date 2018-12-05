import React from 'react';

import Overlay from '.';

it('should render a overlay', () => {
  const wrapper = mount(
    <Overlay />,
  );
  expect(wrapper).toMatchSnapshot();
});
