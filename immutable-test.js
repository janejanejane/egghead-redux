import deepFreeze from 'deep-freeze';
import expect from 'expect';

const addCounter = ( list ) => {
  // ensure that the object is not mutated

  // ES5 syntax
  // return list.concat( 0 );

  // ES6 syntax
  return [...list, 0];
};

const removeCounter = ( list, index ) => {
  // ES5 syntax
  // return list
  //   .slice( 0, index )
  //   .concat( list.slice( index + 1 ) );

  // ES6 syntax
  return [
    ...list.slice( 0, index ),
    ...list.slice( index + 1 ),
  ];
};

const incrementCounter = ( list, index ) => {
  // ES5 syntax
  // return list
  //   .slice( 0, index )
  //   .concat( [list[index] + 1] )
  //   .concat( list.slice( index + 1 ) );

  // ES6 syntax
  return [
    ...list.slice( 0, index ),
    list[index] + 1,
    ...list.slice( index + 1 ),
  ];
};

const toggleTodo = ( todo ) => {
  // Object.assign is new in ES6 : use polyfill
  return Object.assign(
    {},
    todo,
    { completed: !todo.completed },
  );

  // ES7 stage-2 preset
  // return {
  //   ...todo,
  //   completed: !todo.completed,
  // };
};

const testAddCounter = () => {
  const listBefore = [];
  const listAfter = [0];

  // freeze object so mutation is not allowed
  deepFreeze( listBefore );

  expect(
    addCounter( listBefore ),
  ).toEqual( listAfter );
};

const testRemoveCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 20];

  // freeze object so mutation is not allowed
  deepFreeze( listBefore );

  expect(
    removeCounter( listBefore, 1 ),
  ).toEqual( listAfter );
};

const testIncrementCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 11, 20];

  // freeze object so mutation is not allowed
  deepFreeze( listBefore );

  expect(
    incrementCounter( listBefore, 1 ),
  ).toEqual( listAfter );
};

const testToggleTodo = () => {
  const todoBefore = {
    id: 0,
    text: 'Learn Redux',
    completed: false,
  };

  const todoAfter = {
    id: 0,
    text: 'Learn Redux',
    completed: true,
  };

  deepFreeze( todoBefore );

  expect(
    toggleTodo( todoBefore ),
  ).toEqual( todoAfter );
};

testAddCounter();
testRemoveCounter();
testIncrementCounter();
testToggleTodo();
console.log( 'All tests passed.' );
