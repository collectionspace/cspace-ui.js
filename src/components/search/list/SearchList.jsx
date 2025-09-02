import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { useDispatch, useSelector } from 'react-redux';
import get from 'lodash/get';
import { injectIntl } from 'react-intl';
import { CheckboxInput } from '../../../helpers/configContextInputs';
import { getColumnConfig, readListItems } from '../searchResultHelpers';
import { getSearchResult, getSearchSelectedItems } from '../../../reducers';
import { SEARCH_RESULT_PAGE_SEARCH_NAME } from '../../../constants/searchNames';
import { useConfig } from '../../config/ConfigProvider';
import { setResultItemSelected } from '../../../actions/search';
import BlobImage from '../../media/BlobImage';

import styles from '../../../../styles/cspace-ui/SearchList.css';

const DETAIL_COLUMN_SET = 'list';

const itemPropTypes = {
  item: PropTypes.instanceOf(Immutable.Map),
  index: PropTypes.number,
  listItems: PropTypes.array,
  // render context like search table? or a better way to handle all this?
  searchDescriptor: PropTypes.object,
  listType: PropTypes.string,
  selectedItems: PropTypes.instanceOf(Immutable.Map),
};

export function DetailItem({
  item, index, listItems, searchDescriptor, listType, selectedItems,
}) {
  const config = useConfig();
  const dispatch = useDispatch();

  const csid = item.get('csid');
  const blobCsid = item.get('blobCsid');
  const selected = selectedItems ? selectedItems.has(csid) : false;

  const listTypeConfig = config.listTypes[listType];
  const { getItemLocationPath } = listTypeConfig;
  let location;
  if (getItemLocationPath) {
    location = getItemLocationPath(item, { config, searchDescriptor });
  }

  const list = location
    ? (
      <Link to={location}>
        <ol className={styles.detailList}>
          {listItems.map((listItem) => (
            <li key={`${csid}-${listItem.dataKey}`}>
              {listItem.label()}
              {': '}
              {item.get(listItem.dataKey)}
            </li>
          ))}
        </ol>

      </Link>
    )
    : (
      <ol className={styles.detailList}>
        {listItems.map((listItem) => (
          <li key={`${csid}-${listItem.dataKey}`}>
            {listItem.label()}
            {': '}
            {item.get(listItem.dataKey)}
          </li>
        ))}
      </ol>
    );

  // omit fields when no data is returned?
  // todo: NoBlobFound image
  const blob = blobCsid ? <BlobImage csid={blobCsid} derivative="Thumbnail" className={styles.detailImg} /> : null;
  return (
    <div className={styles.innerDetail}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      {blob}
      {list}
      <CheckboxInput
        embedded
        className={styles.detailCheckbox}
        name={`${index}`}
        value={selected}
        onCommit={(path, value) => dispatch(setResultItemSelected(config,
          SEARCH_RESULT_PAGE_SEARCH_NAME,
          searchDescriptor,
          listType,
          parseInt(path[0], 10),
          value))}
        onClick={(event) => event.stopPropagation()}
      />
    </div>
  );
}

DetailItem.propTypes = itemPropTypes;

const propTypes = {
  searchDescriptor: PropTypes.instanceOf(Immutable.Map),
  intl: PropTypes.object,
};

function SearchDetailList({ searchDescriptor, intl }) {
  const results = useSelector((state) => getSearchResult(state,
    SEARCH_RESULT_PAGE_SEARCH_NAME,
    searchDescriptor));
  const selectedItems = useSelector((state) => getSearchSelectedItems(state,
    SEARCH_RESULT_PAGE_SEARCH_NAME));
  const config = useConfig();

  const listType = getListTypeFromResult(config, results);
  const items = readListItems(config, listType, results);
  if (!items) {
    return null;
  }

  // read headers
  const listConfig = getColumnConfig(config, searchDescriptor, DETAIL_COLUMN_SET);
  const listItems = Object.keys(listConfig)
    .filter((name) => !listConfig[name].disabled)
    .sort((nameA, nameB) => {
      const orderA = listConfig[nameA].order;
      const orderB = listConfig[nameB].order;

      return orderA - orderB;
    }).map((name) => {
      const column = listConfig[name];
      return {
        dataKey: column.dataKey || name,
        label: () => {
          const message = get(column, ['messages', 'label']);
          return message ? intl.formatMessage(message) : '';
        },
        // Just an idea - a render 'prop' passed along with the listItems
        renderRow: ({ dataKey, rowData }) => {
          const label = get(column, ['message', 'label']);
          const data = rowData.get(dataKey);
          const formatted = `${label}: ${data}`;
          return <li>{formatted}</li>;
        },
      };
    });

  return (
    <div className={styles.detail}>
      {items.map((item, index) => (
        <DetailItem
          item={item}
          index={index}
          listItems={listItems}
          searchDescriptor={searchDescriptor}
          listType={listType}
          selectedItems={selectedItems}
        />
      ))}
    </div>
  );
}

SearchDetailList.propTypes = propTypes;

export default injectIntl(SearchDetailList);
