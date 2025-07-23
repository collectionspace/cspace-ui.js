import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { useDispatch, useSelector } from 'react-redux';
import get from 'lodash/get';
import { injectIntl } from 'react-intl';
import { CheckboxInput } from '../../../helpers/configContextInputs';
import deactivate from '../../../../images/deactivate.svg';
import { getColumnConfig, readListItems } from '../searchResultHelpers';
import { getSearchResult, getSearchSelectedItems } from '../../../reducers';
import { SEARCH_RESULT_PAGE_SEARCH_NAME } from '../../../constants/searchNames';
import { useConfig } from '../../config/ConfigProvider';
import { setResultItemSelected } from '../../../actions/search';

import styles from './SearchList.css';

const DETAIL_COLUMN_SET = 'list';

const itemPropTypes = {
  item: PropTypes.instanceOf(Immutable.Map),
  // exact shape tbd
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
  const selected = selectedItems ? selectedItems.has(csid) : false;

  // omit fields when no data is returned?
  return (
    <div className={styles.innerdetail}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img src={deactivate} className={styles.detailimg} />
      <CheckboxInput
        embedded
        className={styles['detail-checkbox']}
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
      <ol>
        {listItems.map((listItem) => (
          <li key={item.csid}>
            {listItem.label()}
            {': '}
            {item.get(listItem.dataKey)}
          </li>
        ))}
      </ol>
    </div>
  );
}

DetailItem.propTypes = itemPropTypes;

const propTypes = {
  searchDescriptor: PropTypes.instanceOf(Immutable.Map),
  intl: PropTypes.object,
  listType: PropTypes.string,
};

function SearchDetailList({ searchDescriptor, intl, listType = 'common' }) {
  const results = useSelector((state) => getSearchResult(state,
    SEARCH_RESULT_PAGE_SEARCH_NAME,
    searchDescriptor));
  const config = useConfig();

  if (!results) {
    return null;
  }

  // Note: The items returned is an Immutable.Map, so we need to use get
  // in order to retrieve the data
  // Note x2: This is only available for 'new' searches, so we don't need a list type prop
  // todo: read into the search results based on the list type
  // todo: why do we need to do !results AND !items?
  const items = readListItems(config, listType, results);
  if (!items) {
    return null;
  }

  const selectedItems = useSelector((state) => getSearchSelectedItems(state,
    SEARCH_RESULT_PAGE_SEARCH_NAME));

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
