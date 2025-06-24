import React from 'react';
import styles from './SearchList.css';
import deactivate from '../../../../images/deactivate.svg';

export function DetailItem() {
  // todo: read fields from record config

  return (
    <div className={styles.innerdetail}>
      <img src={deactivate} className={styles.detailimg} />
      <input style={{ alignSelf: 'flex-start' }} type="checkbox" />
      <ol>
        <li>ID: 2025.1.2</li>
        <li>Title: Published Item Title Test</li>
        <li>Responsible Department: Departmentalized</li>
        <li>Current Location: Storage Site A</li>
        <li>Brief Description: Some information about this item...</li>
      </ol>
    </div>
  );
}

export default function SearchDetailList() {
  return (
    <div className={styles.detail}>
      <DetailItem />
    </div>
  );
}
