import { createStore } from 'redux';
import throttle from 'lodash/throttle';

import { loadState, saveState } from './localStorage';

import { todoApp } from './reducers';

const configureStore = () => {
  // use existing persisted data to populate the state
  const persistedState = loadState();

  // expose the store to be used in the react <TodoApp />
  // persistedState overrides the previous state value
  const store = createStore( todoApp, persistedState );

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
