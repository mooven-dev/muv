import React from 'react';

import Overlay from '.';

it('should render a overlay', () => {
  const wrapper = shallow(
    <Overlay />,
  ).dive();
  expect(wrapper).toMatchSnapshot();
});
