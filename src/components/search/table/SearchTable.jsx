import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import get from 'lodash/get';
import Immutable from 'immutable';
import CheckboxInput from 'cspace-input/lib/components/CheckboxInput';
import SearchResultTableHeader from './SearchResultTableHeader';
import { getColumnConfig, readSearchResultList, readSearchResultListItems } from '../searchResultHelpers';
import { getSearchResult, getSearchSelectedItems } from '../../../reducers';
import { SEARCH_RESULT_PAGE_SEARCH_NAME } from '../../../constants/searchNames';
import { useConfig } from '../../config/ConfigProvider';
import { setResultItemSelected } from '../../../actions/search';
import styles from '../../../../styles/cspace-ui/SearchTable.css';

const propTypes = {
  searchDescriptor: PropTypes.instanceOf(Immutable.Map),
  listType: PropTypes.string,
  intl: PropTypes.object,
};

const messages = defineMessages({
  searchPending: {
    id: 'searchResultTable.searchPending',
    defaultMessage: '⋯',
  },
  rowAriaLabel: {
    id: 'searchResultTable.rowAriaLabel',
    description: 'The aria-label for a row',
    defaultMessage: '{primary} selected row {index} of {total}',
  },
});

function renderColumn(column, item, location) {
  const data = item.get(column.dataKey);
  const formatted = data ? column.formatValue(data) : null;
  const key = `${item.get('csid')}-${column.dataKey}`;
  return location
    ? <td key={key}><Link to={location}>{formatted}</Link></td>
    : <td key={key}>{formatted}</td>;
}

function renderRowLabel(params, totalItems, intl, columnConfig) {
  const {
    index,
    rowData,
  } = params;

  const primaryCol = Object.keys(columnConfig)
    .filter((col) => col !== 'workflowState')
    .at(0);

  const primaryData = rowData.get(primaryCol);
  const label = primaryData
    ? intl.formatMessage(messages.rowLabel,
      { primary: primaryData, index: index + 1, total: totalItems })
    : 'row';

  return label;
}

function renderRow(item, index, renderContext) {
  const {
    config,
    dispatch,
    listType,
    searchDescriptor,
    columns,
    selectedItems,
  } = renderContext;

  const csid = item.get('csid');
  const listTypeConfig = config.listTypes[listType];
  const { getItemLocationPath } = listTypeConfig;
  let location;
  if (getItemLocationPath) {
    location = getItemLocationPath(item, { config, searchDescriptor });
  }

  const a11yProps = {};
  a11yProps['aria-label'] = `Select row ${index}`;

  const selected = selectedItems ? selectedItems.has(csid) : false;
  return (
    <tr key={`${item.csid}-${index}`} className={index % 2 === 0 ? styles.even : styles.odd}>
      <td>
        <CheckboxInput
          {...a11yProps}
          embedded
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
      </td>
      {columns.map((column) => renderColumn(column, item, location))}
    </tr>
  );
}

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
 * todo: parity with other search result table
 *   - row data formatting
 *   - sorting
 *   - checkboxes actually working
 *   - aria-labels + general wcag compliance
 *   - ???
 */
function SearchResultTable({ searchDescriptor, listType = 'common', intl }) {
  const config = useConfig();
  const dispatch = useDispatch();
  const results = useSelector((state) => getSearchResult(state,
    SEARCH_RESULT_PAGE_SEARCH_NAME,
    searchDescriptor));
  const selectedItems = useSelector((state) => getSearchSelectedItems(state,
    SEARCH_RESULT_PAGE_SEARCH_NAME));

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

  // const totalItems = parseInt(list.get('totalItems'), 10);

  const renderContext = {
    config,
    dispatch,
    listType,
    searchDescriptor,
    selectedItems,
    columns,
  };

  // todo: formatting for row data
  // todo: showCheckbox
  return (
    <div className={styles.results}>
      <table>
        <thead>
          <tr>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th className={styles.checkbox} aria-label="Select" />
            {columns.map((column) => (sortColumnName === column.dataKey
              ? <SearchResultTableHeader key={column.dataKey} column={column} sort={sortDir} />
              : <SearchResultTableHeader key={column.dataKey} column={column} />
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => renderRow(item, index, renderContext))}
        </tbody>
      </table>
    </div>
  );
}

SearchResultTable.propTypes = propTypes;

export default injectIntl(SearchResultTable);
