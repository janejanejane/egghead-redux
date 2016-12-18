import React, { Component } from 'react';
import { render } from 'react-dom';

import { store } from './todo';

// onCLick will dispatch 'SET_VISIBILITY_FILTER' to filter the todos displayed
const FilterLink = ( {
  filter,
  currentFilter,
  children,
  onClick,
} ) => {
  if ( filter === currentFilter ) {
    return <span>{children}</span>;
  }
  return (
    <a
      href="#"
      onClick={( e ) => {
        e.preventDefault();
        onClick( filter );
      }}
    >
      {children}
    </a>
  );
};

// presents all the available filter links
const Footer = ( {
  visibilityFilter,
  onFilterClick,
} ) => {
  return (
    <p>
      Show:
      {' '}
      <FilterLink
        filter="SHOW_ALL"
        currentFilter={visibilityFilter}
        onClick={onFilterClick}
      >
        All
      </FilterLink>
      {' '}
      <FilterLink
        filter="SHOW_ACTIVE"
        currentFilter={visibilityFilter}
        onClick={onFilterClick}
      >
        Active
      </FilterLink>
      {' '}
      <FilterLink
        filter="SHOW_COMPLETED"
        currentFilter={visibilityFilter}
        onClick={onFilterClick}
      >
        Completed
      </FilterLink>
    </p>
  );
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

// onAddClick will dispatch an action of 'ADD_TODO' that will change the store
const AddTodo = ( {
  onAddClick,
} ) => {
  let input;
  return (
    <div>
      <input
        ref={( node ) => {
          input = node;
        }}
      />
      <button
        onClick={() => {
          onAddClick( input.value );
          input.value = '';
        }}
      >Add Todo</button>
    </div>
  );
};

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

// get the existing number of todos
let nextTodoId = store.getState().todos.length;

// this is the main container that get re-rendered every time the store changes
const TodoApp = ( {
  // global state object keys are passed by spread operator
  todos,
  visibilityFilter,
} ) => {
  return (
    <div>
      {
        // presents the input and button elements
      }
      <AddTodo
        onAddClick={( text ) => {
          store.dispatch( {
            type: 'ADD_TODO',
            id: nextTodoId++,
            text,
          } );
        }}
      />
      {
        // presents all the todos inside the store
      }
      <TodoList
        todos={getVisibleTodos(
          todos,
          visibilityFilter,
        )}
        onTodoClick={( id ) => {
          store.dispatch( {
            type: 'TOGGLE_TODO',
            id,
          } );
        }}
      />
      {
        // present the filter of todos
      }
      <Footer
        visibilityFilter={visibilityFilter}
        onFilterClick={( filter ) => {
          store.dispatch( {
            type: 'SET_VISIBILITY_FILTER',
            filter,
          } );
        }}
      />
    </div>
  );
};

const renderTodoApp = () => {
  render(
    <TodoApp {...store.getState()} />,
    document.getElementById( 'todo-app' ),
  );
};

store.subscribe( renderTodoApp );
renderTodoApp();
