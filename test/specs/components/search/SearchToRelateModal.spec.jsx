/* global window, document */

import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import { render, unmountComponentAtNode } from 'react-dom';
import { Provider as StoreProvider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import configureMockStore from 'redux-mock-store';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import SearchToRelateModal, { BaseSearchToRelateModal, searchName } from '../../../../src/components/search/SearchToRelateModal';
import RelateButton from '../../../../src/components/record/RelateButton';
import SearchButton from '../../../../src/components/search/SearchButton';
import CancelButton from '../../../../src/components/record/CancelButton';
import SearchForm from '../../../../src/components/search/SearchForm';
import Pager from '../../../../src/components/search/Pager';
import SelectBar from '../../../../src/components/search/SelectBar';
import SearchResultSummary from '../../../../src/components/search/SearchResultSummary';
import SearchResultTableContainer from '../../../../src/containers/search/SearchResultTableContainer';
import createTestContainer from '../../../helpers/createTestContainer';

const expect = chai.expect;

chai.use(chaiImmutable);
chai.should();

const mockStore = configureMockStore();

const store = mockStore({
  optionList: Immutable.Map(),
  prefs: Immutable.Map(),
  search: Immutable.Map(),
});

const config = {
  listTypes: {
    common: {
      listNodeName: 'ns2:abstract-common-list',
      itemNodeName: 'list-item',
    },
  },
  recordTypes: {
    collectionobject: {
      name: 'collectionobject',
      messages: {
        record: {
          collectionName: {
            id: 'record.collectionobject.collectionName',
            defaultMessage: 'Objects',
          },
        },
      },
      serviceConfig: {
        servicePath: 'collectionobjects',
        serviceType: 'object',
      },
    },
  },
};

const perms = Immutable.fromJS({
  collectionobject: {
    data: 'CRUDL',
  },
});

const intl = {
  formatDate: () => null,
  formatTime: () => null,
  formatRelative: () => null,
  formatNumber: () => null,
  formatPlural: () => null,
  formatMessage: () => null,
  formatHTMLMessage: () => null,
  now: () => null,
};

describe('SearchToRelateModal', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a modal', function test() {
    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <SearchToRelateModal
            config={config}
            isOpen
            recordTypeValue="collectionobject"
            subjects={[subject]}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    document.querySelector('.ReactModal__Content--after-open').should.not.equal(null);

    unmountComponentAtNode(this.container);
  });

  it('should call onRecordTypeCommit with the default record type when opened', function test() {
    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    const defaultRecordTypeValue = 'default';

    let committedRecordType = null;

    const handleRecordTypeCommit = (recordTypeArg) => {
      committedRecordType = recordTypeArg;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <SearchToRelateModal
            config={config}
            defaultRecordTypeValue={defaultRecordTypeValue}
            recordTypeValue="collectionobject"
            subjects={[subject]}
            onRecordTypeCommit={handleRecordTypeCommit}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    expect(committedRecordType).to.equal(null);

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <SearchToRelateModal
            config={config}
            defaultRecordTypeValue={defaultRecordTypeValue}
            isOpen
            recordTypeValue="collectionobject"
            subjects={[subject]}
            onRecordTypeCommit={handleRecordTypeCommit}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    committedRecordType.should.equal(defaultRecordTypeValue);

    unmountComponentAtNode(this.container);
  });

  it('should call clearSearchResults and onRecordTypeCommit with empty value when closed', function test() {
    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    const defaultRecordTypeValue = 'default';

    let clearedSearchName = null;

    const clearSearchResults = (searchNameArg) => {
      clearedSearchName = searchNameArg;
    };

    let committedRecordType = null;

    const handleRecordTypeCommit = (recordTypeArg) => {
      committedRecordType = recordTypeArg;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <SearchToRelateModal
            config={config}
            defaultRecordTypeValue={defaultRecordTypeValue}
            isOpen
            recordTypeValue="collectionobject"
            subjects={[subject]}
            clearSearchResults={clearSearchResults}
            onRecordTypeCommit={handleRecordTypeCommit}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    expect(clearedSearchName).to.equal(null);
    expect(committedRecordType).to.equal(null);

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <SearchToRelateModal
            config={config}
            defaultRecordTypeValue={defaultRecordTypeValue}
            recordTypeValue="collectionobject"
            subjects={[subject]}
            clearSearchResults={clearSearchResults}
            onRecordTypeCommit={handleRecordTypeCommit}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    clearedSearchName.should.equal(searchName);
    committedRecordType.should.equal('');

    unmountComponentAtNode(this.container);
  });

  it('should render a search form', function test() {
    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <SearchToRelateModal
            config={config}
            isOpen
            recordTypeValue="collectionobject"
            subjects={[subject]}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    const modal = document.querySelector('.ReactModal__Content--after-open');

    modal.querySelector('.cspace-ui-SearchForm--common').should.not.equal(null);

    unmountComponentAtNode(this.container);
  });

  it('should render a record type dropdown without the "all" option when allowedServiceTypes is supplied', function test() {
    const recordTypeValue = 'collectionobject';

    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BaseSearchToRelateModal
        config={config}
        intl={intl}
        isOpen
        recordTypeValue={recordTypeValue}
        subjects={[subject]}
        allowedServiceTypes={['object', 'procedure']}
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const searchForm = findWithType(result, SearchForm);

    searchForm.props.recordTypeInputReadOnly.should.equal(false);
    searchForm.props.recordTypeInputRootType.should.equal('');
  });

  it('should call onCloseButtonClick when the cancel button is clicked', function test() {
    const recordTypeValue = 'collectionobject';

    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    let handlerCalled = false;

    const handleCloseButtonClick = () => {
      handlerCalled = true;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BaseSearchToRelateModal
        config={config}
        intl={intl}
        isOpen
        isSearchInitiated
        recordTypeValue={recordTypeValue}
        subjects={[subject]}
        onCloseButtonClick={handleCloseButtonClick}
      />
    );

    const result = shallowRenderer.getRenderOutput();

    result.props.onCloseButtonClick();

    handlerCalled.should.equal(true);
  });

  it('should call onCancelButtonClick when the cancel button is clicked', function test() {
    const recordTypeValue = 'collectionobject';

    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    let handlerCalled = false;

    const handleCancelButtonClick = () => {
      handlerCalled = true;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BaseSearchToRelateModal
        config={config}
        intl={intl}
        isOpen
        isSearchInitiated
        recordTypeValue={recordTypeValue}
        subjects={[subject]}
        onCancelButtonClick={handleCancelButtonClick}
      />
    );

    const result = shallowRenderer.getRenderOutput();

    const buttonBar = result.props.renderButtonBar();
    const cancelButton = findWithType(buttonBar, CancelButton);

    cancelButton.props.onClick();

    handlerCalled.should.equal(true);
  });

  it('should call search and render a search result table when the search button is clicked', function test() {
    const recordTypeValue = 'collectionobject';
    const keywordValue = 'foo';

    const advancedSearchCondition = Immutable.Map({
      op: 'eq',
      path: 'path',
      value: 'something',
    });

    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    let searchedConfig = null;
    let searchedSearchName = null;
    let searchedSearchDescriptor = null;

    const search = (configArg, searchNameArg, searchDescriptorArg) => {
      searchedConfig = configArg;
      searchedSearchName = searchNameArg;
      searchedSearchDescriptor = searchDescriptorArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BaseSearchToRelateModal
        config={config}
        intl={intl}
        isOpen
        isSearchInitiated
        recordTypeValue={recordTypeValue}
        keywordValue={keywordValue}
        advancedSearchCondition={advancedSearchCondition}
        subjects={[subject]}
        search={search}
      />
    );

    let result;

    result = shallowRenderer.getRenderOutput();

    const buttonBar = result.props.renderButtonBar();
    const searchButton = findWithType(buttonBar, SearchButton);

    searchButton.props.onClick();

    result = shallowRenderer.getRenderOutput();

    findWithType(result, SearchResultTableContainer).should.not.equal(null);

    searchedConfig.should.equal(config);
    searchedSearchName.should.equal(searchName);

    searchedSearchDescriptor.should.equal(Immutable.fromJS({
      recordType: recordTypeValue,
      vocabulary: undefined,
      searchQuery: {
        as: advancedSearchCondition,
        kw: keywordValue,
        mkRtSbj: subject.csid,
        p: 0,
        size: 20,
      },
    }));
  });

  it('should call search when the search form is submitted', function test() {
    const recordTypeValue = 'collectionobject';

    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    let searchedConfig = null;
    let searchedSearchName = null;
    let searchedSearchDescriptor = null;

    const search = (configArg, searchNameArg, searchDescriptorArg) => {
      searchedConfig = configArg;
      searchedSearchName = searchNameArg;
      searchedSearchDescriptor = searchDescriptorArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BaseSearchToRelateModal
        config={config}
        intl={intl}
        isOpen
        isSearchInitiated
        recordTypeValue={recordTypeValue}
        subjects={[subject]}
        search={search}
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const searchForm = findWithType(result, SearchForm);

    searchForm.props.onSearch();

    searchedConfig.should.equal(config);
    searchedSearchName.should.equal(searchName);

    searchedSearchDescriptor.should.equal(Immutable.fromJS({
      recordType: recordTypeValue,
      vocabulary: undefined,
      searchQuery: {
        mkRtSbj: subject.csid,
        p: 0,
        size: 20,
      },
    }));
  });

  it('should render a table header containing a summary with an edit button and select bar when there is a search result', function test() {
    const recordTypeValue = 'collectionobject';

    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    const search = () => {};

    let clearedSearchName = null;

    const clearSearchResults = (searchNameArg) => {
      clearedSearchName = searchNameArg;
    };

    const searchResult = Immutable.fromJS({
      'ns2:abstract-common-list': {
        itemsInPage: '1',
        totalItems: '1',
        pageNum: '0',
        pageSize: '3',
        'list-item': {
          csid: '1111',
        },
      },
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BaseSearchToRelateModal
        config={config}
        intl={intl}
        isOpen
        isSearchInitiated
        recordTypeValue={recordTypeValue}
        subjects={[subject]}
        search={search}
        clearSearchResults={clearSearchResults}
      />
    );

    let result;

    result = shallowRenderer.getRenderOutput();

    const buttonBar = result.props.renderButtonBar();
    const searchButton = findWithType(buttonBar, SearchButton);

    searchButton.props.onClick();

    result = shallowRenderer.getRenderOutput();

    const searchResultTable = findWithType(result, SearchResultTableContainer);
    const header = searchResultTable.props.renderHeader({ searchResult });

    findWithType(header, SelectBar).should.not.equal(null);

    const summary = findWithType(header, SearchResultSummary);

    summary.should.not.equal(null);

    const editLink = summary.props.renderEditLink();
    const editButton = findWithType(editLink, 'button');

    editButton.should.not.equal(null);

    editButton.props.onClick();

    clearedSearchName.should.equal(searchName);
  });

  it('should not render a table header when there is a search error', function test() {
    const recordTypeValue = 'collectionobject';

    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    const search = () => {};
    const searchError = {};

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BaseSearchToRelateModal
        config={config}
        intl={intl}
        isOpen
        isSearchInitiated
        recordTypeValue={recordTypeValue}
        subjects={[subject]}
        search={search}
      />
    );

    let result;

    result = shallowRenderer.getRenderOutput();

    const buttonBar = result.props.renderButtonBar();
    const searchButton = findWithType(buttonBar, SearchButton);

    searchButton.props.onClick();

    result = shallowRenderer.getRenderOutput();

    const searchResultTable = findWithType(result, SearchResultTableContainer);
    const header = searchResultTable.props.renderHeader({ searchError });

    expect(header).to.equal(null);
  });

  it('should render a table footer containing a pager when there is a search result', function test() {
    const recordTypeValue = 'collectionobject';

    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    const search = () => {};

    const searchResult = Immutable.fromJS({
      'ns2:abstract-common-list': {
        itemsInPage: '1',
        totalItems: '1',
        pageNum: '0',
        pageSize: '3',
        'list-item': {
          csid: '1111',
        },
      },
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BaseSearchToRelateModal
        config={config}
        intl={intl}
        isOpen
        isSearchInitiated
        recordTypeValue={recordTypeValue}
        subjects={[subject]}
        search={search}
      />
    );

    let result;

    result = shallowRenderer.getRenderOutput();

    const buttonBar = result.props.renderButtonBar();
    const searchButton = findWithType(buttonBar, SearchButton);

    searchButton.props.onClick();

    result = shallowRenderer.getRenderOutput();

    const searchResultTable = findWithType(result, SearchResultTableContainer);
    const footer = searchResultTable.props.renderFooter({ searchResult });

    findWithType(footer, Pager).should.not.equal(null);
  });

  it('should call setPreferredPageSize when the page size is changed in a pager', function test() {
    const recordTypeValue = 'collectionobject';

    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    const search = () => {};

    let setPageSize = null;

    const setPreferredPageSize = (pageSizeArg) => {
      setPageSize = pageSizeArg;
    };

    const searchResult = Immutable.fromJS({
      'ns2:abstract-common-list': {
        itemsInPage: '1',
        totalItems: '1',
        pageNum: '0',
        pageSize: '3',
        'list-item': {
          csid: '1111',
        },
      },
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BaseSearchToRelateModal
        config={config}
        intl={intl}
        isOpen
        isSearchInitiated
        recordTypeValue={recordTypeValue}
        subjects={[subject]}
        search={search}
        setPreferredPageSize={setPreferredPageSize}
      />
    );

    let result;

    result = shallowRenderer.getRenderOutput();

    const buttonBar = result.props.renderButtonBar();
    const searchButton = findWithType(buttonBar, SearchButton);

    searchButton.props.onClick();

    result = shallowRenderer.getRenderOutput();

    const searchResultTable = findWithType(result, SearchResultTableContainer);
    const footer = searchResultTable.props.renderFooter({ searchResult });
    const pager = findWithType(footer, Pager);

    pager.props.onPageSizeChange(10);

    setPageSize.should.equal(10);

    pager.props.onPageSizeChange(-1);

    setPageSize.should.equal(0);

    pager.props.onPageSizeChange(3000);

    setPageSize.should.equal(2500);
  });

  it('should update the page number on future searches when the page is changed in a pager', function test() {
    const recordTypeValue = 'collectionobject';

    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    let searchedSearchDescriptor = null;

    const search = (configArg, searchNameArg, searchDescriptorArg) => {
      searchedSearchDescriptor = searchDescriptorArg;
    };

    const searchResult = Immutable.fromJS({
      'ns2:abstract-common-list': {
        itemsInPage: '1',
        totalItems: '1',
        pageNum: '0',
        pageSize: '3',
        'list-item': {
          csid: '1111',
        },
      },
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BaseSearchToRelateModal
        config={config}
        intl={intl}
        isOpen
        isSearchInitiated
        recordTypeValue={recordTypeValue}
        subjects={[subject]}
        search={search}
      />
    );

    let result;

    result = shallowRenderer.getRenderOutput();

    const buttonBar = result.props.renderButtonBar();
    const searchButton = findWithType(buttonBar, SearchButton);

    searchButton.props.onClick();

    result = shallowRenderer.getRenderOutput();

    const searchResultTable = findWithType(result, SearchResultTableContainer);
    const footer = searchResultTable.props.renderFooter({ searchResult });
    const pager = findWithType(footer, Pager);

    const newPage = 7;

    pager.props.onPageChange(newPage);

    searchButton.props.onClick();

    searchedSearchDescriptor.getIn(['searchQuery', 'p']).should.equal(newPage);
  });

  it('should not render a table footer when there is no search result', function test() {
    const recordTypeValue = 'collectionobject';

    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    const search = () => {};

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BaseSearchToRelateModal
        config={config}
        intl={intl}
        isOpen
        isSearchInitiated
        recordTypeValue={recordTypeValue}
        subjects={[subject]}
        search={search}
      />
    );

    let result;

    result = shallowRenderer.getRenderOutput();

    const buttonBar = result.props.renderButtonBar();
    const searchButton = findWithType(buttonBar, SearchButton);

    searchButton.props.onClick();

    result = shallowRenderer.getRenderOutput();

    const searchResultTable = findWithType(result, SearchResultTableContainer);
    const footer = searchResultTable.props.renderFooter({});

    expect(footer).to.equal(null);
  });

  it('should render a checkbox for items that are not already related and not locked', function test() {
    const recordTypeValue = 'collectionobject';

    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    const search = () => {};

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BaseSearchToRelateModal
        config={config}
        intl={intl}
        isOpen
        isSearchInitiated
        perms={perms}
        recordTypeValue={recordTypeValue}
        subjects={[subject]}
        search={search}
      />
    );

    let result;

    result = shallowRenderer.getRenderOutput();

    const buttonBar = result.props.renderButtonBar();
    const searchButton = findWithType(buttonBar, SearchButton);

    searchButton.props.onClick();

    result = shallowRenderer.getRenderOutput();

    const searchResultTable = findWithType(result, SearchResultTableContainer);

    const unrelatedItem = Immutable.Map({ uri: '/collectionobjects/1111' });
    const relatedItem = Immutable.Map({ related: 'true', uri: '/collectionobjects/2222' });
    const lockedItem = Immutable.Map({ workflowState: 'locked', uri: '/collectionobjects/3333' });

    expect(searchResultTable.props.renderCheckbox({ rowData: relatedItem })).to.equal(null);
    expect(searchResultTable.props.renderCheckbox({ rowData: lockedItem })).to.equal(null);

    searchResultTable.props.renderCheckbox({ rowData: unrelatedItem }).should.not.equal(null);
  });

  it('should call onItemSelectChange when a checkbox value is committed', function test() {
    const recordTypeValue = 'collectionobject';

    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    const search = () => {};

    let changedIndex = null;
    let changedChecked = null;

    const onItemSelectChange = (
      configArg, searchNameArg, searchDescriptorArg, listTypeArg, indexArg, checkedArg
    ) => {
      changedIndex = indexArg;
      changedChecked = checkedArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BaseSearchToRelateModal
        config={config}
        intl={intl}
        isOpen
        isSearchInitiated
        perms={perms}
        recordTypeValue={recordTypeValue}
        subjects={[subject]}
        search={search}
        onItemSelectChange={onItemSelectChange}
      />
    );

    let result;

    result = shallowRenderer.getRenderOutput();

    const buttonBar = result.props.renderButtonBar();
    const searchButton = findWithType(buttonBar, SearchButton);

    searchButton.props.onClick();

    result = shallowRenderer.getRenderOutput();

    const searchResultTable = findWithType(result, SearchResultTableContainer);

    const item = Immutable.Map({ uri: '/collectionobjects/1111' });
    const checkbox = searchResultTable.props.renderCheckbox({ rowData: item });

    const newValue = true;

    checkbox.props.onCommit(['1'], newValue);

    changedIndex.should.equal(1);
    changedChecked.should.equal(newValue);
  });

  it('should not render a checkbox for the subject result item, if there is only one subject', function test() {
    const recordTypeValue = 'collectionobject';

    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    const search = () => {};

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BaseSearchToRelateModal
        config={config}
        intl={intl}
        isOpen
        isSearchInitiated
        recordTypeValue={recordTypeValue}
        subjects={[subject]}
        search={search}
      />
    );

    let result;

    result = shallowRenderer.getRenderOutput();

    const buttonBar = result.props.renderButtonBar();
    const searchButton = findWithType(buttonBar, SearchButton);

    searchButton.props.onClick();

    result = shallowRenderer.getRenderOutput();

    const searchResultTable = findWithType(result, SearchResultTableContainer);

    const subjectItem = Immutable.Map({ csid: subject.csid });

    expect(searchResultTable.props.renderCheckbox({ rowData: subjectItem })).to.equal(null);
  });

  it('should update the sort direction of future searches when the sort direction is changed in the result table', function test() {
    const recordTypeValue = 'collectionobject';

    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    let searchedSearchDescriptor = null;

    const search = (configArg, searchNameArg, searchDescriptorArg) => {
      searchedSearchDescriptor = searchDescriptorArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BaseSearchToRelateModal
        config={config}
        intl={intl}
        isOpen
        isSearchInitiated
        recordTypeValue={recordTypeValue}
        subjects={[subject]}
        search={search}
      />
    );

    let result;

    result = shallowRenderer.getRenderOutput();

    const buttonBar = result.props.renderButtonBar();
    const searchButton = findWithType(buttonBar, SearchButton);

    searchButton.props.onClick();

    result = shallowRenderer.getRenderOutput();

    const searchResultTable = findWithType(result, SearchResultTableContainer);
    const newSort = 'newSort';

    searchResultTable.props.onSortChange(newSort);

    searchButton.props.onClick();

    searchedSearchDescriptor.getIn(['searchQuery', 'sort']).should.equal(newSort);
  });

  it('should render a relating message and call createRelations followed by onRelationsCreated when the relate button is clicked', function test() {
    const recordTypeValue = 'collectionobject';

    const subject = {
      csid: '1234',
      recordType: 'group',
    };

    const selectedItems = Immutable.fromJS({
      1111: { csid: '1111', recordType: recordTypeValue },
      2222: { csid: '2222', recordType: recordTypeValue },
    });

    const search = () => {};

    let createdSubject = null;
    let createdObjects = null;
    let createdPredicate = null;

    const createRelations = (subjectArg, objectsArg, predicateArg) => {
      createdSubject = subjectArg;
      createdObjects = objectsArg;
      createdPredicate = predicateArg;

      return Promise.resolve();
    };

    let createdHandlerCalled = false;

    const handleRelationsCreated = () => {
      createdHandlerCalled = true;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BaseSearchToRelateModal
        config={config}
        intl={intl}
        isOpen
        isSearchInitiated
        recordTypeValue={recordTypeValue}
        subjects={[subject]}
        selectedItems={selectedItems}
        search={search}
        createRelations={createRelations}
        onRelationsCreated={handleRelationsCreated}
      />
    );

    let result;
    let buttonBar;

    result = shallowRenderer.getRenderOutput();
    buttonBar = result.props.renderButtonBar();

    const searchButton = findWithType(buttonBar, SearchButton);

    searchButton.props.onClick();

    result = shallowRenderer.getRenderOutput();
    buttonBar = result.props.renderButtonBar();

    const relateButton = findWithType(buttonBar, RelateButton);

    relateButton.props.onClick();

    result = shallowRenderer.getRenderOutput();

    findWithType(result, 'p').should.not.equal(null);

    createdSubject.should.deep.equal(subject);

    createdObjects.should.deep.equal([
      { csid: '1111', recordType: recordTypeValue },
      { csid: '2222', recordType: recordTypeValue },
    ]);

    createdPredicate.should.equal('affects');

    return new Promise((resolve) => {
      window.setTimeout(() => {
        createdHandlerCalled.should.equal(true);

        resolve();
      }, 0);
    });
  });

  it('should call subjects to retrieve subjects if it is a function', function test() {
    const recordTypeValue = 'collectionobject';

    const subject = {
      csid: '1234',
      recordType: 'group',
    };

    const selectedItems = Immutable.fromJS({
      1111: { csid: '1111', recordType: recordTypeValue },
      2222: { csid: '2222', recordType: recordTypeValue },
    });

    const search = () => {};
    const getSubjects = () => [subject];

    let createdSubject = null;

    const createRelations = (subjectArg) => {
      createdSubject = subjectArg;

      return Promise.resolve();
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BaseSearchToRelateModal
        config={config}
        intl={intl}
        isOpen
        isSearchInitiated
        recordTypeValue={recordTypeValue}
        subjects={getSubjects}
        selectedItems={selectedItems}
        search={search}
        createRelations={createRelations}
      />
    );

    let result;
    let buttonBar;

    result = shallowRenderer.getRenderOutput();
    buttonBar = result.props.renderButtonBar();

    const searchButton = findWithType(buttonBar, SearchButton);

    searchButton.props.onClick();

    result = shallowRenderer.getRenderOutput();
    buttonBar = result.props.renderButtonBar();

    const relateButton = findWithType(buttonBar, RelateButton);

    relateButton.props.onClick();

    createdSubject.should.deep.equal(subject);
  });
});
