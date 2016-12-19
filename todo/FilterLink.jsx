import React from 'react';
import { connect } from 'react-redux';

import { setVisibilityFilter } from './action-creators';

// onCLick will dispatch 'SET_VISIBILITY_FILTER' to filter the todos displayed
const Link = ( {
  active,
  children,
  onClick,
} ) => {
  if ( active ) {
    return <span>{children}</span>;
  }
  return (
    <a
      href="#"
      onClick={( e ) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
};

// maps related props data to store
const mapStateToLinkProps = (
  state,
  ownProps,
) => {
  return {
    active: ownProps.filter === state.visibilityFilter,
  };
};
// maps dispatch to callback props
const mapDispatchToLinkProps = (
  dispatch,
  ownProps,
) => {
  return {
    onClick: () => {
      dispatch( setVisibilityFilter( ownProps.filter ) );
    },
  };
};
// no need to manually subscribe because 'connect' handles it
export const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps,
)( Link );
