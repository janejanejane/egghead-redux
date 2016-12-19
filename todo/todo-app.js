import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './todo';

import { TodoApp } from './TodoApp';

// use Provider from react-redux
// render once because specific components are subscribed to the store
render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById( 'todo-app' ),
);
