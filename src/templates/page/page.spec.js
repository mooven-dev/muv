import React from 'react';

import Page from '.';

it('should render a page', () => {
  const wrapper = mount(
    <Page />,
  );
  expect(wrapper).toMatchSnapshot();
});
