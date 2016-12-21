import { combineReducers } from 'redux';

// specify a database-like syntax of state
const byId = ( state = {}, action ) => {
  switch ( action.type ) {
    case 'RECEIVE_TODOS':
      const nexState = { ...state };
      action.response.forEach( ( todo ) => {
        nexState[todo.id] = todo;
      } );
      return nexState;
    default:
      return state;
  }
};

// manages all the ids
const allIds = ( state = [], action ) => {
  if ( action.filter !== 'all' ) {
    return state;
  }
  // return data from server
  switch ( action.type ) {
    case 'RECEIVE_TODOS':
      return action.response.map( ( todo ) => { return todo.id; } );
    default:
      return state;
  }
};

const activeIds = ( state = [], action ) => {
  if ( action.filter !== 'active' ) {
    return state;
  }
  // return data from server
  switch ( action.type ) {
    case 'RECEIVE_TODOS':
      return action.response.map( ( todo ) => { return todo.id; } );
    default:
      return state;
  }
};

const completedIds = ( state = [], action ) => {
  if ( action.filter !== 'completed' ) {
    return state;
  }
  // return data from server
  switch ( action.type ) {
    case 'RECEIVE_TODOS':
      return action.response.map( ( todo ) => { return todo.id; } );
    default:
      return state;
  }
};

const idsByFilter = combineReducers( {
  all: allIds,
  active: activeIds,
  completed: completedIds,
} );

const todos = combineReducers( {
  byId,
  idsByFilter,
} );

export default todos;

// helps in filtering the todos based on the option clicked
// filter value are based on url string
// avoid storing in-memory at once
export const getVisibleTodos = ( state, filter ) => {
  const ids = state.idsByFilter[filter];
  return ids.map( ( id ) => { return state.byId[id]; } );
};
