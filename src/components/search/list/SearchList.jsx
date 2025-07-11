import React from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import { injectIntl } from 'react-intl';
import styles from './SearchList.css';
import deactivate from '../../../../images/deactivate.svg';
import { getColumnConfig, readListItems } from '../searchResultHelpers';
import { getSearchResult } from '../../../reducers';
import { SEARCH_RESULT_PAGE_SEARCH_NAME } from '../../../constants/searchNames';
import { useConfig } from '../../config/ConfigProvider';

const DETAIL_COLUMN_SET = 'list';

export function DetailItem({ item, listItems }) {
  // todo: read fields from record config

  console.log(`${JSON.stringify(item)}`);
  return (
    <div className={styles.innerdetail}>
      <img src={deactivate} className={styles.detailimg} />
      <input style={{ alignSelf: 'flex-start' }} type="checkbox" />
      <ol>
        {listItems.map((listItem) => (
          <li key={item.csid}>
            {listItem.dataKey}
            :
            {item.get(listItem.dataKey)}
          </li>
        ))}
      </ol>
    </div>
  );
}

function SearchDetailList({ searchDescriptor }) {
  const results = useSelector((state) => getSearchResult(state,
    SEARCH_RESULT_PAGE_SEARCH_NAME,
    searchDescriptor));
  const config = useConfig();

  if (!results) {
    return null;
  }

  // Note: The items returned is an Immutable.Map, so we need to use get
  // in order to retrieve the data
  // todo: read into the search results based on the list type
  // todo: why do we need to do !results AND !items?
  const items = readListItems(config, 'common', results);
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
        cellDataGetter: ({ dataKey, rowData }) => rowData,
        label: () => {
          const message = get(column, ['messages', 'label']);
          return message; // ? intl.formatMessage(message) : '';
        },
        // I kind of like this - a render prop which can be used to render arbitrary rows
        // the one thing is, it would be nice to have a formatter provided alongside so it
        // could be like format(label, data) or something. Maybe that could be variadic to support
        // the grid too? Probably not worth tho.
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
      {items.map((item) => <DetailItem item={item} listItems={listItems} />)}
    </div>
  );
}

export default injectIntl(SearchDetailList);
