import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import { CheckboxInput } from '../../helpers/configContextInputs';
import { useConfig } from '../config/ConfigProvider';
import { SEARCH_RESULT_PAGE_SEARCH_NAME } from '../../constants/searchNames';
import { setResultItemSelected } from '../../actions/search';

import styles from '../../../styles/cspace-ui/SearchTable.css';

const messages = defineMessages({
  checkboxLabelSelect: {
    id: 'searchResult.checkboxAriaLabel',
    description: 'The aria-label for a checkbox input',
    defaultMessage: 'Select item {index}',
  },
});

function SearchResultCheckbox({
  index, listType, searchDescriptor, selected, intl,
}) {
  const config = useConfig();
  const dispatch = useDispatch();

  // todo: use an id field (e.g. objectNumber) instead of the index
  const ariaLabel = intl.formatMessage(messages.checkboxLabelSelect, { index });

  return (
    <CheckboxInput
      embedded
      aria-label={ariaLabel}
      className={styles.detailCheckbox}
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
  );
}

export default injectIntl(SearchResultCheckbox);

SearchResultCheckbox.propTypes = {
  index: PropTypes.number,
  listType: PropTypes.string,
  searchDescriptor: PropTypes.object,
  selected: PropTypes.bool,
  intl: PropTypes.object,
};
