import { createStore } from 'redux';
import throttle from 'lodash/throttle';
import todoApp from './reducers';

const logger = ( store ) => {
  return ( next ) => {
    /* eslint-disable no-console */
    if ( !console.group ) {
      return next;
    }

    return ( action ) => {
      console.group( action.type );
      console.log( '%c prev state', 'color: gray', store.getState() );
      console.log( '%c action', 'color: blue', action );
      const returnValue = next( action );
      console.log( '%c next state', 'color: green', store.getState() );
      console.groupEnd( action.type );
      return returnValue;
    };
    /* eslint-disable no-console */
  };
};

// redux by default only allows dispatch of plain objects
// recognize if the response is a Promise or not
const promise = ( store ) => {
  return ( next ) => {
    return ( action ) => {
      if ( typeof action.then === 'function' ) {
        return action.then( next );
      }

      return next;
    };
  };
};

const wrapDispatchWithMiddlewares = ( store, middlewares ) => {
  // simulate a FILO overwrite to the store dispatch
  return middlewares.slice().reverse().forEach( ( middleware ) => {
    store.dispatch = middleware( store )( store.dispatch );
  } );
};


const configureStore = () => {
  // expose the store to be used in the react <TodoApp />
  // persistedState overrides the previous state value
  const store = createStore( todoApp );
  // simulate a FILO overwrite to the store dispatch
  const middlewares = [promise];

  if ( process.env.NODE_ENV !== 'production' ) {
    middlewares.push( logger );
  }

  wrapDispatchWithMiddlewares( store, middlewares );

  return store;
};

export default configureStore;
