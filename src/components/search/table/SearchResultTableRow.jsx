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
  renderContext: PropTypes.shape({
    listType: PropTypes.string,
    searchDescriptor: PropTypes.object,
    columns: PropTypes.array,
    selectedItems: PropTypes.object,
  }),
};

const messages = defineMessages({
  checkboxLabel: {
    id: 'searchResultTableRow.checkboxLabel',
    description: 'The aria-label for a checkbox input',
    defaultMessage: 'Selected row {index}',
  },
  rowAriaLabel: {
    id: 'searchResultTableRow.rowAriaLabel',
    description: 'The aria-label for a row',
    defaultMessage: '{primary} selected row {index} of {total}',
  },
});

function renderColumn(column, item) {
  const data = item.get(column.dataKey);
  const formatted = data ? column.formatValue(data) : null;
  const key = `${item.get('csid')}-${column.dataKey}`;
  return <td key={key}>{formatted}</td>;
}

function SearchResultTableRow({ item, index, renderContext }) {
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

  const a11yProps = {};
  a11yProps['aria-label'] = `Select row ${index}`;

  const selected = selectedItems ? selectedItems.has(csid) : false;
  return (
    <tr
      tabIndex={0}
      className={index % 2 === 0 ? styles.even : styles.odd}
      onClick={() => history.push(location)}
    >
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

SearchResultTableRow.propTypes = propTypes;

export default injectIntl(SearchResultTableRow);
