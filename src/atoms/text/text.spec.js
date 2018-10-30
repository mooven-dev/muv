import React from 'react';

import Text from '.';

it('should render a text', () => {
  const wrapper = shallow(
    <Text />,
  ).dive();
  expect(wrapper).toMatchSnapshot();
});

it('should change its style if strong', () => {
  const wrapper = shallow(
    <Text strong />,
  ).dive();
  expect(wrapper).toMatchSnapshot();
});

it('should change its style on warn', () => {
  const wrapper = shallow(
    <Text warn />,
  ).dive();
  expect(wrapper).toMatchSnapshot();
});

it('should change its style on success', () => {
  const wrapper = shallow(
    <Text success />,
  ).dive();
  expect(wrapper).toMatchSnapshot();
});

it('should change its style on primary', () => {
  const wrapper = shallow(
    <Text primary />,
  ).dive();
  expect(wrapper).toMatchSnapshot();
});

it('should change its style on secondary', () => {
  const wrapper = shallow(
    <Text secondary />,
  ).dive();
  expect(wrapper).toMatchSnapshot();
});

it('should change its content concerning the type', () => {
  const h1 = shallow(
    <Text type="h1" />,
  ).dive();
  expect(h1).toMatchSnapshot();
  const h2 = shallow(
    <Text type="h2" />,
  ).dive();
  expect(h2).toMatchSnapshot();
  const h3 = shallow(
    <Text type="h3" />,
  ).dive();
  expect(h3).toMatchSnapshot();
  const h4 = shallow(
    <Text type="h4" />,
  ).dive();
  expect(h4).toMatchSnapshot();
  const h5 = shallow(
    <Text type="h5" />,
  ).dive();
  expect(h5).toMatchSnapshot();
  const h6 = shallow(
    <Text type="h6" />,
  ).dive();
  expect(h6).toMatchSnapshot();
});
