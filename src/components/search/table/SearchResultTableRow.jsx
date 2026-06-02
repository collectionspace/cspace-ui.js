import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useConfig } from '../../config/ConfigProvider';
import { SEARCH_RESULT_PAGE_SEARCH_NAME } from '../../../constants/searchNames';
import styles from '../../../../styles/cspace-ui/SearchTable.css';
import SearchResultCheckbox from '../SearchResultCheckbox';

const propTypes = {
  item: PropTypes.instanceOf(Immutable.Map),
  index: PropTypes.number,
  totalItems: PropTypes.number,
  intl: PropTypes.object,
  renderContext: PropTypes.shape({
    listType: PropTypes.string,
    searchDescriptor: PropTypes.object,
    columns: PropTypes.array,
    selectedItems: PropTypes.object,
  }),
};

const messages = defineMessages({
  rowAriaLabel: {
    id: 'searchResultTableRow.rowAriaLabel',
    description: 'The aria-label for a row',
    defaultMessage: 'Row {index} of {total} - {primary}',
  },
});

function renderColumn(column, item) {
  const data = item.get(column.dataKey);
  const formatted = data ? column.formatValue(data) : null;
  const key = `${item.get('csid')}-${column.dataKey}`;
  return <td key={key}>{formatted}</td>;
}

function createRowLabel(column, item, index, total, intl) {
  const data = item.get(column.dataKey);
  return data
    ? intl.formatMessage(messages.rowAriaLabel,
      { primary: data, index: index + 1, total })
    : 'row';
}

function SearchResultTableRow({
  item, index, totalItems, renderContext, intl,
}) {
  const config = useConfig();
  const history = useHistory();

  const {
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

  const rowAriaLabel = createRowLabel(columns[0], item, index, totalItems, intl);

  function handleRowClick() {
    // from SearchResultTable:
    // Create a location with the item location path, along with enough state to reproduce this
    // search. The search descriptor is converted to an object in order to reliably store it in
    // location state. Also merge in any object that was passed in via the linkState prop.
    const state = {
      searchDescriptor: searchDescriptor.toJS(),
      // The search traverser on records will always link to the search result page, so use
      // its search name.
      searchName: SEARCH_RESULT_PAGE_SEARCH_NAME,
      listType,
      // ...linkState,
    };

    history.push(location, state);
  }

  return (
    <tr
      aria-label={rowAriaLabel}
      role="link"
      tabIndex={0}
      className={index % 2 === 0 ? styles.even : styles.odd}
      onClick={handleRowClick}
    >
      <td>
        <SearchResultCheckbox
          index={index}
          listType={listType}
          searchDescriptor={searchDescriptor}
          selected={selected}
        />
      </td>
      {columns.map((column) => renderColumn(column, item, location))}
    </tr>
  );
}

SearchResultTableRow.propTypes = propTypes;

export default injectIntl(SearchResultTableRow);
