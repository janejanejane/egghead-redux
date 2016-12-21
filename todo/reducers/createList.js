import { combineReducers } from 'redux';

const createList = ( filter ) => {
  const ids = ( state = [], action ) => {
    // return data from server
    if ( action.filter !== filter ) {
      return state;
    }
    console.log( 'action:', action );
    switch ( action.type ) {
      case 'FETCH_TODOS_SUCCESS':
        return action.response.map( ( todo ) => { return todo.id; } );
      default:
        return state;
    }
  };

  const isFetching = ( state = false, action ) => {
    if ( action.filter !== filter ) {
      return state;
    }
    switch ( action.type ) {
      case 'FETCH_TODOS_REQUEST':
        return true;
      case 'FETCH_TODOS_SUCCESS':
      case 'FETCH_TODOS_FAILURE':
        return false;
      default:
        return state;
    }
  };

  const errorMessage = ( state = false, action ) => {
    if ( action.filter !== filter ) {
      return state;
    }
    switch ( action.type ) {
      case 'FETCH_TODOS_FAILURE':
        return action.message;
      case 'FETCH_TODOS_REQUEST':
      case 'FETCH_TODOS_SUCCESS':
        return null;
      default:
        return state;
    }
  };

  return combineReducers( {
    ids,
    isFetching,
    errorMessage,
  } );
};

export default createList;

export const getIds = ( state ) => { return state.ids; };
export const getIsFetching = ( state ) => { return state.isFetching; };
export const getErrorMessage = ( state ) => { return state.errorMessage; };
