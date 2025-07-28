import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Immutable from 'immutable';
import qs from 'qs';
import CheckboxInput from 'cspace-input/lib/components/CheckboxInput';
import { SEARCH_RESULT_PAGE_SEARCH_NAME } from '../../../constants/searchNames';
import SearchResultTitleBar from '../../search/SearchResultTitleBar';
import SearchResultFooter from '../../search/SearchResultFooter';
import ExportButton from '../../search/ExportButton';
import RelateButton from '../../record/RelateButton';
import SearchResultTable from '../../search/table/SearchTable';
import SearchResultGrid from '../../search/grid/SearchResultGrid';
import SearchDetailList from '../../search/list/SearchList';
import SearchResultSidebar from '../../search/SearchResultSidebar';
import SearchResultSummary from '../../search/SearchResultSummary';
import { ToggleButton, ToggleButtonContainer } from '../../search/header/ToggleButtons';
import { useConfig } from '../../config/ConfigProvider';
import styles from '../../../../styles/cspace-ui/SearchResults.css';
import selectStyles from '../../../../styles/cspace-ui/SelectBar.css';
import buttonBarStyles from '../../../../styles/cspace-ui/ButtonBar.css';

import {
  setSearchResultPagePageSize,
} from '../../../actions/prefs';

import {
  search,
} from '../../../actions/search';
import { getSearchError, getSearchResult, isSearchResultSidebarOpen } from '../../../reducers';

const selectBarPropTypes = {
  toggleBar: PropTypes.object,
};

export function SimpleSelectBar({ toggleBar }) {
  // button bar (relate/export)
  const exportButton = (
    <ExportButton
      disabled={false}
      key="export"
    />
  );

  const relateButton = (
    <RelateButton
      disabled={false}
      key="relate"
    />
  );

  const buttonBar = (
    <div className={buttonBarStyles.common}>
      {exportButton}
      {relateButton}
    </div>
  );

  // toggle bar (grid/table/etc)

  return (
    <div className={selectStyles.common}>
      <CheckboxInput
        embedded
        readOnly={false}
        transition={{
          null: false,
          true: false,
          false: true,
        }}
      />
      <span>0 Selected</span>
      {buttonBar}
      {toggleBar}
    </div>
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

export default function SearchResults(props) {
  const [display, setDisplay] = useState('table');
  const config = useConfig();
  const dispatch = useDispatch();
  const history = useHistory();

  const normalizedQuery = normalizeQuery(props, config);
  const searchDescriptor = getSearchDescriptor(normalizedQuery, props);
  useEffect(() => {
    setPreferredPageSize(props, dispatch);
    dispatch(search(config, SEARCH_RESULT_PAGE_SEARCH_NAME, searchDescriptor, 'common')); // , 'common', true));
  }, [normalizedQuery, searchDescriptor]);

  // todo: should these be called in each component? they're at the top level for now
  // as to not make too many changes at once
  const searchResults = useSelector((state) => getSearchResult(state,
    SEARCH_RESULT_PAGE_SEARCH_NAME,
    searchDescriptor));
  const searchErrors = useSelector((state) => getSearchError(state,
    SEARCH_RESULT_PAGE_SEARCH_NAME,
    searchDescriptor));
  const isSidebarOpen = useSelector((state) => isSearchResultSidebarOpen(state));

  const toggles = [
    { key: 'table', label: 'table' },
    { key: 'grid', label: 'grid' },
    { key: 'list', label: 'list' },
  ];

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
          onClick={() => setDisplay(item.key)}
        />
      )}
    />
  );

  let searchDisplay;
  if (display === 'table') {
    searchDisplay = <SearchResultTable searchDescriptor={searchDescriptor} listType="common" />;
  } else if (display === 'list') {
    searchDisplay = <SearchDetailList searchDescriptor={searchDescriptor} />;
  } else {
    searchDisplay = <SearchResultGrid searchDescriptor={searchDescriptor} />;
  }

  const sidebar = (
    <SearchResultSidebar
      config={config}
      history={history}
      isOpen={isSidebarOpen}
      recordType={searchDescriptor.recordType}
    />
  );

  return (
    <div className={styles.common}>
      <SearchResultTitleBar
        config={config}
        searchDescriptor={searchDescriptor}
        searchName={SEARCH_RESULT_PAGE_SEARCH_NAME}
        updateDocumentTitle
      />
      <div className={styles.body}>
        {/* SearchResultHeader? */}
        <div className={styles.results}>
          <header className={styles.header}>
            <SearchResultSummary
              listType="common"
              config={config}
              searchResult={searchResults}
              searchError={searchErrors}
              searchDescriptor={searchDescriptor}
            />
            <SimpleSelectBar toggleBar={displayToggles} />
          </header>
          {searchDisplay}
          <SearchResultFooter searchDescriptor={searchDescriptor} />
        </div>
        {sidebar}
      </div>
    </div>
  );
}

SimpleSelectBar.propTypes = selectBarPropTypes;
