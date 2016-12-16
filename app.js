// import { createStore } from 'redux';
import expect from 'expect';

// actions that determine the store value
const counter = ( state = 0, action ) => {
  switch ( action.type ) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

// createStore from scratch
const createStore = ( reducer ) => {
  let state;
  let listeners = [];

  // just return the state
  const getState = () => { return state; };

  const dispatch = ( action ) => {
    // this changes the state value
    state = reducer( state, action );
    // after the state change, update all the listeners that were subscribed on the state
    listeners.forEach( ( listener ) => { return listener(); } );
  };

  const subscribe = ( listener ) => {
    // put new listeners in the array
    listeners.push( listener );
    // this unsubscribes the listener
    return () => {
      listeners = listeners.filter( ( l ) => { return l !== listener; } );
    };
  };

  // this returns the initial value of the state
  dispatch( {} );

  return { getState, dispatch, subscribe };
};

const store = createStore( counter );

// method called to change the value displayed on the body
const render = () => {
  document.getElementById( 'root' ).innerText = store.getState();
};

// specify the change listener called every time an action is dispatched
store.subscribe( render );
// call on load to show value 0
render();

// add event handling on the document and use redux dispatch to update value
document.addEventListener( 'click', () => {
  store.dispatch( { type: 'INCREMENT' } );
} );

// pass tests for the state actions
expect(
  counter( 0, { type: 'INCREMENT' } ),
).toEqual( 1 );

expect(
  counter( 1, { type: 'INCREMENT' } ),
).toEqual( 2 );

expect(
  counter( 2, { type: 'DECREMENT' } ),
).toEqual( 1 );

expect(
  counter( 1, { type: 'DECREMENT' } ),
).toEqual( 0 );

expect(
  counter( 1, { type: 'SOMETHING' } ),
).toEqual( 1 );

expect(
  counter( undefined, {} ),
).toEqual( 0 );

console.log( 'Tests passed!' );
