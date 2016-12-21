const createList = ( filter ) => {
  return ( state = [], action ) => {
    if ( action.filter !== filter ) {
      return state;
    }
    // return data from server
    switch ( action.type ) {
      case 'RECEIVE_TODOS':
        return action.response.map( ( todo ) => { return todo.id; } );
      default:
        return state;
    }
  };
};

export default createList;

export const getIds = ( state ) => { return state; };
