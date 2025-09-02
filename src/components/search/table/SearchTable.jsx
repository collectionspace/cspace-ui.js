import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import Immutable from 'immutable';
import SearchResultTableHeader from './SearchResultTableHeader';
import { getColumnConfig, readSearchResultList, readSearchResultListItems } from '../searchResultHelpers';
import { getSearchResult, getSearchSelectedItems } from '../../../reducers';
import { SEARCH_RESULT_PAGE_SEARCH_NAME } from '../../../constants/searchNames';
import { useConfig } from '../../config/ConfigProvider';
import styles from '../../../../styles/cspace-ui/SearchTable.css';
import SearchResultTableRow from './SearchResultTableRow';
import { getListTypeFromResult } from '../../../helpers/searchHelpers';

const propTypes = {
  searchDescriptor: PropTypes.instanceOf(Immutable.Map),
  intl: PropTypes.object,
};

const messages = defineMessages({
  selectHeader: {
    id: 'searchTable.selectHeaderAll',
    description: 'Label for select table header',
    defaultMessage: 'Selected',
  },
});

function getSortDir(searchDescriptor) {
  const searchQuery = searchDescriptor.get('searchQuery');

  const sortSpec = searchQuery.get('sort');

  let sortDir;
  let sortColumnName;
  if (sortSpec) {
    [sortColumnName, sortDir] = sortSpec.split(' ');
    if (!sortDir) {
      sortDir = 'asc';
    }
  }

  return { sortColumnName, sortDir };
}

/**
 * Displays search results as a table. This uses the search descriptor to get the
 * record type in order to read the configuration for what headers and fields need
 * to be displayed.
 *
 * Once complete this should replace the older SearchResultTable component
 *
 * todo: parity with other search result table
 *   - aria-labels + general wcag compliance
 *   - figure out hrefs
 *   - ???
 */
function SearchResultTable({ searchDescriptor, intl }) {
  const config = useConfig();
  const results = useSelector((state) => getSearchResult(state,
    SEARCH_RESULT_PAGE_SEARCH_NAME,
    searchDescriptor));
  const selectedItems = useSelector((state) => getSearchSelectedItems(state,
    SEARCH_RESULT_PAGE_SEARCH_NAME));

  const listType = getListTypeFromResult(config, results);
  const list = readSearchResultList(config, listType, results);
  const items = readSearchResultListItems(config, listType, list);

  if (!items) {
    return null;
  }

  // Might move this into the SearchResultTableHeader
  const {
    sortColumnName,
    sortDir,
  } = getSortDir(searchDescriptor);

  // read headers
  const columnConfig = getColumnConfig(config, searchDescriptor, 'default');

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
        formatValue: (data) => {
          if (column.formatValue) {
            const formatterContext = {
              intl,
              config,
              data,
            };

            return column.formatValue(data, formatterContext);
          }
          return data;
        },
        label: () => {
          const message = get(column, ['messages', 'label']);
          return message ? intl.formatMessage(message) : '';
        },
      };
    });

  const renderContext = {
    listType,
    searchDescriptor,
    selectedItems,
    columns,
  };

  const totalItems = parseInt(list.get('totalItems'), 10);
  const selectLabel = intl.formatMessage(messages.selectHeader);

  // todo: showCheckbox prop
  return (
    <div className={styles.results}>
      <table>
        <thead>
          <tr>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th className={styles.checkbox} aria-label={selectLabel} />
            {columns.map((column) => (sortColumnName === column.dataKey
              ? <SearchResultTableHeader key={column.dataKey} column={column} sort={sortDir} />
              : <SearchResultTableHeader key={column.dataKey} column={column} />
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <SearchResultTableRow
              key={item.get('csid')}
              item={item}
              index={index}
              totalItems={totalItems}
              renderContext={renderContext}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

SearchResultTable.propTypes = propTypes;

export default injectIntl(SearchResultTable);
