import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import {
  defineMessages, FormattedMessage, injectIntl, intlShape,
} from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import { useConfig } from '../../config/ConfigProvider';
import BlobImage from '../../media/BlobImage';
import { SEARCH_RESULT_PAGE_SEARCH_NAME } from '../../../constants/searchNames';

import styles from '../../../../styles/cspace-ui/SearchList.css';
import SearchResultCheckbox from '../SearchResultCheckbox';

const { Button } = inputComponents;

const propTypes = {
  item: PropTypes.instanceOf(Immutable.Map),
  index: PropTypes.number,
  intl: intlShape,
  detailConfig: PropTypes.shape({
    aside: PropTypes.shape({
      formatter: PropTypes.func,
    }),
    title: PropTypes.shape({
      formatter: PropTypes.func,
    }),
    subtitle: PropTypes.shape({
      formatter: PropTypes.func,
    }),
    description: PropTypes.shape({
      formatter: PropTypes.func,
    }),
    tags: PropTypes.shape({
      formatter: PropTypes.func,
    }),
    footer: PropTypes.shape({
      formatter: PropTypes.func,
    }),
  }),
  searchDescriptor: PropTypes.object,
  listType: PropTypes.string,
  selectedItems: PropTypes.instanceOf(Immutable.Map),
};

const renderEditButton = (location, state) => {
  const button = (
    <Button name="edit">
      <FormattedMessage
        id="searchDetailList.editLabel"
        description="Label of the edit record button."
        defaultMessage="Edit Record"
      />
    </Button>
  );
  return location ? (
    <Link to={{ pathname: location, state }}>
      {button}
    </Link>
  ) : button;
};

const renderBlob = (location, state, blobCsid, blobAltText) => {
  if (location) {
    return (
      <Link to={{ pathname: location, state }}>
        <BlobImage csid={blobCsid} derivative="Small" alt={blobAltText} />
      </Link>
    );
  }

  return <BlobImage csid={blobCsid} derivative="Small" alt={blobAltText} />;
};

const messages = defineMessages({
  alt: {
    id: 'searchDetail.altText',
    description: 'Default alt text for thumbnails',
    defaultMessage: 'Edit record {csid}',
  },
});

function DetailItem({
  item, index, detailConfig, searchDescriptor, listType, selectedItems, intl,
}) {
  const config = useConfig();

  const {
    title: {
      formatter: titleFormatter,
    } = {},
    subtitle: {
      formatter: subtitleFormatter,
    } = {},
    description: {
      formatter: descriptionFormatter,
    } = {},
    tags: {
      formatter: tagFormatter,
    } = {},
    footer: {
      formatter: footerFormatter,
    } = {},
    aside: {
      formatter: asideFormatter,
    } = {},
  } = detailConfig;

  const csid = item.get('csid');
  const blobCsid = item.get('blobCsid');
  const altText = item.get('blobAltText') || intl.formatMessage(messages.alt, { csid });
  const selected = selectedItems ? selectedItems.has(csid) : false;

  const listTypeConfig = config.listTypes[listType];
  const { getItemLocationPath } = listTypeConfig;
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

  const renderInfo = () => <aside>{asideFormatter(item)}</aside>;
  const renderDescriptionBlock = () => (
    <div className={styles.description}>
      {titleFormatter?.(item)}
      {subtitleFormatter?.(item)}
      {descriptionFormatter?.(item)}
      {tagFormatter?.(item)}
      {footerFormatter?.(item)}
    </div>
  );

  const editButton = renderEditButton(location, state);
  return (
    <div className={styles.innerDetail}>
      <div className={styles.imageContainer}>
        {renderBlob(location, state, blobCsid, altText)}
      </div>
      <SearchResultCheckbox
        index={index}
        listType={listType}
        searchDescriptor={searchDescriptor}
        selected={selected}
      />
      {renderDescriptionBlock()}
      <div className={styles.info}>
        {renderInfo()}
        {editButton}
      </div>
    </div>
  );
}

DetailItem.propTypes = propTypes;

export default injectIntl(DetailItem);
