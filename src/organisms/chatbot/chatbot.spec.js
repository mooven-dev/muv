import React from 'react';

import Chatbot from '.';

it('should render a chatbot', () => {
  const wrapper = mount(
    <Chatbot />,
  );
  expect(wrapper).toMatchSnapshot();
});
