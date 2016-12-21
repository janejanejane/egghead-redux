import { combineReducers } from 'redux';
import byId, * as fromById from './byId';
import createList, * as fromList from './createList';

const listByFilter = combineReducers( {
  all: createList( 'all' ),
  active: createList( 'active' ),
  completed: createList( 'completed' ),
} );

const todos = combineReducers( {
  byId,
  listByFilter,
} );

export default todos;

// helps in filtering the todos based on the option clicked
// filter value are based on url string
// avoid storing in-memory at once
export const getVisibleTodos = ( state, filter ) => {
  const ids = fromList.getIds( state.listByFilter[filter] );
  return ids.map( ( id ) => { return fromById.getTodo( state.byId, id ); } );
};

export const getIsFetching = ( state, filter ) => {
  return fromList.getIsFetching( state.listByFilter[filter] );
};

export const getErrorMessage = ( state, filter ) => {
  return fromList.getErrorMessage( state.listByFilter[filter] );
};
