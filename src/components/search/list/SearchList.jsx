import React from 'react';
import { useSelector } from 'react-redux';
import styles from './SearchList.css';
import deactivate from '../../../../images/deactivate.svg';
import { getSearchResult } from '../../../reducers';
import { NEW_SEARCH_RESULT_PAGE_SEARCH_NAME } from '../../../constants/searchNames';

export function DetailItem({ result }) {
  // todo: read fields from record config

  return (
    <div className={styles.innerdetail}>
      <img src={deactivate} className={styles.detailimg} />
      <input style={{ alignSelf: 'flex-start' }} type="checkbox" />
      <ol>
        <li>{`ID: ${result.objectNumber}`}</li>
        <li>{`Title: ${result.title}`}</li>
        <li>{`Responsible Department: ${result.responsibleDepartment}`}</li>
        <li>{`Current Location: ${result.computedCurrentLocation}`}</li>
        <li>{`Brief Description: ${result.briefDescription}`}</li>
      </ol>
    </div>
  );
}

export default function SearchDetailList({ searchDescriptor }) {
  const results = useSelector((state) => getSearchResult(state,
    NEW_SEARCH_RESULT_PAGE_SEARCH_NAME,
    searchDescriptor));

  return (
    <div className={styles.detail}>
      {results.map((result) => <DetailItem result={result} />)}
    </div>
  );
}
