import React from 'react';

import Input from '.';

it('should render a input', () => {
  const wrapper = mount(
    <Input />,
  );
  expect(wrapper).toMatchSnapshot();
});

it('should change its style on error', () => {
  const wrapper = mount(
    <Input error />,
  );
  expect(wrapper).toMatchSnapshot();
});

it('should change its style on success', () => {
  const wrapper = mount(
    <Input success />,
  );
  expect(wrapper).toMatchSnapshot();
});

it('should change its style if disabled', () => {
  const wrapper = mount(
    <Input disabled />,
  );
  expect(wrapper).toMatchSnapshot();
});

it('should change its style if required', () => {
  const wrapper = mount(
    <Input required />,
  );
  expect(wrapper).toMatchSnapshot();
});
