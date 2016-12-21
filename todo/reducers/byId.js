
// specify a database-like syntax of state
const byId = ( state = {}, action ) => {
  switch ( action.type ) {
    case 'FETCH_TODOS_SUCCESS':
      const nexState = { ...state };
      action.response.forEach( ( todo ) => {
        nexState[todo.id] = todo;
      } );
      return nexState;
    default:
      return state;
  }
};

export default byId;

export const getTodo = ( state, id ) => { return state[id]; };
