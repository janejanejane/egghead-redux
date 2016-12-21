import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getVisibleTodos, getErrorMessage, getIsFetching } from '../reducers';
import * as actions from '../actions';
import TodoList from './TodoList';
import FetchError from './FetchError';

class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate( prevProps ) {
    if ( this.props.filter !== prevProps.filter ) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, fetchTodos } = this.props;
    // injected by connect as 'actions'
    fetchTodos( filter ).then( () => { return console.log( 'done!' ); } );
  }

  render() {
    const { toggleTodo, errorMessage, todos, isFetching } = this.props;
    if ( isFetching && !todos.length ) {
      return <p>Loading...</p>;
    }

    if ( errorMessage && !todos.length ) {
      return (
        <FetchError
          message={errorMessage}
          onRetry={() => { this.fetchData(); }}
        />
      );
    }

    return (
      <TodoList
        todos={todos}
        onTodoClick={toggleTodo}
      />
    );
  }
}

// maps related props data to store
// todo display is based on the url using params.filter
const mapStateToProps = ( state, { params } ) => {
  const filter = params.filter || 'all';
  return {
    todos: getVisibleTodos( state, filter ),
    errorMessage: getErrorMessage( state, filter ),
    isFetching: getIsFetching( state, filter ),
    filter,
  };
};

// no need to manually subscribe because 'connect' handles it
// withRouter passed a 'params' argument and any props that will be used in this component,
// no need to pass params manually from parent component
VisibleTodoList = withRouter( connect(
  mapStateToProps,
  actions,
)( VisibleTodoList ) );

export default VisibleTodoList;
