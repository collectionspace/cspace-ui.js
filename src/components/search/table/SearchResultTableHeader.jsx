import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import qs from 'qs';
import styles from '../../../../styles/cspace-ui/SearchTable.css';

const propTypes = {
  column: PropTypes.shape({
    dataKey: PropTypes.string,
    formatValue: PropTypes.func,
    label: PropTypes.func,
  }),
  sortable: PropTypes.bool,
  sort: PropTypes.string,
};

const defaultProps = {
  sortable: true,
};

export default function SearchResultTableHeader({ column, sortable, sort }) {
  const history = useHistory();
  const location = useLocation();

  // DRYD-2136: related-record searches use CMIS, which can't sort on complex fields.
  if (!sortable) {
    return (
      <th style={{ textAlign: 'left' }}>
        {column.label()}
      </th>
    );
  }

  function handleSortChange() {
    let newSort;
    if (sort === undefined || sort === 'desc') {
      newSort = '';
    } else {
      newSort = ' desc';
    }

    const {
      search,
    } = location;

    const query = qs.parse(search.substring(1));

    query.sort = `${column.dataKey}${newSort}`;

    const queryString = qs.stringify(query);
    history.push({
      pathname: location.pathname,
      search: `?${queryString}`,
      state: location.state,
    });
  }

  let arrow;
  if (sort === 'asc') {
    arrow = (
      <svg width={16} height={16} viewBox="0 0 24 24">
        <path d="M 7 14 l5-5 5 5 z" />
      </svg>
    );
  } else if (sort === 'desc') {
    arrow = (
      <svg width={16} height={16} viewBox="0 0 24 24">
        <path d="M 7 14 l5 5 5-5 z" />
      </svg>
    );
  }

  return (
    <th
      className={styles.sortable}
      style={{ textAlign: 'left' }}
      onClick={() => handleSortChange()}
      tabIndex={0}
    >
      {column.label()}
      {arrow}
    </th>
  );
}

SearchResultTableHeader.propTypes = propTypes;
SearchResultTableHeader.defaultProps = defaultProps;
