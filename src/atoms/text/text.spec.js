import React from 'react';

import Text from '.';

it('should render a text', () => {
  const wrapper = shallow(
    <Text />,
  ).dive();
  expect(wrapper).toMatchSnapshot();
});

it('should render a text with a prop', () => {
  const wrapper = shallow(
    <Text strong />,
  ).dive();
  expect(wrapper).toMatchSnapshot();
});
