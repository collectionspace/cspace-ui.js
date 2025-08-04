import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import CheckboxInput from 'cspace-input/lib/components/CheckboxInput';
import { useConfig } from '../../config/ConfigProvider';
import { setResultItemSelected } from '../../../actions/search';
import { SEARCH_RESULT_PAGE_SEARCH_NAME } from '../../../constants/searchNames';
import styles from '../../../../styles/cspace-ui/SearchTable.css';

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
  checkboxLabelSelect: {
    id: 'searchResultTableRow.checkboxLabelSelect',
    description: 'The aria-label for a checkbox input',
    defaultMessage: 'Select row {index}',
  },
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
  const dispatch = useDispatch();
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
  const checkboxAriaLabel = intl.formatMessage(messages.checkboxLabelSelect, { index: index + 1 });

  return (
    <tr
      aria-label={rowAriaLabel}
      role="link"
      tabIndex={0}
      className={index % 2 === 0 ? styles.even : styles.odd}
      onClick={() => history.push(location)}
    >
      <td>
        <CheckboxInput
          aria-label={checkboxAriaLabel}
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

SearchResultTableRow.propTypes = propTypes;

export default injectIntl(SearchResultTableRow);
