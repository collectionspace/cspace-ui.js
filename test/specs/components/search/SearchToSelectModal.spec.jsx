/* global window, document */

import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import { render, unmountComponentAtNode } from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import { Provider as StoreProvider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import configureMockStore from 'redux-mock-store';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import SearchToSelectModal, { BaseSearchToSelectModal, searchName } from '../../../../src/components/search/SearchToSelectModal';
import AcceptSelectionButton from '../../../../src/components/search/AcceptSelectionButton';
import SearchButton from '../../../../src/components/search/SearchButton';
import CancelButton from '../../../../src/components/navigation/CancelButton';
import SearchForm from '../../../../src/components/search/SearchForm';
import Pager from '../../../../src/components/search/Pager';
import SelectBar from '../../../../src/components/search/SelectBar';
import SearchResultSummary from '../../../../src/components/search/SearchResultSummary';
import SearchResultTableContainer from '../../../../src/containers/search/SearchResultTableContainer';
import createTestContainer from '../../../helpers/createTestContainer';

const { expect } = chai;

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
    person: {
      name: 'person',
      messages: {
        record: {
          collectionName: {
            id: 'record.person.collectionName',
            defaultMessage: 'Persons',
          },
        },
      },
      serviceConfig: {
        servicePath: 'personauthorities',
        serviceType: 'authority',
      },
    },
  },
};

