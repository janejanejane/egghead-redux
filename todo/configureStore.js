import { createStore } from 'redux';
import throttle from 'lodash/throttle';
import todoApp from './reducers';

const addLoggingToDispatch = ( store ) => {
  /* eslint-disable no-console */
  const rawDispatch = store.dispatch;
  if ( !console.group ) {
    return rawDispatch;
  }

  return ( action ) => {
    console.group( action.type );
    console.log( '%c prev state', 'color: gray', store.getState() );
    console.log( '%c action', 'color: blue', action );
    const returnValue = rawDispatch( action );
    console.log( '%c next state', 'color: green', store.getState() );
    console.groupEnd( action.type );
    return returnValue;
  };
  /* eslint-disable no-console */
};

// redux by default only allows dispatch of plain objects
// recognize if the response is a Promise or not
const addPromiseSupportToDispatch = ( store ) => {
  const rawDispatch = store.dispatch;
  return ( action ) => {
    if ( typeof action.then === 'function' ) {
      return action.then( rawDispatch );
    }

    return rawDispatch;
  };
};

const configureStore = () => {
  // expose the store to be used in the react <TodoApp />
  // persistedState overrides the previous state value
  const store = createStore( todoApp );

  if ( process.env.NODE_ENV !== 'production' ) {
    store.dispatch = addLoggingToDispatch( store );
  }

  store.dispatch = addPromiseSupportToDispatch( store );

  return store;
};

export default configureStore;
