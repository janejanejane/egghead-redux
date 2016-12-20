import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getVisibleTodos } from '../reducers';
import * as actions from '../actions';
import TodoList from './TodoList';

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
    fetchTodos( filter );
  }

  render() {
    const { toggleTodo, ...rest } = this.props;
    return (
      <TodoList
        {...rest}
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
    todos: getVisibleTodos(
      state,
      params.filter || 'all',
    ),
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
