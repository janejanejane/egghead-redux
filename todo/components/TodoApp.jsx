import React from 'react';

import AddTodo from './AddTodo';
import Footer from './Footer';
import VisibleTodoList from './VisibleTodoList';

// this is the main container that get re-rendered every time the store changes
// params is passed by the react-router
const TodoApp = () => {
  return (
    <div>
      {
        // presents the input and button elements
      }
      <AddTodo />
      {
        // presents all the todos inside the store
        // the url will tell what type of todo to display
      }
      <VisibleTodoList />
      {
        // present the filter of todos
      }
      <Footer />
    </div>
  );
};

export default TodoApp;
