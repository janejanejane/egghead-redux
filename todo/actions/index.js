import { v4 } from 'node-uuid';
import * as api from '../api';

const requestTodos = ( filter ) => {
  return ( {
    type: 'REQUEST_TODOS',
    filter,
  } );
};

const receiveTodos = ( filter, response ) => {
  return ( {
    type: 'RECEIVE_TODOS',
    filter,
    response,
  } );
};

// functions returned from other functions are called thunks
export const fetchTodos = ( filter ) => {
  return ( dispatch ) => {
    if ( getIsFetching( filter ) ) {
      return;
    }

    dispatch( requestTodos( filter ) );
    // returns a Promise that resolves to action object
    return api.fetchTodos( filter ).then( ( response ) => {
      // returns object synchronously
      dispatch( receiveTodos( filter, response ) );
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
