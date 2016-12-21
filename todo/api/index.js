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

export const addTodo = ( text ) => {
  return delay( 500 ).then( () => {
    const todo = {
      id: v4(),
      text,
      completed: false,
    };
    fakeDatabase.todos.push( todo );
    return todo;
  } );
};


export const toggleTodo = ( id ) => {
  return delay( 500 ).then( () => {
    const todo = fakeDatabase.todos.find( ( t ) => { return t.id === id; } );
    todo.completed = !todo.completed;
    return todo;
  } );
};

export const fetchTodos = ( filter ) => {
  return delay( 500 ).then( () => {
    if ( Math.random() > 0.5 ) {
      throw new Error( 'Boom!' );
    }

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
