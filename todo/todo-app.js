import React from 'react';
import { render } from 'react-dom';

import configureStore from './configureStore';
import Root from './Root';

const store = configureStore();
// use Provider from react-redux
// render once because specific components are subscribed to the store
render(
  <Root store={store} />,
  document.getElementById( 'todo-app' ),
);
