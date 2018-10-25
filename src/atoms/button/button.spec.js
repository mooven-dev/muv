import React from 'react';

import Button from '.';

it('should render a button', () => {
  const wrapper = shallow(
    <Button onClick={() => true} />,
  ).dive();
  expect(wrapper).toMatchSnapshot();
});


it('should render a anchor', () => {
  const wrapper = shallow(
    <Button href="#" />,
  ).dive();
  expect(wrapper).toMatchSnapshot();
});
