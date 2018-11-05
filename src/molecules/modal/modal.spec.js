import React from 'react';

import Modal from '.';

it('should render a modal', () => {
  const wrapper = mount(
    // MOUNT METHOD CREATES SNAPSHOTS TOO MUCH DETAILED, USE CAREFULLY
    <Modal />,
  );
  expect(wrapper).toMatchSnapshot();
});
