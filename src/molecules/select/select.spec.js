import React from 'react';

import Select from '.';

it('should render a select', () => {
  const wrapper = mount(
    <Select />,
  );
  expect(wrapper).toMatchSnapshot();
});
