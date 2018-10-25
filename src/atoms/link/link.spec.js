import React from 'react';

import Link from '.';

it('should render a button', () => {
  const wrapper = shallow(
    <Link onClick={() => true} />,
  ).dive();
  expect(wrapper).toMatchSnapshot();
});


it('should render a anchor', () => {
  const wrapper = shallow(
    <Link href="#" />,
  ).dive();
  expect(wrapper).toMatchSnapshot();
});
