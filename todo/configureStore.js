import { createStore } from 'redux';
import throttle from 'lodash/throttle';

import { loadState, saveState } from './localStorage';

import todoApp from './reducers';

const addLoggingToDispatch = ( store ) => {
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
};

const configureStore = () => {
  // use existing persisted data to populate the state
  const persistedState = loadState();

  // expose the store to be used in the react <TodoApp />
  // persistedState overrides the previous state value
  const store = createStore( todoApp, persistedState );

  if ( process.env.NODE_ENV !== 'production' ) {
    store.dispatch = addLoggingToDispatch( store );
  }

  // subscribe to the changes of the store
  // ensure that writing to localStorage occurs only once per second
  store.subscribe( throttle( () => {
    saveState( {
      todos: store.getState().todos,
    } );
  } ), 1000 );

  return store;
};

export default configureStore;
