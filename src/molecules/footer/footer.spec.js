import React from 'react';

import Footer from '.';

it('should render a footer', () => {
  const wrapper = mount(
    <Footer />,
  );
  expect(wrapper).toMatchSnapshot();
});
