import React from 'react';

import Input from '.';

it('should render a input', () => {
  const wrapper = shallow(
    <Input />,
  ).dive();
  expect(wrapper).toMatchSnapshot();
});

it('should change its style on error', () => {
  const wrapper = shallow(
    <Input error />,
  ).dive();
  expect(wrapper).toMatchSnapshot();
});

it('should change its style on success', () => {
  const wrapper = shallow(
    <Input success />,
  ).dive();
  expect(wrapper).toMatchSnapshot();
});

it('should change its style if disabled', () => {
  const wrapper = shallow(
    <Input disabled />,
  ).dive();
  expect(wrapper).toMatchSnapshot();
});

it('should change its style if required', () => {
  const wrapper = shallow(
    <Input required />,
  ).dive();
  expect(wrapper).toMatchSnapshot();
});
