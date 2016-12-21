import { normalize } from 'normalizr';
import { getIsFetching } from '../reducers';
import * as schema from './schema';
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
          response: normalize( response, schema.arrayOfTodos ),
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
  return ( dispatch ) => {
    return api.addTodo( text ).then( ( response ) => {
      dispatch( {
        type: 'ADD_TODO_SUCCESS',
        response: normalize( response, schema.todo ),
      } );
    } );
  };
};

export const toggleTodo = ( id ) => {
  return ( dispatch ) => {
    api.toggleTodo( id ).then( ( response ) => {
      dispatch( {
        type: 'TOGGLE_TODO',
        response: normalize( response, schema.todo ),
      } );
    } );
  };
};
