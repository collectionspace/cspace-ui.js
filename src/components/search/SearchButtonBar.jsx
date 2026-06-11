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
  saveDisabled: PropTypes.bool,
};

const defaultProps = {
  onClearButtonClick: undefined,
  onSaveButtonClick: undefined,
  onSavedQueriesButtonClick: undefined,
  saveDisabled: undefined,
};

export default function SearchButtonBar(props) {
  const {
    onClearButtonClick,
    onSaveButtonClick,
    onSavedQueriesButtonClick,
    saveDisabled,
  } = props;

  return (
    <div className={styles.common}>
      {onSavedQueriesButtonClick && <SavedQueriesButton onClick={onSavedQueriesButtonClick} />}
      {onSaveButtonClick && (
        <SearchSaveButton disabled={saveDisabled} onClick={onSaveButtonClick} />
      )}
      <SearchButton />
      <SearchClearButton onClick={onClearButtonClick} />
    </div>
  );
}

SearchButtonBar.propTypes = propTypes;
SearchButtonBar.defaultProps = defaultProps;
