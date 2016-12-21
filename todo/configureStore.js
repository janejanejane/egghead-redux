import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import todoApp from './reducers';

const configureStore = () => {
  // simulate a FILO overwrite to the store dispatch
  const middlewares = [promise];

  if ( process.env.NODE_ENV !== 'production' ) {
    middlewares.push( createLogger() );
  }

  // expose the store to be used in the react <TodoApp />
  return createStore(
    todoApp,
    applyMiddleware( ...middlewares ), //enhancer
  );
};

export default configureStore;
