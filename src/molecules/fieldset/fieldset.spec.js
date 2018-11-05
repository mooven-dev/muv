import React from 'react';

import Fieldset from '.';

it('should render a fieldset', () => {
  const wrapper = mount(
    <Fieldset />,
  );
  expect(wrapper).toMatchSnapshot();
});
