import React from 'react';
import PropTypes from 'prop-types';
import SearchButton from './SearchButton';
import SearchClearButton from './SearchClearButton';
import SearchSaveButton from './SearchSaveButton';
import styles from '../../../styles/cspace-ui/ButtonBar.css';
import SavedQueriesButton from './SavedQueriesButton';

const propTypes = {
  onClearButtonClick: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
  onSavedQueriesButtonClick: PropTypes.func,
};

const defaultProps = {
  onClearButtonClick: undefined,
  onSaveButtonClick: undefined,
  onSavedQueriesButtonClick: undefined,
};

export default function SearchButtonBar(props) {
  const {
    onClearButtonClick,
    onSaveButtonClick,
    onSavedQueriesButtonClick,
  } = props;

  return (
    <div className={styles.common}>
      {onSavedQueriesButtonClick && <SavedQueriesButton onClick={onSavedQueriesButtonClick} />}
      {onSaveButtonClick && <SearchSaveButton onClick={onSaveButtonClick} />}
      <SearchButton />
      <SearchClearButton onClick={onClearButtonClick} />
    </div>
  );
}

SearchButtonBar.propTypes = propTypes;
SearchButtonBar.defaultProps = defaultProps;
