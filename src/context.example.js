import React, { createContext } from 'react';

const Context = createContext();
const { Consumer } = Context;

const Provider = props => (
  <Context.Provider {...props} />
);

export { Provider, Consumer, Context };
