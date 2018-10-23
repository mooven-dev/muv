import React from 'react';

import Component from './';

it('should render a component', () => {
  const wrapper = shallow(
    <Component />,
  ).dive();
  expect(wrapper.props().color).toEqual('#0082c8');
  expect(wrapper).toMatchSnapshot();
});

it('should render a component with a prop', () => {
  const wrapper = shallow(
    <Component strong />,
  ).dive();
  expect(wrapper).toMatchSnapshot();
});

it('should render a component with a color', () => {
  const wrapper = shallow(
    <Component color="black" />,
  ).dive();
  expect(wrapper).toMatchSnapshot();
});
