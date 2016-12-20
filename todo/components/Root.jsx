import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import TodoApp from './TodoApp';

// use Router to load the app and become source of truth
// to avoid hash symbols, use browserHistory
// :filter will be passed by react-router to the app through params
const Root = ( { store } ) => {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/(:filter)" component={TodoApp} />
      </Router>
    </Provider>
  );
};

export default Root;
