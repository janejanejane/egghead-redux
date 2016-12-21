import { v4 } from 'node-uuid';
import { getIsFetching } from '../reducers';
import * as api from '../api';

// functions returned from other functions are called thunks
export const fetchTodos = ( filter ) => {
  // passed getState from configureStore
  return ( dispatch, getState ) => {
    if ( getIsFetching( getState(), filter ) ) {
      return Promise.resolve();
    }

    dispatch( {
      type: 'FETCH_TODOS_REQUEST',
      filter,
    } );
    // returns a Promise that resolves to action object
    return api.fetchTodos( filter ).then(
      ( response ) => {
        // returns object synchronously
        dispatch( {
          type: 'FETCH_TODOS_SUCCESS',
          filter,
          response,
        } );
      },
      ( error ) => {
        dispatch( {
          type: 'FETCH_TODOS_FAILURE',
          filter,
          message: error.message || 'Something went wrong.',
        } );
      } );
  };
};

// isolate action creators
export const addTodo = ( text ) => {
  return {
    type: 'ADD_TODO',
    id: v4(), // generate uuid to avoid React error on keys
    text,
  };
};

export const toggleTodo = ( id ) => {
  return {
    type: 'TOGGLE_TODO',
    id,
  };
};
