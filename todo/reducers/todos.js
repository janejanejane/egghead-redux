import { combineReducers } from 'redux';
import todo from './todo';

// specify a database-like syntax of state
const byId = ( state = {}, action ) => {
  switch ( action.type ) {
    case 'ADD_TODO':
    case 'TOGGLE_TODO':
      return {
        ...state,
        [action.id]: todo( state[action.id], action ),
      };
    default:
      return state;
  }
};

// manages all the ids
const allIds = ( state = [], action ) => {
  switch ( action.type ) {
    case 'ADD_TODO':
      return [...state, action.id];
    default:
      return state;
  }
};

const todos = combineReducers( {
  byId,
  allIds,
} );

export default todos;

// selector to get all the ids
const getAllTodos = ( state ) => {
  return state.allIds.map( ( id ) => {
    return state.byId[id];
  } );
};

// helps in filtering the todos based on the option clicked
// filter value are based on url string
export const getVisibleTodos = (
  state,
  filter,
) => {
  const allTodos = getAllTodos( state );
  switch ( filter ) {
    case 'all':
      return allTodos;
    case 'completed':
      return allTodos.filter(
        ( t ) => { return t.completed; },
      );
    case 'active':
      return allTodos.filter(
        ( t ) => { return !t.completed; },
      );
    default:
      throw new Error( `Unknown filter: ${filter}.` );
  }
};
