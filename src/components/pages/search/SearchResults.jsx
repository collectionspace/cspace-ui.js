import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Immutable from 'immutable'; // todo: avoid Immutable
import qs from 'qs';
import CheckboxInput from 'cspace-input/lib/components/CheckboxInput';
import { SEARCH_RESULT_PAGE_SEARCH_NAME } from '../../../constants/searchNames';
import SearchResultTitleBar from '../../search/SearchResultTitleBar';
import SearchResultFooter from '../../search/SearchResultFooter';
import ExportButton from '../../search/ExportButton';
import RelateButton from '../../record/RelateButton';
import styles from '../../../../styles/cspace-ui/SearchResultPage.css';
import pageBodyStyles from '../../../../styles/cspace-ui/PageBody.css';
import selectStyles from '../../../../styles/cspace-ui/SelectBar.css';
import summaryStyles from '../../../../styles/cspace-ui/SearchResultSummary.css';
import tableStyles from '../../../../styles/cspace-ui/SearchResultTable.css';
import buttonBarStyles from '../../../../styles/cspace-ui/ButtonBar.css';
import newStyles from './SearchResults.css';
import SearchResultTable from '../../search/table/SearchTable';
import { ToggleButton, ToggleButtonContainer } from '../../search/header/ToggleButtons';
import { useConfig } from '../../config/ConfigProvider';

import {
  setSearchResultPagePageSize,
} from '../../../actions/prefs';

import {
  search,
} from '../../../actions/search';

/*
* SearchResultSummary
*/
export function SimpleSummary({ searchDescriptor }) {
  const recordType = searchDescriptor.get('recordType');
  const vocabulary = searchDescriptor.get('vocabulary');
  const vocabularyPath = vocabulary ? `/${vocabulary}` : '';
  const path = `/search/${recordType}${vocabularyPath}`;
  const editLink = (
    <Link to={path}>
      <span>Revise search</span>
    </Link>
  );

  const message = (<span>1–10 of 10 records found</span>);
  return (
    <div className={summaryStyles.normal}>
      <div>
        {message}
        {(message && editLink) ? ' | ' : ''}
        {editLink}
      </div>
    </div>
  );
}

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
    <div className={buttonBarStyles.common} style={{ flexBasis: 'calc(1/3 * 100%)' }}>
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
      const queryString = qs.stringify(newQuery);

      history.replace({
        pathname: location.pathname,
        search: `?${queryString}`,
        state: location.state,
      });

      return newQuery;
    }
  }

  return query;
}

export default function SearchResults(props) {
  const [display, setDisplay] = useState('table');
  const config = useConfig();
  const dispatch = useDispatch();

  const normalizedQuery = normalizeQuery(props, config);
  setPreferredPageSize(props, dispatch);

  const searchDescriptor = getSearchDescriptor(normalizedQuery, props);
  dispatch(search(config, SEARCH_RESULT_PAGE_SEARCH_NAME, searchDescriptor, 'common')); // , 'common', true));

  const toggles = [
    { key: 'table', label: 'table' },
    // { key: 'grid', label: 'grid' },
    // { key: 'list', label: 'list' },
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
          style={newStyles[item.key]}
          onClick={() => setDisplay(item.key)}
        />
      )}
    />
  );

  const searchDisplay = <SearchResultTable searchDescriptor={searchDescriptor} listType="common" />;
  // todo: these are needed in the Title/Footer/Pager
  // const pageSize = parseInt(list.get('pageSize'), 10);
  // const totalItems = parseInt(list.get('totalItems'), 10);
  // const itemsInPage = parseInt(list.get('itemsInPage'), 10);

  // why does the SRTB have the searchDescriptor?? It's the TitleBar lol
  return (
    <div className={styles.common}>
      <SearchResultTitleBar
        config={config}
        searchDescriptor={searchDescriptor}
        searchName={SEARCH_RESULT_PAGE_SEARCH_NAME}
        updateDocumentTitle
      />
      <div className={pageBodyStyles.full}>
        {/* todo replace html with components */}
        {/* SearchResultHeader */}
        <div className={tableStyles.common}>
          <header>
            <SimpleSummary searchDescriptor={searchDescriptor} />
            <SimpleSelectBar toggleBar={displayToggles} />
          </header>
          {searchDisplay}
          <SearchResultFooter searchDescriptor={searchDescriptor} />
        </div>
      </div>
    </div>
  );
}
