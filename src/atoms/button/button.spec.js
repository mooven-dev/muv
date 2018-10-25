import React from 'react';

import Button from '.';

it('should render a button', () => {
  const wrapper = shallow(
    <Button />,
  ).dive();
  expect(wrapper).toMatchSnapshot();
});
