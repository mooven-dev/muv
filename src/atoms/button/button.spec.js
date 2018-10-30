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

it('should change its style on warn', () => {
  const wrapper = shallow(
    <Button warn href="#" />,
  ).dive();
  expect(wrapper).toMatchSnapshot();
});

it('should change its style on success', () => {
  const wrapper = shallow(
    <Button success href="#" />,
  ).dive();
  expect(wrapper).toMatchSnapshot();
});


it('should change its style on outline', () => {
  const wrapper = shallow(
    <Button outline href="#" />,
  ).dive();
  expect(wrapper).toMatchSnapshot();
});
