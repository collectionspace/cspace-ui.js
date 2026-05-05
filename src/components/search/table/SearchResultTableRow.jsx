import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Link } from 'react-router-dom';
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
  let state;
  if (getItemLocationPath) {
    location = getItemLocationPath(item, { config, searchDescriptor });
    state = {
      searchDescriptor: searchDescriptor.toJS(),
      // The search traverser on records will always link to the search result page, so use
      // its search name.
      searchName: SEARCH_RESULT_PAGE_SEARCH_NAME,
      listType,
    };
  }

  const selected = selectedItems ? selectedItems.has(csid) : false;

  const rowAriaLabel = createRowLabel(columns[0], item, index, totalItems, intl);

  return (
    <tr
      aria-label={rowAriaLabel}
      className={index % 2 === 0 ? styles.even : styles.odd}
    >
      <td>
        <SearchResultCheckbox
          index={index}
          listType={listType}
          searchDescriptor={searchDescriptor}
          selected={selected}
        />
      </td>
      {columns.map((column) => {
        const data = item.get(column.dataKey);
        const formatted = data ? column.formatValue(data) : null;
        const key = `${csid}-${column.dataKey}`;

        // Wrap the value in a link if it's in a linkable column and the location is available.
        const linkableColumns = ['title', 'objectNumber'];
        if (linkableColumns.includes(column.dataKey) && location) {
          return (
            <td key={key}>
              <Link to={{ pathname: location, state }}>
                {formatted}
              </Link>
            </td>
          );
        }

        return <td key={key}>{formatted}</td>;
      })}
    </tr>
  );
}

SearchResultTableRow.propTypes = propTypes;

export default injectIntl(SearchResultTableRow);
