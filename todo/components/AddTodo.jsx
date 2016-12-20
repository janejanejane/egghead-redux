import React from 'react';
import { connect } from 'react-redux';

import { addTodo } from '../actions';

// dispatch an action of 'ADD_TODO' that will change the store
// passedStore came from grandparent
const AddTodo = ( { dispatch } ) => {
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
          dispatch( addTodo( input.value ) );
          input.value = '';
        }}
      >Add Todo</button>
    </div>
  );
};
// no need to pass anything since mapStateToProps = null, mapDispatchToProps = dispatch
export default connect()( AddTodo );
