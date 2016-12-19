import React from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';

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

// maps related props data to store
const mapStateToLinkProps = (
  state,
  ownProps,
) => {
  return {
    active: ownProps.filter === state.visibilityFilter,
  };
};
// maps dispatch to callback props
const mapDispatchToLinkProps = (
  dispatch,
  ownProps,
) => {
  return {
    onClick: () => {
      dispatch( {
        type: 'SET_VISIBILITY_FILTER',
        filter: ownProps.filter,
      } );
    },
  };
};
// no need to manually subscribe because 'connect' handles it
const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps,
)( Link );

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
// passedStore came from grandparent
let AddTodo = ( { dispatch } ) => {
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
          dispatch( {
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
// no need to pass anything since mapStateToProps = null, mapDispatchToProps = dispatch
AddTodo = connect()( AddTodo );

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
      dispatch( {
        type: 'TOGGLE_TODO',
        id,
      } );
    },
  };
};
// no need to manually subscribe because 'connect' handles it
const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps,
)( TodoList );

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

// use Provider from react-redux
// render once because specific components are subscribed to the store
render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById( 'todo-app' ),
);
