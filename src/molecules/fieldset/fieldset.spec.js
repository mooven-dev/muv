import React from 'react';

import Fieldset from '.';

it('should render a fieldset', () => {
  const wrapper = shallow(
    <Fieldset />,
  ).dive();
  expect(wrapper).toMatchSnapshot();
});
