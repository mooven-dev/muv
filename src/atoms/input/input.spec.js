import React from 'react';

import Input from '.';

it('should render a input', () => {
  const wrapper = shallow(
    <Input />,
  ).dive();
  expect(wrapper).toMatchSnapshot();
});
