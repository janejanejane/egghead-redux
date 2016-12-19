import React from 'react';

import AddTodo from './AddTodo';
import { Footer } from './Footer';
import { VisibleTodoList } from './VisibleTodoList';

// this is the main container that get re-rendered every time the store changes
export const TodoApp = () => {
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
