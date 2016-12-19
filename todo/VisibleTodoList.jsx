import React from 'react';
import { connect } from 'react-redux';

import { toggleTodo } from './action-creators';

// helps in filtering the todos based on the option clicked
const getVisibleTodos = (
  todos,
  filter,
) => {
  switch ( filter ) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(
        ( t ) => { return t.completed; },
      );
    case 'SHOW_ACTIVE':
      return todos.filter(
        ( t ) => { return !t.completed; },
      );
  }
};

// onClick will dispatch 'TOGGLE_TODO', that changes completed field
const Todo = ( {
  onClick,
  completed,
  text,
} ) => {
  return (
    <li
      onClick={onClick}
      style={{
        textDecoration:
        completed ?
          'line-through' :
          'none',
      }}
    >
      {text}
    </li>
  );
};

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

// maps related props data to store
const mapStateToTodoListProps = ( state ) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter,
    ),
  };
};
// maps dispatch to callback props
const mapDispatchToTodoListProps = ( dispatch ) => {
  return {
    onTodoClick: ( id ) => {
      dispatch( toggleTodo( id ) );
    },
  };
};
// no need to manually subscribe because 'connect' handles it
export const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps,
)( TodoList );
