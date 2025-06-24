import React from 'react';
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
import deactivate from '../../../../images/deactivate.svg';

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

export function SimpleSelectBar() {
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
    <div className={buttonBarStyles.common} style={{ 'flex-basis': 'calc(1/3 * 100%)' }}>
      {exportButton}
      {relateButton}
    </div>
  );

  // toggle bar (grid/table/etc)
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

export function SimpleTable() {
  return (
    <div className={newStyles.results}>
      <table>
        <thead>
          <tr>
            <th className={newStyles.checkbox} />
            <th style={{ textAlign: 'left' }}>Identification number</th>
            <th style={{ textAlign: 'left' }}>Title</th>
            <th style={{ textAlign: 'left' }}>Updated at</th>
          </tr>
        </thead>
        <tbody>
          <tr key="obj-1" className={newStyles.even}>
            {/* CheckboxInput */}
            <td><input type="checkbox" /></td>
            <td>2025.1.12</td>
            <td>Published Item New Line Test</td>
            <td>6/6/2025, 12:41 PM</td>
          </tr>
          <tr key="obj-2" className={newStyles.odd}>
            <td><input type="checkbox" /></td>
            <td>2025.1.11</td>
            <td />
            <td>5/13/2025, 10:11 AM</td>
          </tr>
          <tr key="obj-3" className={newStyles.even}>
            <td><input type="checkbox" /></td>
            <td>IN2025.5</td>
            <td>intake</td>
            <td>5/5/2025, 10:40 AM</td>
          </tr>
          <tr key="obj-4" className={newStyles.odd}>
            <td><input type="checkbox" /></td>
            <td>2025.1.7</td>
            <td />
            <td>4/28/2025, 7:23 AM</td>
          </tr>
          <tr key="obj-5" className={newStyles.even}>
            <td><input type="checkbox" /></td>
            <td>2025.1.8</td>
            <td />
            <td>4/25/2025, 7:07 AM</td>
          </tr>
          <tr key="obj-6" className={newStyles.odd}>
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

export function SimpleCard() {
  return (
    <div>
      <img src={deactivate} className={newStyles.resultcard} />
      <div>
        <div className={newStyles.cardsummary}>
          <input type="checkbox" />
          <span>2025.1.2: Object Test</span>
        </div>
        <span>6/6/2025, 12:41 PM</span>
      </div>
    </div>
  );
}

export function SimpleGrid() {
  return (
    <div className={newStyles.resultgrid}>
      <SimpleCard />
      <SimpleCard />
      <SimpleCard />
      <SimpleCard />
      <SimpleCard />
      <SimpleCard />
    </div>
  );
}

export function DetailItem() {
  return (
    <div className={newStyles.innerdetail}>
      <img src={deactivate} className={newStyles.detailimg} />
      <input style={{ alignSelf: 'flex-start' }} type="checkbox" />
      <ol>
        <li>ID: 2025.1.2</li>
        <li>Title: Published Item Title Test</li>
        <li>Responsible Department: Departmentalized</li>
        <li>Current Location: Storage Site A</li>
        <li>Brief Description: Some information about this item...</li>
      </ol>
    </div>
  );
}

export function DetailList() {
  return (
    <div className={newStyles.detail}>
      <DetailItem />
    </div>
  );
}

export default function SearchResults(props, context) {
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

  // const listType = getListType(config, searchDescriptor);

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
            <SimpleSelectBar />
          </header>
          <DetailList />
          <SimpleFooter />
        </div>
      </div>
    </div>
  );
}

SearchResults.contextTypes = contextTypes;
