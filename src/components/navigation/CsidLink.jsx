import React, { PropTypes } from 'react';
import { asKeywords } from '../../helpers/csidHelpers';
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
      p: 0,
      size: 0,
      kw: asKeywords(csid),
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
