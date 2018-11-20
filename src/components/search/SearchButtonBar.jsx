import React from 'react';
import PropTypes from 'prop-types';
import SearchButton from './SearchButton';
import SearchClearButton from './SearchClearButton';
// import SearchSaveButton from './SearchSaveButton';
import styles from '../../../styles/cspace-ui/ButtonBar.css';

const propTypes = {
  onClearButtonClick: PropTypes.func,
};

const defaultProps = {
  onClearButtonClick: undefined,
};

export default function SearchButtonBar(props) {
  const {
    onClearButtonClick,
  } = props;

  return (
    <div className={styles.common}>
      {/* <SearchSaveButton /> */}
      <SearchButton />
      <SearchClearButton onClick={onClearButtonClick} />
    </div>
  );
}

SearchButtonBar.propTypes = propTypes;
SearchButtonBar.defaultProps = defaultProps;
