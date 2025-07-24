import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import qs from 'qs';

const propTypes = {
  column: PropTypes.shape({
    dataKey: PropTypes.string,
    formatValue: PropTypes.func,
    label: PropTypes.func,
  }),
  sort: PropTypes.string,
};

export default function SearchResultTableHeader({ column, sort }) {
  const history = useHistory();
  const location = useLocation();

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
    <th key={column.dataKey} style={{ textAlign: 'left' }} onClick={() => handleSortChange()}>
      {column.label()}
      {arrow}
    </th>
  );
}

SearchResultTableHeader.propTypes = propTypes;
