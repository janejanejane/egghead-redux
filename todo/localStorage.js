// get the value from localStorage
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem( 'state' );
    if ( serializedState === null ) {
      return undefined;
    }

    return JSON.parse( serializedState );
  } catch ( err ) {
    return undefined;
  }
};

// serialize object to be saved to localStorage
export const saveState = ( state ) => {
  try {
    const serializedState = JSON.stringify( state );
    localStorage.setItem( 'state', serializedState );
  } catch ( err ) {
    return undefined;
  }
};
