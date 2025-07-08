import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Immutable from 'immutable'; // todo: avoid Immutable
import get from 'lodash/get';
import qs from 'qs';
import CheckboxInput from 'cspace-input/lib/components/CheckboxInput';
import { NEW_SEARCH_RESULT_PAGE_SEARCH_NAME } from '../../../constants/searchNames';
import SearchResultTitleBar from '../../search/SearchResultTitleBar';
import ExportButton from '../../search/ExportButton';
import RelateButton from '../../record/RelateButton';
import Pager from '../../search/Pager';
import styles from '../../../../styles/cspace-ui/SearchResultPage.css';
import pageBodyStyles from '../../../../styles/cspace-ui/PageBody.css';
import selectStyles from '../../../../styles/cspace-ui/SelectBar.css';
import summaryStyles from '../../../../styles/cspace-ui/SearchResultSummary.css';
import tableStyles from '../../../../styles/cspace-ui/SearchResultTable.css';
import buttonBarStyles from '../../../../styles/cspace-ui/ButtonBar.css';
import newStyles from './SearchResults.css';
import SearchResultGrid from '../../search/grid/SearchGrid';
import SearchDetailList from '../../search/list/SearchList';
import SearchResultTable from '../../search/table/SearchTable';
import { ToggleButton, ToggleButtonContainer } from '../../search/header/ToggleButtons';
import { useConfig } from '../../config/ConfigProvider';

import {
  getSearchResult,
} from '../../../reducers';

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

export function SimpleFooter() {
  return (
    <footer>
      <Pager
        currentPage={0}
        lastPage={0}
        pageSize={20}
      />
    </footer>
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

// todo: memoize?
const getSearchDescriptor = (props) => {
  const {
    location,
    match,
  } = props;

  const {
    params,
  } = match;

  const {
    search,
  } = location;

  const query = qs.parse(search.substring(1));

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

export default function SearchResults(props) {
  const [display, setDisplay] = useState('table');
  const config = useConfig();

  const searchDescriptor = getSearchDescriptor(props);

  console.log(`${JSON.stringify(searchDescriptor)}`);

  const recordType = searchDescriptor.get('recordType');
  const recordTypeConfig = get(config, ['recordTypes', recordType]);
  console.log(`config=${JSON.stringify(recordTypeConfig)}`);

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
          style={newStyles[item.key]}
          onClick={() => setDisplay(item.key)}
        />
      )}
    />
  );

  let searchDisplay;
  if (display === 'table') {
    searchDisplay = <SearchResultTable searchDescriptor={searchDescriptor} />;
  } else if (display === 'grid') {
    searchDisplay = <SearchResultGrid searchDescriptor={searchDescriptor} />;
  } else if (display === 'list') {
    searchDisplay = <SearchDetailList searchDescriptor={searchDescriptor} />;
  }

  // why does the SRTB have the searchDescriptor?? It's the TitleBar lol
  return (
    <div className={styles.common}>
      <SearchResultTitleBar
        config={config}
        searchDescriptor={searchDescriptor}
        searchName={NEW_SEARCH_RESULT_PAGE_SEARCH_NAME}
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
          <SimpleFooter />
        </div>
      </div>
    </div>
  );
}
