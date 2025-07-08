import React from 'react';
import { useSelector } from 'react-redux';
import styles from './SearchGrid.css';
import deactivate from '../../../../images/deactivate.svg';
import { getSearchResult } from '../../../reducers';
import { NEW_SEARCH_RESULT_PAGE_SEARCH_NAME } from '../../../constants/searchNames';

export function SimpleCard({ result }) {
  // todo: read fields from record config
  // todo: loading image
  return (
    <div>
      <img src={deactivate} className={styles.card} />
      <div>
        <div className={styles.summary}>
          <input type="checkbox" />
          <span>{`${result.objectName} : ${result.title}`}</span>
        </div>
        <span>{result.updatedAt}</span>
      </div>
    </div>
  );
}

export default function SearchResultGrid({ searchDescriptor }) {
  const results = useSelector((state) => getSearchResult(state,
    NEW_SEARCH_RESULT_PAGE_SEARCH_NAME,
    searchDescriptor));

  // todo: sidebar is open prop to control grid size?
  // or could try flexbox

  return (
    <div className={styles.grid}>
      {results.map((result) => <SimpleCard result={result} />)}
    </div>
  );
}
