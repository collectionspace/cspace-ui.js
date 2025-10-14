import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Pager from './Pager';
import { useConfig } from '../config/ConfigProvider';
import { SEARCH_RESULT_PAGE_SEARCH_NAME } from '../../constants/searchNames';
import { getSearchResult } from '../../reducers';
import { setSearchResultPagePageSize } from '../../actions/prefs';
import { getListTypeFromResult, createPageSizeChangeHandler, createPageChangeHandler } from '../../helpers/searchHelpers';

const propTypes = {
  searchDescriptor: PropTypes.object,
};

/**
 * A wrapper around a Pager to query for search results and populate the pagination info
 * @returns A <Pager /> wrapped in a <footer />
 */
export default function SearchResultFooter({ searchDescriptor }) {
  const results = useSelector((state) => getSearchResult(state,
    SEARCH_RESULT_PAGE_SEARCH_NAME,
    searchDescriptor));
  const config = useConfig();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  if (!results) {
    return (
      <footer />
    );
  }

  const onPageChange = createPageChangeHandler({
    history,
    location,
    zeroIndexed: true,
  });

  const onPageSizeChange = createPageSizeChangeHandler({
    history,
    location,
    dispatch,
    setPreferredPageSize: setSearchResultPagePageSize,
  });

  const listType = getListTypeFromResult(config, results);
  const listTypeConfig = config.listTypes[listType];
  const { listNodeName } = listTypeConfig;

  const list = results.get(listNodeName);

  // useful to have a helper function for this?
  const totalItems = parseInt(list.get('totalItems'), 10);
  const pageNum = parseInt(list.get('pageNum'), 10);
  const pageSize = parseInt(list.get('pageSize'), 10);

  const lastPage = Math.max(
    0,
    Number.isNaN(totalItems) ? 0 : Math.ceil(totalItems / pageSize) - 1,
  );

  return (
    <footer>
      <Pager
        currentPage={pageNum}
        lastPage={lastPage}
        pageSize={pageSize}
        // eslint-disable-next-line react/jsx-no-bind
        onPageChange={onPageChange}
        // eslint-disable-next-line react/jsx-no-bind
        onPageSizeChange={onPageSizeChange}
      />
    </footer>
  );
}

SearchResultFooter.propTypes = propTypes;
