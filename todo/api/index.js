import { v4 } from 'node-uuid';

const fakeDatabase = {
  todos: [{
    id: v4(),
    text: 'Watch netflix',
    completed: false,
  }, {
    id: v4(),
    text: 'Do Laundry',
    completed: true,
  }, {
    id: v4(),
    text: 'Eat banana',
    completed: false,
  }],
};

const delay = ( ms ) => {
  return new Promise( ( resolve ) => {
    return setTimeout( resolve, ms );
  } );
};

export const fetchTodos = ( filter ) => {
  return delay( 500 ).then( () => {
    switch ( filter ) {
      case 'all':
        return fakeDatabase.todos;
      case 'active':
        return fakeDatabase.todos.filter( ( t ) => {
          return !t.completed;
        } );
      case 'completed':
        return fakeDatabase.todos.filter( ( t ) => {
          return t.completed;
        } );
      default:
        throw new Error( `Unknown filter: ${filter}.` );
    }
  } );
};
