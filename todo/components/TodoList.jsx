import React from 'react';
import Todo from './Todo';

// lists all the todos
const TodoList = ( {
  todos,
  onTodoClick,
} ) => {
  return (
    <ul>
      {
      todos.map( ( todo ) => {
        return (
          <Todo
            key={todo.id}
            {...todo}
            onClick={() => { return onTodoClick( todo.id ); }}
          />
        );
      } )
    }
    </ul>
  );
};

export default TodoList;
