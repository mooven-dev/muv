import React from 'react';

import Row from '.';

it('should render a row', () => {
  const wrapper = mount(
    <Row />,
  );
  expect(wrapper).toMatchSnapshot();
});
