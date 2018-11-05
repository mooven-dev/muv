import React from 'react';

import Modal from '.';

it('should render a modal', () => {
  const wrapper = mount(
    <Modal />,
  );
  expect(wrapper).toMatchSnapshot();
});
