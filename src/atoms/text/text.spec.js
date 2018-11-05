import React from 'react';

import Text from '.';

it('should render a text', () => {
  const wrapper = mount(
    <Text />,
  );
  expect(wrapper).toMatchSnapshot();
});

it('should change its style if strong', () => {
  const wrapper = mount(
    <Text strong />,
  );
  expect(wrapper).toMatchSnapshot();
});

it('should change its style on warn', () => {
  const wrapper = mount(
    <Text warn />,
  );
  expect(wrapper).toMatchSnapshot();
});

it('should change its style on success', () => {
  const wrapper = mount(
    <Text success />,
  );
  expect(wrapper).toMatchSnapshot();
});

it('should change its style on primary', () => {
  const wrapper = mount(
    <Text primary />,
  );
  expect(wrapper).toMatchSnapshot();
});

it('should change its style on secondary', () => {
  const wrapper = mount(
    <Text secondary />,
  );
  expect(wrapper).toMatchSnapshot();
});

it('should change its content concerning the type', () => {
  const h1 = mount(
    <Text type="h1" />,
  );
  expect(h1).toMatchSnapshot();
  const h2 = mount(
    <Text type="h2" />,
  );
  expect(h2).toMatchSnapshot();
  const h3 = mount(
    <Text type="h3" />,
  );
  expect(h3).toMatchSnapshot();
  const h4 = mount(
    <Text type="h4" />,
  );
  expect(h4).toMatchSnapshot();
  const h5 = mount(
    <Text type="h5" />,
  );
  expect(h5).toMatchSnapshot();
  const h6 = mount(
    <Text type="h6" />,
  );
  expect(h6).toMatchSnapshot();
});
