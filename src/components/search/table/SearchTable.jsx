import React from 'react';
import styles from './SearchTable.css';

export default function SearchResultTable() {
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
          <tr key="obj-1" className={styles.even}>
            {/* CheckboxInput */}
            <td><input type="checkbox" /></td>
            <td>2025.1.12</td>
            <td>Published Item New Line Test</td>
            <td>6/6/2025, 12:41 PM</td>
          </tr>
          <tr key="obj-2" className={styles.odd}>
            <td><input type="checkbox" /></td>
            <td>2025.1.11</td>
            <td />
            <td>5/13/2025, 10:11 AM</td>
          </tr>
          <tr key="obj-3" className={styles.even}>
            <td><input type="checkbox" /></td>
            <td>IN2025.5</td>
            <td>intake</td>
            <td>5/5/2025, 10:40 AM</td>
          </tr>
          <tr key="obj-4" className={styles.odd}>
            <td><input type="checkbox" /></td>
            <td>2025.1.7</td>
            <td />
            <td>4/28/2025, 7:23 AM</td>
          </tr>
          <tr key="obj-5" className={styles.even}>
            <td><input type="checkbox" /></td>
            <td>2025.1.8</td>
            <td />
            <td>4/25/2025, 7:07 AM</td>
          </tr>
          <tr key="obj-6" className={styles.odd}>
            <td><input type="checkbox" /></td>
            <td>2025.1.5</td>
            <td />
            <td>4/25/2025, 7:11 AM</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
