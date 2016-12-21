import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import todoApp from './reducers';

const configureStore = () => {
  // simulate a FILO overwrite to the store dispatch
  const middlewares = [thunk];

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
