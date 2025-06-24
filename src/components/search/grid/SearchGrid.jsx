import React from 'react';
import styles from './SearchGrid.css';
import deactivate from '../../../../images/deactivate.svg';

export function SimpleCard() {
  // todo: read fields from record config
  return (
    <div>
      <img src={deactivate} className={styles.card} />
      <div>
        <div className={styles.summary}>
          <input type="checkbox" />
          <span>2025.1.2: Object Test</span>
        </div>
        <span>6/6/2025, 12:41 PM</span>
      </div>
    </div>
  );
}

export default function SearchResultGrid() {
  // todo: sidebar is open prop to control grid size?
  // or could try flexbox

  return (
    <div className={styles.grid}>
      <SimpleCard />
      <SimpleCard />
      <SimpleCard />
      <SimpleCard />
      <SimpleCard />
      <SimpleCard />
    </div>
  );
}
