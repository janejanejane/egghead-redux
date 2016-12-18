import React, { Component } from 'react';
import { render } from 'react-dom';

import { store } from './todo';

// onCLick will dispatch 'SET_VISIBILITY_FILTER' to filter the todos displayed
const Link = ( {
  active,
  children,
  onClick,
} ) => {
  if ( active ) {
    return <span>{children}</span>;
  }
  return (
    <a
      href="#"
      onClick={( e ) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
};

class FilterLink extends Component {
  componentDidMount() {
    // every time the store changes, force update the render of the component
    this.unsubscribe = store.subscribe( () => {
      this.forceUpdate();
    } );
  }

  componentWillUnmount() {
    // clean up subscription
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const state = store.getState();

    return (
      <Link
        active={
          props.filter === state.visibilityFilter
        }
        onClick={() => {
          store.dispatch( {
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter,
          } );
        }}
      >{ props.children}
      </Link>
    );
  }
}

// presents all the available filter links
const Footer = () => {
  return (
    <p>
      Show:
      {' '}
      <FilterLink
        filter="SHOW_ALL"
      >
        All
      </FilterLink>
      {' '}
      <FilterLink
        filter="SHOW_ACTIVE"
      >
        Active
      </FilterLink>
      {' '}
      <FilterLink
        filter="SHOW_COMPLETED"
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

// dispatch an action of 'ADD_TODO' that will change the store
const AddTodo = () => {
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
          store.dispatch( {
            type: 'ADD_TODO',
            id: nextTodoId++,
            text: input.value,
          } );
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

class VisibleTodoList extends Component {
  componentDidMount() {
    // every time the store changes, force update the render of the component
    this.unsubscribe = store.subscribe( () => {
      this.forceUpdate();
    } );
  }

  componentWillUnmount() {
    // clean up subscription
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const state = store.getState();

    return (
      <TodoList
        todos={getVisibleTodos(
          state.todos,
          state.visibilityFilter,
        )}
        onTodoClick={( id ) => {
          store.dispatch( {
            type: 'TOGGLE_TODO',
            id,
          } );
        }}
      />
    );
  }
}

// get the existing number of todos
let nextTodoId = store.getState().todos.length;

// this is the main container that get re-rendered every time the store changes
const TodoApp = () => {
  return (
    <div>
      {
        // presents the input and button elements
      }
      <AddTodo />
      {
        // presents all the todos inside the store
      }
      <VisibleTodoList />
      {
        // present the filter of todos
      }
      <Footer />
    </div>
  );
};

// render once because specific components are subscribed to the store
render(
  <TodoApp />,
  document.getElementById( 'todo-app' ),
);
