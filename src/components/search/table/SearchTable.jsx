import React from 'react';
import { useSelector } from 'react-redux';
import styles from './SearchTable.css';
import { getSearchResult } from '../../../reducers';
import { NEW_SEARCH_RESULT_PAGE_SEARCH_NAME } from '../../../constants/searchNames';

export default function SearchResultTable({ searchDescriptor }) {
  const results = useSelector((state) => getSearchResult(state,
    NEW_SEARCH_RESULT_PAGE_SEARCH_NAME,
    searchDescriptor));

  // read headers
  // read data

  // todo: read columns from record config
  return (
    <div className={styles.results}>
      <table>
        <thead>
          <tr>
            <th className={styles.checkbox} />
            <th style={{ textAlign: 'left' }}>Identification number</th>
            <th style={{ textAlign: 'left' }}>Title</th>
            <th style={{ textAlign: 'left' }}>Updated at</th>
          </tr>
        </thead>
        <tbody>
          {results.map((item, index) => (
            <tr key={item.csid} className={index % 2 === 0 ? styles.even : styles.odd}>
              {/* CheckboxInput */}
              <td><input type="checkbox" /></td>
              <td>{item.objectNumber}</td>
              <td>{item.title}</td>
              <td>{item.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
