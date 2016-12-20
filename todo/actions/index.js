import { v4 } from 'node-uuid';

export const receiveTodos = ( filter, response ) => {
  return ( {
    type: 'RECEIVE_TODOS',
    filter,
    response,
  } );
};

// isolate action creators
export const addTodo = ( text ) => {
  return {
    type: 'ADD_TODO',
    id: v4(), // generate uuid to avoid React error on keys
    text,
  };
};

export const toggleTodo = ( id ) => {
  return {
    type: 'TOGGLE_TODO',
    id,
  };
};
