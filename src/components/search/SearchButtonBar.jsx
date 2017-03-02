import React from 'react';
import SearchButton from './SearchButton';
// import SearchSaveButton from './SearchSaveButton';
import styles from '../../../styles/cspace-ui/ButtonBar.css';

export default function SearchButtonBar() {
  return (
    <div className={styles.common}>
      {/* <SearchSaveButton /> */}
      <SearchButton />
    </div>
  );
}
