import deepFreeze from 'deep-freeze';
import expect from 'expect';
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

const store = createStore( todos );

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
