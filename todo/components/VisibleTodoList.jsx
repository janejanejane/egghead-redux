import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getVisibleTodos } from '../reducers';
import { toggleTodo } from '../actions';
import TodoList from './TodoList';

// maps related props data to store
// todo display is based on the url using params.filter
const mapStateToProps = ( state, { params } ) => {
  return {
    todos: getVisibleTodos(
      state,
      params.filter || 'all',
    ),
  };
};
// // maps dispatch to callback props
// const mapDispatchToProps = ( dispatch ) => {
//   return {
//     onTodoClick: ( id ) => {
//       dispatch( toggleTodo( id ) );
//     },
//   };
// };
// no need to manually subscribe because 'connect' handles it
// withRouter passed a 'params' argument and any props that will be used in this component,
// no need to pass params manually from parent component
const VisibleTodoList = withRouter( connect(
  mapStateToProps,
  {
    // this is shorthand
    // it is common to have the arguments passed to the method in the dispatch
    onTodoClick: toggleTodo,
  },
)( TodoList ) );

export default VisibleTodoList;
