import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import todoApp from './reducers';

// dispatch multiple actions asynchronously
const thunk = ( store ) => {
  return ( next ) => {
    return ( action ) => {
      return ( typeof action === 'function' ) ?
        action( store.dispatch ) :
        next( action );
    };
  };
};

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
