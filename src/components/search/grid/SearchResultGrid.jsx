import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import { readListItems } from '../searchResultHelpers';
import { getSearchResult, getSearchSelectedItems } from '../../../reducers';
import { SEARCH_RESULT_PAGE_SEARCH_NAME } from '../../../constants/searchNames';
import { useConfig } from '../../config/ConfigProvider';
import styles from '../../../../styles/cspace-ui/SearchGrid.css';
import { getListTypeFromResult } from '../../../helpers/searchHelpers';
import SearchResultCheckbox from '../SearchResultCheckbox';
import SearchResultImage from '../SearchResultImage';

const cardPropTypes = {
  item: PropTypes.instanceOf(Immutable.Map),
  index: PropTypes.number,
  listType: PropTypes.string,
  gridConfig: PropTypes.shape({
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
  }),
  searchDescriptor: PropTypes.object,
};

export function SearchResultCard({
  item, gridConfig, index, searchDescriptor, listType,
}) {
  const config = useConfig();

  const {
    description: {
      formatter: descriptionFormatter,
    } = {},
    tags: {
      formatter: tagFormatter,
    } = {},
    title: {
      formatter: titleFormatter,
    } = {},
    subtitle: {
      formatter: subtitleFormatter,
    } = {},
  } = gridConfig;

  const selectedItems = useSelector((state) => getSearchSelectedItems(state,
    SEARCH_RESULT_PAGE_SEARCH_NAME));

  const csid = item.get('csid');
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

  const blob = (
    <SearchResultImage
      derivative="Medium"
      item={item}
      location={location}
      state={state}
    />
  );

  const title = location ? (
    <Link to={{ pathname: location, state }}>
      {titleFormatter?.(item)}
    </Link>
  ) : titleFormatter?.(item);

  return (
    <div className={styles.card}>
      {blob}
      <div>
        <div className={styles.summary}>
          <SearchResultCheckbox
            index={index}
            listType={listType}
            searchDescriptor={searchDescriptor}
            selected={selected}
          />
          <div className={styles.info}>
            {title}
            {subtitleFormatter?.(item)}
            {descriptionFormatter?.(item)}
            <div className={styles.mt10}>
              {tagFormatter?.(item)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

SearchResultCard.propTypes = cardPropTypes;

export default function SearchResultGrid({ searchDescriptor }) {
  const results = useSelector((state) => getSearchResult(state,
    SEARCH_RESULT_PAGE_SEARCH_NAME,
    searchDescriptor));
  const config = useConfig();

  const listType = getListTypeFromResult(config, results);
  const { items } = readListItems(config, listType, results);
  if (!items) {
    return null;
  }

  const recordType = searchDescriptor.get('recordType');
  const subresource = searchDescriptor.get('subresource');

  const configurer = subresource
    ? config.subresources[subresource]
    : config.recordTypes[recordType];

  const gridConfig = get(configurer, ['grid']);

  return (
    <div className={styles.grid}>
      {items.map((item, index) => (
        <SearchResultCard
          key={item.get('csid')}
          index={index}
          item={item}
          listType={listType}
          gridConfig={gridConfig}
          searchDescriptor={searchDescriptor}
        />
      ))}
    </div>
  );
}

SearchResultGrid.propTypes = {
  searchDescriptor: PropTypes.object,
};
