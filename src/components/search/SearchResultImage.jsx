import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';
import BlobImage from '../media/BlobImage';

const messages = defineMessages({
  alt: {
    id: 'searchResultImage.altText',
    description: 'Default alt text for thumbnails in search results',
    defaultMessage: 'Edit record {csid}',
  },
});

/**
 * A wrapper around BlobImage which has navigation on click if available and alt text
 */
function SearchResultImage({
  derivative, intl, item, location, state,
}) {
  const itemCsid = item.get('csid');
  const blobCsid = item.get('blobCsid');
  const blobAlt = item.get('blobAltText');
  const altText = blobAlt || intl.formatMessage(messages.alt, { itemCsid });

  const blob = <BlobImage csid={blobCsid} derivative={derivative} alt={altText} />;
  return location && state ? (
    <Link to={{ pathname: location, state }}>
      {blob}
    </Link>
  ) : blob;
}

SearchResultImage.propTypes = {
  derivative: PropTypes.string,
  intl: intlShape,
  item: PropTypes.object,
  location: PropTypes.string,
  state: PropTypes.object,
};

export default injectIntl(SearchResultImage);
