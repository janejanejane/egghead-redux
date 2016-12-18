import deepFreeze from 'deep-freeze';
import expect from 'expect';
// import { combineReducers, createStore } from 'redux';
import { createStore } from 'redux';

const todo = ( state, action ) => {
  switch ( action.type ) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false,
      };
    case 'TOGGLE_TODO':
      if ( state.id !== action.id ) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed,
      };
    default:
      return state;
  }
};

const todos = ( state = [], action ) => {
  switch ( action.type ) {
    case 'ADD_TODO':
      return [
        ...state,
        todo( undefined, action ),
      ];
    case 'TOGGLE_TODO':
      return state.map( ( t ) => { return todo( t, action ); } );
    default:
      return state;
  }
};

const visibilityFilter = ( state = 'SHOW_ALL', action ) => {
  switch ( action.type ) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

// multiple reducers without using redux
// const todoApp = ( state = {}, action ) => {
//   return {
//     todos: todos(
//       state.todos,
//       action,
//     ),
//     visibilityFilter: visibilityFilter(
//       state.visibilityFilter,
//       action,
//     ),
//   };
// };

// combineReducers from scratch
const combineReducers = ( reducers ) => {
  // combineReducers will return a reducer
  return ( state = {}, action ) => {
    // return all the keys of the reducer
    return Object.keys( reducers ).reduce(
      // produce a single value
      ( nextState, key ) => {
        nextState[key] = reducers[key](
          state[key],
          action,
        );
        return nextState;
      },
      {},
    );
  };
};

const todoApp = combineReducers( {
  todos,
  visibilityFilter,
} );

const store = createStore( todoApp );

console.log( 'Initial state:' );
console.log( store.getState() );
console.log( '--------------' );

console.log( 'Dispatching ADD_TODO.' );
store.dispatch( {
  type: 'ADD_TODO',
  id: 0,
  text: 'Learn Redux',
} );
console.log( 'Current state:' );
console.log( store.getState() );
console.log( '--------------' );

console.log( 'Dispatching ADD_TODO.' );
store.dispatch( {
  type: 'ADD_TODO',
  id: 1,
  text: 'Go shopping',
} );
console.log( 'Current state:' );
console.log( store.getState() );
console.log( '--------------' );

console.log( 'Dispatching TOGGLE_TODO.' );
store.dispatch( {
  type: 'TOGGLE_TODO',
  id: 0,
} );
console.log( 'Current state:' );
console.log( store.getState() );
console.log( '--------------' );

console.log( 'Dispatching SET_VISIBILITY_FILTER.' );
store.dispatch( {
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED',
} );
console.log( 'Current state:' );
console.log( store.getState() );
console.log( '--------------' );
