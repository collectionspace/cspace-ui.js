import React, { PropTypes } from 'react';
import SearchResultLinkContainer from '../../containers/search/SearchResultLinkContainer';

const propTypes = {
  config: PropTypes.object,
  csid: PropTypes.string,
  searchName: PropTypes.string,
};

export default function CsidLink(props) {
  const {
    config,
    csid,
    searchName,
  } = props;

  const searchDescriptor = {
    recordType: 'all',
    searchQuery: {
      csid,
      p: 0,
      size: 0,
    },
  };

  return (
    <SearchResultLinkContainer
      config={config}
      searchDescriptor={searchDescriptor}
      searchName={searchName}
    />
  );
}

CsidLink.propTypes = propTypes;
