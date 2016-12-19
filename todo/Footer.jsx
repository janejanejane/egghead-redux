import React from 'react';

import { FilterLink } from './FilterLink';

// presents all the available filter links
export const Footer = () => {
  return (
    <p>
      Show:
      {' '}
      <FilterLink
        filter="SHOW_ALL"
      >
        All
      </FilterLink>
      {' '}
      <FilterLink
        filter="SHOW_ACTIVE"
      >
        Active
      </FilterLink>
      {' '}
      <FilterLink
        filter="SHOW_COMPLETED"
      >
        Completed
      </FilterLink>
    </p>
  );
};