const perms = Immutable.fromJS({
  collectionobject: {
    data: 'CRUDL',
  },
  relation: {
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

describe('SearchToSelectModal', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a modal', async function test() {
    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    await act(async () => {
      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <SearchToSelectModal
              config={config}
              isOpen
              recordTypeValue="collectionobject"
              subjects={[subject]}
            />
          </StoreProvider>
        </IntlProvider>, this.container,
      );
    });

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
          <SearchToSelectModal
            config={config}
            defaultRecordTypeValue={defaultRecordTypeValue}
            subjects={[subject]}
            onRecordTypeCommit={handleRecordTypeCommit}
          />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    expect(committedRecordType).to.equal(null);

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <SearchToSelectModal
            config={config}
            defaultRecordTypeValue={defaultRecordTypeValue}
            isOpen
            subjects={[subject]}
            onRecordTypeCommit={handleRecordTypeCommit}
          />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    committedRecordType.should.equal(defaultRecordTypeValue);

    unmountComponentAtNode(this.container);
  });

  it('should call onVocabularyCommit with the default vocabulary when opened with an authority record type', function test() {
    const subject = {
      csid: '1234',
      recordType: 'person',
    };

    const defaultVocabularyValue = 'all';

    const handleRecordTypeCommit = () => {};

    let committedVocabulary = null;

    const handleVocabularyCommit = (vocabularyArg) => {
      committedVocabulary = vocabularyArg;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <SearchToSelectModal
            config={config}
            defaultRecordTypeValue="person"
            defaultVocabularyValue={defaultVocabularyValue}
            subjects={[subject]}
            onRecordTypeCommit={handleRecordTypeCommit}
            onVocabularyCommit={handleVocabularyCommit}
          />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    expect(committedVocabulary).to.equal(null);

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <SearchToSelectModal
            config={config}
            defaultRecordTypeValue="person"
            defaultVocabularyValue={defaultVocabularyValue}
            isOpen
            subjects={[subject]}
            onRecordTypeCommit={handleRecordTypeCommit}
            onVocabularyCommit={handleVocabularyCommit}
          />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    committedVocabulary.should.equal(defaultVocabularyValue);

    unmountComponentAtNode(this.container);
  });

  it('should call onVocabularyCommit with the default vocabulary when the record type is changed to an authority', function test() {
    const subject = {
      csid: '1234',
      recordType: 'person',
    };

    const defaultVocabularyValue = 'all';

    const handleRecordTypeCommit = () => {};

    let committedVocabulary = null;

    const handleVocabularyCommit = (vocabularyArg) => {
      committedVocabulary = vocabularyArg;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <SearchToSelectModal
            config={config}
            defaultVocabularyValue={defaultVocabularyValue}
            isOpen
            recordTypeValue="collectionobject"
            subjects={[subject]}
            onRecordTypeCommit={handleRecordTypeCommit}
            onVocabularyCommit={handleVocabularyCommit}
          />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    expect(committedVocabulary).to.equal(null);

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <SearchToSelectModal
            config={config}
            defaultVocabularyValue={defaultVocabularyValue}
            isOpen
            recordTypeValue="person"
            subjects={[subject]}
            onRecordTypeCommit={handleRecordTypeCommit}
            onVocabularyCommit={handleVocabularyCommit}
          />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    committedVocabulary.should.equal(defaultVocabularyValue);

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
          <SearchToSelectModal
            config={config}
            defaultRecordTypeValue={defaultRecordTypeValue}
            isOpen
            recordTypeValue="collectionobject"
            subjects={[subject]}
            clearSearchResults={clearSearchResults}
            onRecordTypeCommit={handleRecordTypeCommit}
          />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    expect(clearedSearchName).to.equal(null);
    expect(committedRecordType).to.equal(null);

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <SearchToSelectModal
            config={config}
            defaultRecordTypeValue={defaultRecordTypeValue}
            recordTypeValue="collectionobject"
            subjects={[subject]}
            clearSearchResults={clearSearchResults}
            onRecordTypeCommit={handleRecordTypeCommit}
          />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    clearedSearchName.should.equal(searchName);
    committedRecordType.should.equal('');

    unmountComponentAtNode(this.container);
  });

  it('should render a search form', async function test() {
    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    await act(async () => {
      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <SearchToSelectModal
              config={config}
              isOpen
              recordTypeValue="collectionobject"
              subjects={[subject]}
            />
          </StoreProvider>
        </IntlProvider>, this.container,
      );
    });

    const modal = document.querySelector('.ReactModal__Content--after-open');

    modal.querySelector('.cspace-ui-SearchForm--common').should.not.equal(null);

    unmountComponentAtNode(this.container);
  });

  it('should render a record type dropdown without the "all" option when allowedServiceTypes is supplied', () => {
    const recordTypeValue = 'collectionobject';

    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BaseSearchToSelectModal
        config={config}
        intl={intl}
        isOpen
        recordTypeValue={recordTypeValue}
        subjects={[subject]}
        allowedServiceTypes={['object', 'procedure']}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const searchForm = findWithType(result, SearchForm);

    searchForm.props.recordTypeInputReadOnly.should.equal(false);
    searchForm.props.recordTypeInputRootType.should.equal('');
  });

  it('should render a read only record type dropdown when allowedRecordTypes is supplied containing a single record type', () => {
    const recordTypeValue = 'collectionobject';

    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BaseSearchToSelectModal
        config={config}
        intl={intl}
        isOpen
        recordTypeValue={recordTypeValue}
        subjects={[subject]}
        allowedRecordTypes={['collectionobject']}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const searchForm = findWithType(result, SearchForm);

    searchForm.props.recordTypeInputReadOnly.should.equal(true);
  });

  it('should call onCloseButtonClick when the cancel button is clicked', () => {
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
      <BaseSearchToSelectModal
        config={config}
        intl={intl}
        isOpen
        isSearchInitiated
        recordTypeValue={recordTypeValue}
        subjects={[subject]}
        onCloseButtonClick={handleCloseButtonClick}
      />,
    );

    const result = shallowRenderer.getRenderOutput();

    result.props.onCloseButtonClick();

    handlerCalled.should.equal(true);
  });

  it('should call onCancelButtonClick when the cancel button is clicked', () => {
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
      <BaseSearchToSelectModal
        config={config}
        intl={intl}
        isOpen
        isSearchInitiated
        recordTypeValue={recordTypeValue}
        subjects={[subject]}
        onCancelButtonClick={handleCancelButtonClick}
      />,
    );

    const result = shallowRenderer.getRenderOutput();

    const buttonBar = result.props.renderButtonBar();
    const cancelButton = findWithType(buttonBar, CancelButton);

    cancelButton.props.onClick();

    handlerCalled.should.equal(true);
  });

  it('should call search and render a search result table when the search button is clicked', () => {
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
      <BaseSearchToSelectModal
        config={config}
        intl={intl}
        isOpen
        recordTypeValue={recordTypeValue}
        keywordValue={keywordValue}
        advancedSearchCondition={advancedSearchCondition}
        subjects={[subject]}
        search={search}
      />,
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
        p: 0,
        size: 20,
      },
    }));
  });

  it('should call customizeSearchDescriptor to modify the search descriptor', () => {
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

    let searchedSearchDescriptor = null;

    const search = (configArg, searchNameArg, searchDescriptorArg) => {
      searchedSearchDescriptor = searchDescriptorArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BaseSearchToSelectModal
        config={config}
        intl={intl}
        isOpen
        recordTypeValue={recordTypeValue}
        keywordValue={keywordValue}
        advancedSearchCondition={advancedSearchCondition}
        subjects={[subject]}
        search={search}
        customizeSearchDescriptor={(searchDescriptor) => searchDescriptor.set('foo', 'bar')}
      />,
    );

    let result;

    result = shallowRenderer.getRenderOutput();

    const buttonBar = result.props.renderButtonBar();
    const searchButton = findWithType(buttonBar, SearchButton);

    searchButton.props.onClick();

    result = shallowRenderer.getRenderOutput();

    findWithType(result, SearchResultTableContainer).should.not.equal(null);

    searchedSearchDescriptor.should.equal(Immutable.fromJS({
      recordType: recordTypeValue,
      vocabulary: undefined,
      searchQuery: {
        as: advancedSearchCondition,
        kw: keywordValue,
        p: 0,
        size: 20,
      },
      foo: 'bar',
    }));
  });

  it('should call search when the search form is submitted', () => {
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
      <BaseSearchToSelectModal
        config={config}
        intl={intl}
        isOpen
        isSearchInitiated
        recordTypeValue={recordTypeValue}
        subjects={[subject]}
        search={search}
      />,
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
        p: 0,
        size: 20,
      },
    }));
  });

  it('should render a table header containing a summary with an edit button and select bar when there is a search result', () => {
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
      <BaseSearchToSelectModal
        config={config}
        intl={intl}
        isOpen
        recordTypeValue={recordTypeValue}
        subjects={[subject]}
        search={search}
        clearSearchResults={clearSearchResults}
      />,
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

  it('should not render a table header when there is a search error', () => {
    const recordTypeValue = 'collectionobject';

    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    const search = () => {};
    const searchError = {};

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BaseSearchToSelectModal
        config={config}
        intl={intl}
        isOpen
        recordTypeValue={recordTypeValue}
        subjects={[subject]}
        search={search}
      />,
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

  it('should render a table footer containing a pager when there is a search result', () => {
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
      <BaseSearchToSelectModal
        config={config}
        intl={intl}
        isOpen
        recordTypeValue={recordTypeValue}
        subjects={[subject]}
        search={search}
      />,
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

  it('should call setPreferredPageSize when the page size is changed in a pager', () => {
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
      <BaseSearchToSelectModal
        config={config}
        intl={intl}
        isOpen
        recordTypeValue={recordTypeValue}
        subjects={[subject]}
        search={search}
        setPreferredPageSize={setPreferredPageSize}
      />,
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

  it.skip('should update the page number on future searches when the page is changed in a pager', async () => {
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

    // todo: the shallow renderer does not call componentDidUpdate which is necessary for this test to pass
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BaseSearchToSelectModal
        config={config}
        intl={intl}
        isOpen
        recordTypeValue={recordTypeValue}
        subjects={[subject]}
        search={search}
      />,
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

  it('should not render a table footer when there is no search result', () => {
    const recordTypeValue = 'collectionobject';

    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    const search = () => {};

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BaseSearchToSelectModal
        config={config}
        intl={intl}
        isOpen
        recordTypeValue={recordTypeValue}
        subjects={[subject]}
        search={search}
      />,
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

  it('should not render a checkbox if shouldShowCheckbox returns false', () => {
    const recordTypeValue = 'collectionobject';

    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    const search = () => {};

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BaseSearchToSelectModal
        config={config}
        intl={intl}
        isOpen
        perms={perms}
        recordTypeValue={recordTypeValue}
        subjects={[subject]}
        search={search}
        shouldShowCheckbox={() => false}
      />,
    );

    let result;

    result = shallowRenderer.getRenderOutput();

    const buttonBar = result.props.renderButtonBar();
    const searchButton = findWithType(buttonBar, SearchButton);

    searchButton.props.onClick();

    result = shallowRenderer.getRenderOutput();

    const searchResultTable = findWithType(result, SearchResultTableContainer);
    const item = Immutable.Map({ uri: '/collectionobjects/1111' });

    expect(searchResultTable.props.renderCheckbox(item)).to.equal(null);
  });

  it('should call onItemSelectChange when a checkbox value is committed', () => {
    const recordTypeValue = 'collectionobject';

    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    const search = () => {};

    let changedIndex = null;
    let changedChecked = null;

    const onItemSelectChange = (
      configArg, searchNameArg, searchDescriptorArg, listTypeArg, indexArg, checkedArg,
    ) => {
      changedIndex = indexArg;
      changedChecked = checkedArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BaseSearchToSelectModal
        config={config}
        intl={intl}
        isOpen
        perms={perms}
        recordTypeValue={recordTypeValue}
        subjects={[subject]}
        search={search}
        onItemSelectChange={onItemSelectChange}
      />,
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

  it('should call onItemSelectChange when a checkbox value is committed', () => {
    const recordTypeValue = 'collectionobject';

    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    const search = () => {};

    let changedIndex = null;
    let changedChecked = null;

    const onItemSelectChange = (
      configArg, searchNameArg, searchDescriptorArg, listTypeArg, indexArg, checkedArg,
    ) => {
      changedIndex = indexArg;
      changedChecked = checkedArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BaseSearchToSelectModal
        config={config}
        intl={intl}
        isOpen
        perms={perms}
        recordTypeValue={recordTypeValue}
        subjects={[subject]}
        search={search}
        onItemSelectChange={onItemSelectChange}
      />,
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

  it('should call setAllItemsSelected to deselect all items, and onItemSelectChange, when a checkbox is checked and singleSelect is true', () => {
    const recordTypeValue = 'collectionobject';

    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    const search = () => {};

    let allItemsChecked = null;

    const setAllItemsSelected = (
      configArg, searchNameArg, searchDescriptorArg, listTypeArg, selectedArg,
    ) => {
      allItemsChecked = selectedArg;
    };

    let changedIndex = null;
    let changedChecked = null;

    const onItemSelectChange = (
      configArg, searchNameArg, searchDescriptorArg, listTypeArg, indexArg, checkedArg,
    ) => {
      changedIndex = indexArg;
      changedChecked = checkedArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BaseSearchToSelectModal
        config={config}
        intl={intl}
        isOpen
        perms={perms}
        recordTypeValue={recordTypeValue}
        singleSelect
        subjects={[subject]}
        search={search}
        setAllItemsSelected={setAllItemsSelected}
        onItemSelectChange={onItemSelectChange}
      />,
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

    allItemsChecked.should.equal(false);
    changedIndex.should.equal(1);
    changedChecked.should.equal(newValue);
  });

  it('should call onItemSelectChange when a search result item is clicked and the item has a checkbox', () => {
    const recordTypeValue = 'collectionobject';

    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    const search = () => {};

    let changedIndex = null;
    let changedChecked = null;

    const onItemSelectChange = (
      configArg, searchNameArg, searchDescriptorArg, listTypeArg, indexArg, checkedArg,
    ) => {
      changedIndex = indexArg;
      changedChecked = checkedArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BaseSearchToSelectModal
        config={config}
        intl={intl}
        isOpen
        perms={perms}
        recordTypeValue={recordTypeValue}
        subjects={[subject]}
        search={search}
        onItemSelectChange={onItemSelectChange}
        shouldShowCheckbox={(item) => item.get('uri').includes('/1111')}
      />,
    );

    let result;

    result = shallowRenderer.getRenderOutput();

    const buttonBar = result.props.renderButtonBar();
    const searchButton = findWithType(buttonBar, SearchButton);

    searchButton.props.onClick();

    result = shallowRenderer.getRenderOutput();

    const searchResultTable = findWithType(result, SearchResultTableContainer);
    const noCheckboxItem = Immutable.Map({ uri: '/collectionobjects/2222' });
    const item = Immutable.Map({ uri: '/collectionobjects/1111' });

    searchResultTable.props.onItemClick(noCheckboxItem, 0);

    expect(changedIndex).to.equal(null);
    expect(changedChecked).to.equal(null);

    searchResultTable.props.onItemClick(item, 1);

    changedIndex.should.equal(1);
    changedChecked.should.equal(true);
  });

  it('should stop event propagation when a result item is clicked', function test() {
    const recordTypeValue = 'collectionobject';

    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    const search = () => {};

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BaseSearchToSelectModal
        config={config}
        intl={intl}
        isOpen
        perms={perms}
        recordTypeValue={recordTypeValue}
        subjects={[subject]}
        search={search}
      />,
    );

    let result;

    result = shallowRenderer.getRenderOutput();

    const buttonBar = result.props.renderButtonBar();
    const searchButton = findWithType(buttonBar, SearchButton);

    searchButton.props.onClick();

    result = shallowRenderer.getRenderOutput();

    const searchResultTable = findWithType(result, SearchResultTableContainer);

    const checkbox = searchResultTable.props.renderCheckbox({
      rowData: Immutable.Map({ csid: '1111', uri: '/groups/1111' }),
      rowIndex: 0,
    });

    let clickPropagated = false;

    const handleClick = () => {
      clickPropagated = true;
    };

    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    render(<div onClick={handleClick} role="presentation">{checkbox}</div>, this.container);

    const checkboxNode = this.container.querySelector('input');

    Simulate.click(checkboxNode);

    clickPropagated.should.equal(false);
  });

  it.skip('should update the sort direction of future searches when the sort direction is changed in the result table', () => {
    const recordTypeValue = 'collectionobject';

    const subject = {
      csid: '1234',
      recordType: 'collectionobject',
    };

    let searchedSearchDescriptor = null;

    const search = (configArg, searchNameArg, searchDescriptorArg) => {
      searchedSearchDescriptor = searchDescriptorArg;
    };

    // todo: the shallow renderer does not call componentDidUpdate which is necessary for this test to pass
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BaseSearchToSelectModal
        config={config}
        intl={intl}
        isOpen
        recordTypeValue={recordTypeValue}
        subjects={[subject]}
        search={search}
      />,
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

  it('should render a pending message and call onAccept when the accept button is clicked', () => {
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

    let acceptedSelectedItems;
    let acceptedSearchDescriptor;

    const handleAccept = (selectedItemsArg, searchDescriptorArg) => {
      acceptedSelectedItems = selectedItemsArg;
      acceptedSearchDescriptor = searchDescriptorArg;

      return Promise.resolve();
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BaseSearchToSelectModal
        config={config}
        intl={intl}
        isOpen
        recordTypeValue={recordTypeValue}
        subjects={[subject]}
        selectedItems={selectedItems}
        search={search}
        onAccept={handleAccept}
      />,
    );

    let result;
    let buttonBar;

    result = shallowRenderer.getRenderOutput();
    buttonBar = result.props.renderButtonBar();

    const searchButton = findWithType(buttonBar, SearchButton);

    searchButton.props.onClick();

    result = shallowRenderer.getRenderOutput();
    buttonBar = result.props.renderButtonBar();

    const acceptButton = findWithType(buttonBar, AcceptSelectionButton);

    acceptButton.props.onClick();

    result = shallowRenderer.getRenderOutput();

    findWithType(result, 'p').should.not.equal(null);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        acceptedSelectedItems.should.equal(selectedItems);

        acceptedSearchDescriptor.should.equal(Immutable.fromJS({
          recordType: recordTypeValue,
          vocabulary: undefined,
          searchQuery: {
            p: 0,
            size: 20,
          },
        }));

        resolve();
      }, 0);
    });
  });
});
