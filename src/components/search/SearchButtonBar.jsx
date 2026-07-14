import React from 'react';
import PropTypes from 'prop-types';
import SearchButton from './SearchButton';
import SearchClearButton from './SearchClearButton';
import SearchPinButton from './SearchPinButton';
import styles from '../../../styles/cspace-ui/ButtonBar.css';
import PinnedQueriesButton from './PinnedQueriesButton';

const propTypes = {
  onClearButtonClick: PropTypes.func,
  onPinButtonClick: PropTypes.func,
  onPinnedQueriesButtonClick: PropTypes.func,
};

const defaultProps = {
  onClearButtonClick: undefined,
  onPinButtonClick: undefined,
  onPinnedQueriesButtonClick: undefined,
};

export default function SearchButtonBar(props) {
  const {
    onClearButtonClick,
    onPinButtonClick,
    onPinnedQueriesButtonClick,
  } = props;

  return (
    <div className={styles.common}>
      {onPinnedQueriesButtonClick && <PinnedQueriesButton onClick={onPinnedQueriesButtonClick} />}
      {onPinButtonClick && <SearchPinButton onClick={onPinButtonClick} />}
      <SearchButton />
      <SearchClearButton onClick={onClearButtonClick} />
    </div>
  );
}

SearchButtonBar.propTypes = propTypes;
SearchButtonBar.defaultProps = defaultProps;
