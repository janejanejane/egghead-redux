import React from 'react';
import { connect } from 'react-redux';

import { toggleTodo } from './action-creators';

// helps in filtering the todos based on the option clicked
// filter value are based on url string
const getVisibleTodos = (
  todos,
  filter,
) => {
  switch ( filter ) {
    case 'all':
      return todos;
    case 'completed':
      return todos.filter(
        ( t ) => { return t.completed; },
      );
    case 'active':
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
// todo display is based on the url using params.filter
const mapStateToProps = ( state, ownProps ) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      ownProps.filter,
    ),
  };
};
// maps dispatch to callback props
const mapDispatchToProps = ( dispatch ) => {
  return {
    onTodoClick: ( id ) => {
      dispatch( toggleTodo( id ) );
    },
  };
};
// no need to manually subscribe because 'connect' handles it
const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps,
)( TodoList );

export default VisibleTodoList;
