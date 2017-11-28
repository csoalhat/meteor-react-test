import React from 'react';

import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';

// stateless functional component - only used for visual data with no react state logic
export default () => {
  return (
    <div>
      <PrivateHeader title="Your Links" />
      <div className="wrapper">
        <LinksListFilters />
        <AddLink />
        <LinksList />
      </div>
    </div>
  );
};
