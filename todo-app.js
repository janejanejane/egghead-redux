import React, { Component } from 'react';
import { render } from 'react-dom';

import { store } from './todo';

let nextTodoId = store.getState().todos.length;
class TodoApp extends Component {
  render() {
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
          {this.props.todos.map( ( todo ) => {
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
      </div>
    );
  }
}

const renderTodoApp = () => {
  render(
    <TodoApp todos={store.getState().todos} />,
    document.getElementById( 'todo-app' ),
  );
};

store.subscribe( renderTodoApp );
renderTodoApp();
