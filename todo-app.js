import React, { Component } from 'react';
import { render } from 'react-dom';

import { store } from './todo';

const FilterLink = ( {
  filter,
  currentFilter,
  children,
} ) => {
  if ( filter === currentFilter ) {
    return <span>{children}</span>;
  }
  return (
    <a
      href="#"
      onClick={( e ) => {
        e.preventDefault();
        store.dispatch( {
          type: 'SET_VISIBILITY_FILTER',
          filter,
        } );
      }}
    >
      {children}
    </a>
  );
};

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

let nextTodoId = store.getState().todos.length;
class TodoApp extends Component {
  render() {
    console.log( 'this.props:', this.props );
    const {
      todos,
      visibilityFilter,
    } = this.props;
    const visibleTodos = getVisibleTodos(
      todos,
      visibilityFilter,
    );
    return (
      <div>
        <input
          ref={( node ) => {
            this.input = node;
          }}
        />
        <button
          onClick={() => {
            store.dispatch( {
              type: 'ADD_TODO',
              text: this.input.value,
              id: nextTodoId++,
            } );
            this.input.value = '';
          }}
        >Add Todo</button>
        <ul>
          {visibleTodos.map( ( todo ) => {
            return (
              <li
                key={todo.id}
                onClick={() => {
                  store.dispatch( {
                    type: 'TOGGLE_TODO',
                    id: todo.id,
                  } );
                }}
                style={{
                  textDecoration:
                    todo.completed ?
                      'line-through' :
                      'none',
                }}
              >
                {todo.text}
              </li>
            );
          } )}
        </ul>
        <p>
          Show:
          {' '}
          <FilterLink
            filter="SHOW_ALL"
            currentFilter={visibilityFilter}
          >
            All
          </FilterLink>
          {' '}
          <FilterLink
            filter="SHOW_ACTIVE"
            currentFilter={visibilityFilter}
          >
            Active
          </FilterLink>
          {' '}
          <FilterLink
            filter="SHOW_COMPLETED"
            currentFilter={visibilityFilter}
          >
            Completed
          </FilterLink>
        </p>
      </div>
    );
  }
}

const renderTodoApp = () => {
  render(
    <TodoApp {...store.getState()} />,
    document.getElementById( 'todo-app' ),
  );
};

store.subscribe( renderTodoApp );
renderTodoApp();
