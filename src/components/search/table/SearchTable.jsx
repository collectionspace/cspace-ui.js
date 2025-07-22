import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import get from 'lodash/get';
import Immutable from 'immutable';
import { injectIntl } from 'react-intl';
import CheckboxInput from 'cspace-input/lib/components/CheckboxInput';
import styles from './SearchTable.css';
import { getColumnConfig, readListItems } from '../searchResultHelpers';
import { getSearchResult, getSearchSelectedItems } from '../../../reducers';
import { SEARCH_RESULT_PAGE_SEARCH_NAME } from '../../../constants/searchNames';
import { useConfig } from '../../config/ConfigProvider';
import { setResultItemSelected } from '../../../actions/search';

const propTypes = {
  searchDescriptor: PropTypes.instanceOf(Immutable.Map),
  listType: PropTypes.string,
  intl: PropTypes.object,
};

function renderColumn(column, item, location) {
  const data = item.get(column.dataKey);
  const formatted = data ? column.formatValue(data) : null;
  return location
    ? <td><Link to={location}>{formatted}</Link></td>
    : <td>{formatted}</td>;
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

  const selected = selectedItems ? selectedItems.has(csid) : false;
  return (
    <tr key={item.csid} className={index % 2 === 0 ? styles.even : styles.odd}>
      <td>
        <CheckboxInput
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
  const dispatch = useDispatch();
  const results = useSelector((state) => getSearchResult(state,
    SEARCH_RESULT_PAGE_SEARCH_NAME,
    searchDescriptor));
  const selectedItems = useSelector((state) => getSearchSelectedItems(state,
    SEARCH_RESULT_PAGE_SEARCH_NAME));
  const config = useConfig();
  const history = useHistory();

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
    config,
    dispatch,
    listType,
    searchDescriptor,
    selectedItems,
    columns,
    history,
  };

  // todo: formatting for row data
  // todo: showCheckbox
  return (
    <div className={styles.results}>
      <table>
        <thead>
          <tr>
            <th className={styles.checkbox} />
            {columns.map((column) => (
              <th key={column.dataKey} style={{ textAlign: 'left' }}>{column.label()}</th>
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
