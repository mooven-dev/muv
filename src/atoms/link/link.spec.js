import React from 'react';

import Link from '.';

it('should render a button', () => {
  const wrapper = mount(
    <Link onClick={() => true} />,
  );
  expect(wrapper).toMatchSnapshot();
});


it('should render a anchor', () => {
  const wrapper = mount(
    <Link href="#" />,
  );
  expect(wrapper).toMatchSnapshot();
});

it('should change its style on warn', () => {
  const wrapper = mount(
    <Link warn href="#" />,
  );
  expect(wrapper).toMatchSnapshot();
});

it('should change its style on success', () => {
  const wrapper = mount(
    <Link success href="#" />,
  );
  expect(wrapper).toMatchSnapshot();
});

it('should change its style on secondary', () => {
  const wrapper = mount(
    <Link secondary href="#" />,
  );
  expect(wrapper).toMatchSnapshot();
});
