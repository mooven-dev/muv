import React from 'react';

import ChatMessage from '.';

it('should render a chatMessage', () => {
  const wrapper = mount(
    <ChatMessage />,
  );
  expect(wrapper).toMatchSnapshot();
});
