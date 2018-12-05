import React from 'react';

import Button from '.';

it('should render a button', () => {
  const wrapper = mount(
    <Button onClick={() => true} />,
  );
  expect(wrapper).toMatchSnapshot();
});

it('should render a anchor', () => {
  const wrapper = mount(
    <Button href="#" />,
  );
  expect(wrapper).toMatchSnapshot();
});

it('should change its style on warn', () => {
  const wrapper = mount(
    <Button warn href="#" />,
  );
  expect(wrapper).toMatchSnapshot();
});

it('should change its style on success', () => {
  const wrapper = mount(
    <Button success href="#" />,
  );
  expect(wrapper).toMatchSnapshot();
});


it('should change its style on outline', () => {
  const wrapper = mount(
    <Button outline href="#" />,
  );
  expect(wrapper).toMatchSnapshot();
});
