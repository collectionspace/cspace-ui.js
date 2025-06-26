import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Immutable from 'immutable'; // todo: avoid Immutable
import get from 'lodash/get';
import CheckboxInput from 'cspace-input/lib/components/CheckboxInput';
import { components as inputComponents } from 'cspace-input';
import { SEARCH_RESULT_PAGE_SEARCH_NAME } from '../../../constants/searchNames';
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

const { Button } = inputComponents;

const contextTypes = {
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }).isRequired,
};

export function ToggleButton(props) {
  const {
    label,
    style,
    name,
    ...remainingProps
  } = props;

  return (
    <Button
      className={style}
      icon
      name={name}
      {...remainingProps}
    >
      {label}
    </Button>
  );
}

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
  /*
  const tableLabel = <span>Table</span>;
  const tableButton = (
    <ToggleButton
      diabled="true"
      key="table"
      style={newStyles.table}
      name="table"
      label={tableLabel}
    />
  );

  const gridLabel = <span>Grid</span>;
  const gridButton = (
    <ToggleButton
      diabled="true"
      key="grid"
      style={newStyles.grid}
      name="grid"
      label={gridLabel}
    />
  );

  const detailLabel = <span>List</span>;
  const detailButton = (
    <ToggleButton
      diabled="true"
      key="detail"
      style={newStyles.list}
      name="detail"
      label={detailLabel}
    />
  );

  const toggleStyles = {
    flexBasis: 'calc(3/5 * 100%)',
    display: 'flex',
    justifyContent: 'flex-end',
  };
  const toggleBar = (
    <div className={buttonBarStyles.common} style={toggleStyles}>
      {tableButton}
      {gridButton}
      {detailButton}
    </div>
  );
  */

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

function renderToggleButton(type, style, setDisplay) {
  const tableLabel = (
    <span>
      {type}
    </span>
  );

  return (
    <ToggleButton
      diabled="true"
      key={type}
      style={style}
      name={type}
      label={tableLabel}
      onClick={() => setDisplay(type)}
    />
  );
}

function renderToggleBar(setDisplay) {
  const tableButton = renderToggleButton('table', newStyles.table, setDisplay);
  const gridButton = renderToggleButton('grid', newStyles.grid, setDisplay);
  const listButton = renderToggleButton('list', newStyles.list, setDisplay);

  const toggleStyles = {
    flexBasis: 'calc(3/5 * 100%)',
    display: 'flex',
    justifyContent: 'flex-end',
  };

  return (
    <div className={buttonBarStyles.common} style={toggleStyles}>
      {tableButton}
      {gridButton}
      {listButton}
    </div>
  );
}

function TBWP({ items, renderButton }) {
  const toggleStyles = {
    flexBasis: 'calc(3/5 * 100%)',
    display: 'flex',
    justifyContent: 'flex-end',
  };

  return (
    <div className={buttonBarStyles.common} style={toggleStyles}>
      {items.map((item) => renderButton(item))}
    </div>
  );
}

export default function SearchResults(props, context) {
  const [display, setDisplay] = useState('table');

  function handleSetDisplay(type) {
    console.log(`setting display type = ${type}`);
    setDisplay(type);
  }

  const {
    config,
  } = context;

  const {
    match, // todo: this is outdated for newer react-router versions
  } = props;

  const {
    params,
  } = match;

  const searchQuery = {
    p: 0,
    size: 10,
  };
  const searchDescriptor = {
    searchQuery,
  };

  ['recordType', 'vocabulary', 'csid', 'subresource'].forEach((param) => {
    const value = params[param];

    if (typeof value !== 'undefined') {
      searchDescriptor[param] = value;
    }
  });

  const searchDescriptorProp = Immutable.fromJS(searchDescriptor);

  console.log(`${JSON.stringify(searchDescriptor)}`);

  const recordType = searchDescriptorProp.get('recordType');
  const recordTypeConfig = get(config, ['recordTypes', recordType]);
  console.log(`config=${JSON.stringify(recordTypeConfig)}`);

  const toggles = [
    { key: 'table', label: 'table' },
    { key: 'grid', label: 'grid' },
    { key: 'list', label: 'list' },
  ];

  const tbwp = (
    <TBWP
      items={toggles}
      renderButton={(item) => (
        <ToggleButton
          diabled="true"
          key={item.key}
          name={item.key}
          label={item.label}
          style={newStyles[item.key]}
          onClick={() => setDisplay(item.key)}
        />
      )}
    />
  );

  // const listType = getListType(config, searchDescriptor);
  const toggleBar = renderToggleBar(handleSetDisplay);

  let searchDisplay;
  if (display === 'table') {
    searchDisplay = <SearchResultTable />;
  } else if (display === 'grid') {
    searchDisplay = <SearchResultGrid />;
  } else if (display === 'list') {
    searchDisplay = <SearchDetailList />;
  }

  // why does the SRTB have the searchDescriptor?? It's the TitleBar lol
  return (
    <div className={styles.common}>
      <SearchResultTitleBar
        config={config}
        searchDescriptor={searchDescriptorProp}
        searchName={SEARCH_RESULT_PAGE_SEARCH_NAME}
        updateDocumentTitle
      />
      <div className={pageBodyStyles.full}>
        {/* todo replace html with components */}
        {/* SearchResultHeader */}
        <div className={tableStyles.common}>
          <header>
            <SimpleSummary searchDescriptor={searchDescriptorProp} />
            <SimpleSelectBar toggleBar={tbwp} />
          </header>
          {searchDisplay}
          <SimpleFooter />
        </div>
      </div>
    </div>
  );
}

SearchResults.contextTypes = contextTypes;
