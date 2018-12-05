import React from 'react';

import Header from '.';

it('should render a header', () => {
  const wrapper = mount(
    <Header />,
  );
  expect(wrapper).toMatchSnapshot();
});
