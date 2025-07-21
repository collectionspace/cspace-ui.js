import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Pager from './Pager';
import { useConfig } from '../config/ConfigProvider';
import { getListType } from '../../helpers/searchHelpers';
import { SEARCH_RESULT_PAGE_SEARCH_NAME } from '../../constants/searchNames';
import { getSearchResult } from '../../reducers';

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

  if (!results) {
    return (
      <footer />
    );
  }

  const listType = getListType(searchDescriptor);
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
        // onPageChange={handlePageChange}
        // onPageSizeChange={handlePageSizeChange}
      />
    </footer>
  );
}

SearchResultFooter.propTypes = propTypes;
