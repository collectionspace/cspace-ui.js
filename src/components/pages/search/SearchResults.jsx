import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { batch, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Immutable from 'immutable';
import qs from 'qs';
import get from 'lodash/get';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import {
  SEARCH_RESULT_GRID_VIEW,
  SEARCH_RESULT_LIST_VIEW,
  SEARCH_RESULT_PAGE_SEARCH_NAME,
  SEARCH_RESULT_TABLE_VIEW,
} from '../../../constants/searchNames';
import SearchResultTitleBar from '../../search/SearchResultTitleBar';
import SearchResultFooter from '../../search/SearchResultFooter';
import SearchResultTable from '../../search/table/SearchTable';
import SearchResultGrid from '../../search/grid/SearchResultGrid';
import SearchDetailList from '../../search/list/SearchList';
import SearchResultSidebar from '../../search/SearchResultSidebar';
import SearchResultSummary from '../../search/SearchResultSummary';
import SortBy from '../../search/SortBy';
import { ToggleButton, ToggleButtonContainer } from '../../search/header/ToggleButtons';
import { useConfig } from '../../config/ConfigProvider';
import styles from '../../../../styles/cspace-ui/SearchResults.css';
import buttonBarStyles from '../../../../styles/cspace-ui/ButtonBar.css';

import {
  setSearchPageRecordType,
  setSearchPageVocabulary,
  setSearchResultPagePageSize,
  setSearchResultPageView,
} from '../../../actions/prefs';

import {
  search, setAllResultItemsSelected,
} from '../../../actions/search';
import {
  getSearchResult, isSearchResultSidebarOpen, getSearchSelectedItems, getUserPerms,
  getSearchResultPageView,
} from '../../../reducers';
import SelectBar from '../../search/SelectBar';
import RelateResults from '../../search/RelateResults';
import ExportResults from '../../search/ExportResults';
import {
  getListTypeFromResult,
  createPageSizeChangeHandler,
  extractAdvancedSearchGroupedTerms,
  createSortByHandler,
  createSortDirHandler,
} from '../../../helpers/searchHelpers';
import {
  setSearchPageAdvanced,
  setSearchPageAdvancedLimitBy,
  setSearchPageAdvancedSearchTerms,
  setSearchPageKeyword,
} from '../../../actions/searchPage';

const selectBarPropTypes = {
  toggleBar: PropTypes.object,
  searchResult: PropTypes.instanceOf(Immutable.Map),
  config: PropTypes.object,
  searchDescriptor: PropTypes.instanceOf(Immutable.Map),
};

export function SelectExportRelateToggleBar({
  toggleBar, searchResult, config, searchDescriptor,
}) {
  if (!searchResult) {
    return null;
  }

  const selectedItems = useSelector((state) => getSearchSelectedItems(state,
    SEARCH_RESULT_PAGE_SEARCH_NAME));
  const perms = useSelector((state) => getUserPerms(state));

  const dispatch = useDispatch();

  // button bar (relate/export)
  const exportButton = (
    <ExportResults
      config={config}
      selectedItems={selectedItems}
      searchDescriptor={searchDescriptor}
    />
  );

  const relateButton = (
    <RelateResults
      config={config}
      selectedItems={selectedItems}
      searchDescriptor={searchDescriptor}
      perms={perms}
      disabled={false}
      key="relate"
    />
  );

  const buttonBar = (
    <div className={buttonBarStyles.common}>
      {relateButton}
      {exportButton}
    </div>
  );

  const listType = getListTypeFromResult(config, searchResult);
  return (
    <SelectBar
      config={config}
      listType={listType}
      searchDescriptor={searchDescriptor}
      searchName={SEARCH_RESULT_PAGE_SEARCH_NAME}
      searchResult={searchResult}
      selectedItems={selectedItems}
      setAllItemsSelected={
      (...args) => dispatch(setAllResultItemsSelected(...args))
    }
    >
      {buttonBar}
      {toggleBar}
    </SelectBar>
  );
}

// memoize?
const getSearchDescriptor = (query, props) => {
  const {
    match,
  } = props;

  const {
    params,
  } = match;

  const searchQuery = {
    ...query,
    p: parseInt(query.p, 10) - 1,
    size: parseInt(query.size, 10),
  };

  const advancedSearchCondition = query.as;

  if (advancedSearchCondition) {
    searchQuery.as = JSON.parse(advancedSearchCondition);
  }

  const searchDescriptor = {
    searchQuery,
  };

  ['recordType', 'vocabulary', 'csid', 'subresource'].forEach((param) => {
    const value = params[param];

    if (typeof value !== 'undefined') {
      searchDescriptor[param] = value;
    }
  });

  return Immutable.fromJS(searchDescriptor);
};

function setPreferredPageSize(props, dispatch) {
  const {
    location,
  } = props;

  const {
    search: searchFromLoc,
  } = location;

  const query = qs.parse(searchFromLoc.substring(1));
  dispatch(setSearchResultPagePageSize(parseInt(query.size, 10)));
}

function normalizeQuery(props, config) {
  const {
    history,
    location,
    preferredPageSize,
  } = props;

  const {
    search: searchFromLoc,
  } = location;

  const query = qs.parse(searchFromLoc.substring(1));

  if (history) {
    const normalizedQueryParams = {};

    const pageSize = parseInt(query.size, 10);

    if (Number.isNaN(pageSize) || pageSize < 1) {
      const normalizedPageSize = preferredPageSize || config.defaultSearchPageSize || 20;

      normalizedQueryParams.size = normalizedPageSize.toString();
    } else if (pageSize > 2500) {
      // Services layer max is 2500
      normalizedQueryParams.size = '2500';
    } else if (pageSize.toString() !== query.size) {
      normalizedQueryParams.size = pageSize.toString();
    }

    const pageNum = parseInt(query.p, 10);

    if (Number.isNaN(pageNum) || pageNum < 1) {
      normalizedQueryParams.p = '1';
    } else if (pageNum.toString() !== query.p) {
      normalizedQueryParams.p = pageNum.toString();
    }

    if (Object.keys(normalizedQueryParams).length > 0) {
      const newQuery = { ...query, ...normalizedQueryParams };

      /*
      const queryString = qs.stringify(newQuery);
      history.replace({
        pathname: location.pathname,
        search: `?${queryString}`,
        state: location.state,
      });
      */

      return newQuery;
    }
  }

  return query;
}

const messages = defineMessages({
  table: {
    id: 'search.result.view.table',
    description: 'The table button aria-label',
    defaultMessage: 'table',
  },
  detailList: {
    id: 'search.result.view.detailList',
    description: 'The detailList button aria-label',
    defaultMessage: 'list',
  },
  grid: {
    id: 'search.result.view.grid',
    description: 'The grid button aria-label',
    defaultMessage: 'grid',
  },
  sidebarToggle: {
    id: 'search.result.sidebar.toggle',
    description: 'a message which should be removed',
    defaultMessage: 'Move sidebar {position}',
  },
});

/**
 * The page for displaying Search Results. Before rendering it first executes the search based on
 * the query parameters provided by encapsulating them in a search descriptor and calling the search
 * action in redux.
 *
 * Currently this is more for the new search views on CollectionObjects which includes a grid and
 * detail based view compared to the older table based view. Ideally this be the only component for
 * displaying search results but we first would need to make sure we only display the views which
 * are supported for a given procedure or authority.
 *
 * @param {*} props
 * @returns the SearchResults page component
 */
function SearchResults(props) {
  const [sidebarPosition, setSidebarPosition] = useState('right');
  const config = useConfig();
  const dispatch = useDispatch();
  const history = useHistory();
  const { intl, location } = props;

  const normalizedQuery = normalizeQuery(props, config);
  const searchDescriptor = getSearchDescriptor(normalizedQuery, props);

  const searchResults = useSelector((state) => getSearchResult(state,
    SEARCH_RESULT_PAGE_SEARCH_NAME,
    searchDescriptor));
  const isSidebarOpen = useSelector((state) => isSearchResultSidebarOpen(state));
  const display = useSelector((state) => getSearchResultPageView(state));

  useEffect(() => {
    setPreferredPageSize(props, dispatch);
    dispatch(search(config, SEARCH_RESULT_PAGE_SEARCH_NAME, searchDescriptor));
  }, [searchDescriptor.toString(), searchResults?.size]);

  const handlePageSizeChange = createPageSizeChangeHandler({
    history,
    location,
    dispatch,
    setPreferredPageSize: setSearchResultPagePageSize,
  });

  const handleEditSearchLinkClick = () => {
    // Transfer the search descriptor from this search to the search page. If this search
    // originated from the search page, the original descriptor will be in the location state.
    // Otherwise, build it from the URL params. If present, the search descriptor from the
    // originating search page will be more complete than one constructed from the URL; for
    // example, it will contain fields that are blank, which will have been removed from the
    // URL, to reduce the size.
    const origin = get(location.state, 'originSearchPage');
    const conditionalSearchDescriptor = origin
      ? Immutable.fromJS(origin.searchDescriptor)
      : getSearchDescriptor(normalizedQuery, props);

    const searchQuery = conditionalSearchDescriptor.get('searchQuery');

    batch(() => {
      dispatch(setSearchPageRecordType(conditionalSearchDescriptor.get('recordType')));
      dispatch(setSearchPageVocabulary(conditionalSearchDescriptor.get('vocabulary')));
      dispatch(setSearchPageKeyword(searchQuery.get('kw')));
      dispatch(setSearchPageAdvanced(searchQuery.get('as')));
      dispatch(setSearchPageAdvancedLimitBy(extractAdvancedSearchGroupedTerms(searchQuery.get('as')).limitBy));
      dispatch(setSearchPageAdvancedSearchTerms(extractAdvancedSearchGroupedTerms(searchQuery.get('as')).searchTerms));
    });
  };

  const handleSortChange = createSortByHandler({ history, location });
  const handleSortDirChange = createSortDirHandler({ history, location });

  const renderSortBy = () => (
    <SortBy
      onSortChange={handleSortChange}
      onSortDirChange={handleSortDirChange}
      sort={normalizedQuery?.sort}
      recordType={searchDescriptor.get('recordType')}
    />
  );

  const gridAriaLabel = intl.formatMessage(messages.grid);
  const detailListAriaLabel = intl.formatMessage(messages.detailList);
  const tableAriaLabel = intl.formatMessage(messages.table);
  const toggles = [
    { key: SEARCH_RESULT_TABLE_VIEW, label: tableAriaLabel },
    { key: SEARCH_RESULT_GRID_VIEW, label: gridAriaLabel },
    { key: SEARCH_RESULT_LIST_VIEW, label: detailListAriaLabel },
  ];

  const nextPosition = sidebarPosition === 'right' ? 'left' : 'right';
  const displayToggles = (
    <ToggleButtonContainer
      items={toggles}
      renderButton={(item) => (
        <ToggleButton
          disabled={false}
          key={item.key}
          name={item.key}
          label={item.label}
          style={styles[item.key]}
          onClick={() => dispatch(setSearchResultPageView(item.key))}
        />
      )}
      renderSidebarToggle={() => (
        <ToggleButton
          disabled={false}
          key="sidebar"
          name="sidebar"
          label={`Move sidebar ${nextPosition}`}
          onClick={() => setSidebarPosition(nextPosition)}
        />
      )}
    />
  );

  let searchDisplay;
  if (display === SEARCH_RESULT_GRID_VIEW) {
    searchDisplay = <SearchResultGrid searchDescriptor={searchDescriptor} />;
  } else if (display === SEARCH_RESULT_LIST_VIEW) {
    searchDisplay = <SearchDetailList searchDescriptor={searchDescriptor} />;
  } else {
    searchDisplay = <SearchResultTable searchDescriptor={searchDescriptor} />;
  }

  const sidebar = (
    <SearchResultSidebar
      config={config}
      history={history}
      isOpen={isSidebarOpen}
      recordType={searchDescriptor.get('recordType')}
      position={sidebarPosition}
    />
  );

  return (
    <main className={styles.common}>
      <SearchResultTitleBar
        config={config}
        searchDescriptor={searchDescriptor}
        searchName={SEARCH_RESULT_PAGE_SEARCH_NAME}
        updateDocumentTitle
      />
      <div className={isSidebarOpen ? styles.body : styles.full}>
        {/* SearchResultHeader? */}
        {sidebarPosition === 'left' ? sidebar : null}
        <div className={styles.results}>
          <header>
            <SearchResultSummary
              config={config}
              searchName={SEARCH_RESULT_PAGE_SEARCH_NAME}
              searchDescriptor={searchDescriptor}
              onPageSizeChange={handlePageSizeChange}
              onEditSearchLinkClick={handleEditSearchLinkClick}
              renderSortBy={() => renderSortBy()}
            />
            <SelectExportRelateToggleBar
              toggleBar={displayToggles}
              searchResult={searchResults}
              config={config}
              searchDescriptor={searchDescriptor}
            />
          </header>
          {searchDisplay}
          <SearchResultFooter searchDescriptor={searchDescriptor} />
        </div>
        {sidebarPosition === 'right' ? sidebar : null}
      </div>
    </main>
  );
}

const searchResultsPropTypes = {
  intl: intlShape,
  location: PropTypes.object.isRequired,
};

SearchResults.propTypes = searchResultsPropTypes;
SelectExportRelateToggleBar.propTypes = selectBarPropTypes;

export default injectIntl(SearchResults);
