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

it('should change its style on warn', () => {
  const wrapper = shallow(
    <Link warn href="#" />,
  ).dive();
  expect(wrapper).toMatchSnapshot();
});

it('should change its style on success', () => {
  const wrapper = shallow(
    <Link success href="#" />,
  ).dive();
  expect(wrapper).toMatchSnapshot();
});

it('should change its style on secondary', () => {
  const wrapper = shallow(
    <Link secondary href="#" />,
  ).dive();
  expect(wrapper).toMatchSnapshot();
});
