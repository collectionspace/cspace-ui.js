import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import Immutable from 'immutable';
import { injectIntl } from 'react-intl';
import styles from './SearchTable.css';
import { getColumnConfig, readListItems } from '../searchResultHelpers';
import { getSearchResult } from '../../../reducers';
import { SEARCH_RESULT_PAGE_SEARCH_NAME } from '../../../constants/searchNames';
import { useConfig } from '../../config/ConfigProvider';

const propTypes = {
  searchDescriptor: PropTypes.instanceOf(Immutable.Map),
  listType: PropTypes.string,
};

/**
 * Displays search results as a table. This uses the search descriptor to get the
 * record type in order to read the configuration for what headers and fields need
 * to be displayed.
 *
 * todo: parity with other search result table
 *   - row data formatting
 *   - sorting
 *   - checkboxes actually working
 *   - aria-labels + general wcag compliance
 *   - ???
 */
function SearchResultTable({ searchDescriptor, listType = 'common' }) {
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
  const items = readListItems(config, listType, results);
  if (!items) {
    return null;
  }

  // read headers
  const columnConfig = getColumnConfig(config, searchDescriptor, 'default');

  // console.log(`column config: ${JSON.stringify(columnConfig)}`);
  // todo: dataKey is for ucb support. basically it allows multiple fields to be used
  // in the event one is missing. See cspace-ui-plugin-profile-pahma.js
  const columns = Object.keys(columnConfig)
    .filter((name) => !columnConfig[name].disabled)
    .sort((nameA, nameB) => {
      const orderA = columnConfig[nameA].order;
      const orderB = columnConfig[nameB].order;

      return orderA - orderB;
    }).map((name) => {
      const column = columnConfig[name];
      return {
        dataKey: column.dataKey || name,
        cellDataGetter: ({ dataKey, rowData }) => rowData,
        label: () => {
          const message = get(column, ['messages', 'label']);
          return message; // ? intl.formatMessage(message) : '';
        },
      };
    });
  // console.log(`columns: ${JSON.stringify(columns)}`);

  // todo: formatting for row data
  return (
    <div className={styles.results}>
      <table>
        <thead>
          <tr>
            <th className={styles.checkbox} />
            {columns.map((column) => (
              <th key={column.dataKey} style={{ textAlign: 'left' }}>{column.dataKey}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.csid} className={index % 2 === 0 ? styles.even : styles.odd}>
              <td><input type="checkbox" /></td>
              {columns.map((column) => (<td>{item.get(column.dataKey)}</td>))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

SearchResultTable.propTypes = propTypes;

export default injectIntl(SearchResultTable);
