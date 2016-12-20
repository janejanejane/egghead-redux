import React from 'react';

import FilterLink from './FilterLink';

// presents all the available filter links
const Footer = () => {
  return (
    <p>
      Show:
      {' '}
      <FilterLink
        filter="all"
      >
        All
      </FilterLink>
      {' '}
      <FilterLink
        filter="active"
      >
        Active
      </FilterLink>
      {' '}
      <FilterLink
        filter="completed"
      >
        Completed
      </FilterLink>
    </p>
  );
};

export default Footer;
