import { store } from './todo';

// get the existing number of todos
let nextTodoId = store.getState().todos.length;

// isolate action creators
export const addTodo = ( text ) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text,
  };
};

export const setVisibilityFilter = ( filter ) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter,
  };
};

export const toggleTodo = ( id ) => {
  return {
    type: 'TOGGLE_TODO',
    id,
  };
};
