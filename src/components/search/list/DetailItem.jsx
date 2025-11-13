import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { FormattedMessage } from 'react-intl';
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
  detailConfig: PropTypes.object,
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

export default function DetailItem({
  item, index, detailConfig, searchDescriptor, listType, selectedItems,
}) {
  const config = useConfig();

  const {
    title: {
      formatter: titleFormatter,
    },
    subtitle: {
      formatter: subtitleFormatter,
    },
    description: {
      formatter: descriptionFormatter,
    },
    tags: {
      formatter: tagFormatter,
    },
    footer: {
      formatter: footerFormatter,
    },
    aside: {
      formatter: asideFormatter,
    },
  } = detailConfig;

  const csid = item.get('csid');
  const blobCsid = item.get('blobCsid');
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
      {titleFormatter(item)}
      {subtitleFormatter(item)}
      {descriptionFormatter(item)}
      {tagFormatter(item)}
      {footerFormatter(item)}
    </div>
  );

  const editButton = renderEditButton(location, state);
  // todo: NoBlobFound image
  const blob = blobCsid ? <BlobImage csid={blobCsid} derivative="Small" className={styles.detailImg} /> : null;
  return (
    <div className={styles.innerDetail}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <div className={styles.imgContainer}>
        {blob}
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
