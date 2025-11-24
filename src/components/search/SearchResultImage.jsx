import React from 'react';
import { defineMessages, intlShape } from 'react-intl';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';
import BlobImage from '../media/BlobImage';
import { SEARCH_RESULT_PAGE_SEARCH_NAME } from '../../constants/searchNames';
import { useConfig } from '../config/ConfigProvider';

const messages = defineMessages({
  alt: {
    id: 'searchResultImage.altText',
    description: 'Default alt text for thumbnails in search results',
    defaultMessage: 'Edit record {csid}',
  },
});

/**
 * A wrapper around BlobImage which has an anchor if available with default alt text
 */
export default function SearchResultImage(props) {
  const {
    derivative,
    intl,
    item,
    getItemLocationPath,
    searchDescriptor,
  } = props;

  const config = useConfig();

  let location;
  let state;
  if (getItemLocationPath) {
    location = getItemLocationPath(item, { config, searchDescriptor });
    state = {
      searchDescriptor: searchDescriptor.toJS(),
      // The search traverser on records will always link to the search result page, so use
      // its search name.
      searchName: SEARCH_RESULT_PAGE_SEARCH_NAME,
    };
  }

  const itemCsid = item.get('csid');
  const blobCsid = item.get('blobCsid');
  const blobAlt = item.get('blobAltText');
  const altText = blobAlt || intl.formatMessage(messages.alt, { itemCsid });

  const blob = <BlobImage csid={blobCsid} derivative={derivative} alt={altText} />;
  return location ? (
    <Link to={{ pathname: location, state }}>
      {blob}
    </Link>
  ) : blob;
}

SearchResultImage.propTypes = {
  derivative: PropTypes.string,
  intl: intlShape,
  item: PropTypes.object,
  getItemLocationPath: PropTypes.func,
  searchDescriptor: PropTypes.object,
};
