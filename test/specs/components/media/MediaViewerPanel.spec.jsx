import React from 'react';
import { render } from 'react-dom';
import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import { Provider as StoreProvider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import { searchKey } from '../../../../src/reducers/search';
import MediaViewerPanel from '../../../../src/components/media/MediaViewerPanel';

chai.should();

const mockStore = configureMockStore();

const config = {
  listTypes: {
    common: {
      listNodeName: 'ns2:abstract-common-list',
      itemNodeName: 'list-item',
    },
  },
};

const searchName = 'testSearch';

const searchDescriptor = Immutable.fromJS({
  recordType: 'media',
  searchQuery: {
    p: 0,
    size: 0,
    rel: '1234',
  },
});

const searchResult = Immutable.fromJS({
  'ns2:abstract-common-list': {
    pageNum: '0',
    pageSize: '2500',
    itemsInPage: '3',
    totalItems: '3',
    'list-item': [
      {
        blobCsid: '03794600-d98f-44a6-8985',
        csid: 'b0945c52-36f7-4c51-a72a',
      },
      {
        blobCsid: '42e46bf9-f09d-49ec-8334',
        csid: '3a60107e-4802-41a2-b319',
      },
      {
        blobCsid: '8fdd5910-c579-4ed4-b52b',
        csid: '5a57909a-2f51-4e42-bb58',
      },
    ],
  },
});

const store = mockStore({
  prefs: Immutable.Map(),
  search: Immutable.fromJS({
    [searchName]: {
      byKey: {
        [searchKey(searchDescriptor)]: {
          result: searchResult,
        },
      },
    },
  }),
});

describe('MediaViewerPanel', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a section', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <MediaViewerPanel
            config={config}
            searchDescriptor={searchDescriptor}
            searchResult={searchResult}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('SECTION');
  });

  it('should include the number of related media records in the header', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <MediaViewerPanel
            config={config}
            searchDescriptor={searchDescriptor}
            searchResult={searchResult}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.querySelector('header').textContent.should.match(/: 3/);
  });

  it('should add one to the count if ownBlobCsid is provided', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <MediaViewerPanel
            config={config}
            ownBlobCsid="1234"
            searchDescriptor={searchDescriptor}
            searchResult={searchResult}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.querySelector('header').textContent.should.match(/: 4/);
  });

  it('should call search when mounted', function test() {
    let searchedConfig = null;
    let searchedSearchName = null;
    let searchedSearchDescriptor = null;
    let searchedListType = null;
    let searchedColumnSetName = null;

    const search = (
      configArg, searchNameArg, searchDescriptorArg, listTypeArg, columnSetNameArg
    ) => {
      searchedConfig = configArg;
      searchedSearchName = searchNameArg;
      searchedSearchDescriptor = searchDescriptorArg;
      searchedListType = listTypeArg;
      searchedColumnSetName = columnSetNameArg;
    };

    render(
      <StoreProvider store={store}>
        <MediaViewerPanel
          config={config}
          name={searchName}
          searchDescriptor={searchDescriptor}
          search={search}
        />
      </StoreProvider>, this.container);

    searchedConfig.should.equal(config);
    searchedSearchName.should.equal(searchName);
    searchedSearchDescriptor.should.equal(searchDescriptor);
    searchedListType.should.equal('common');
    searchedColumnSetName.should.equal('default');
  });

  it('should call search when a new search descriptor is supplied', function test() {
    let searchedConfig = null;
    let searchedSearchName = null;
    let searchedSearchDescriptor = null;
    let searchedListType = null;
    let searchedColumnSetName = null;

    const search = (
      configArg, searchNameArg, searchDescriptorArg, listTypeArg, columnSetNameArg
    ) => {
      searchedConfig = configArg;
      searchedSearchName = searchNameArg;
      searchedSearchDescriptor = searchDescriptorArg;
      searchedListType = listTypeArg;
      searchedColumnSetName = columnSetNameArg;
    };

    render(
      <StoreProvider store={store}>
        <MediaViewerPanel
          config={config}
          name={searchName}
          searchDescriptor={searchDescriptor}
        />
      </StoreProvider>, this.container);

    const newSearchDescriptor = Immutable.fromJS({
      recordType: 'media',
      searchQuery: {
        p: 0,
        size: 0,
        rel: '5678',
      },
    });

    render(
      <StoreProvider store={store}>
        <MediaViewerPanel
          config={config}
          name={searchName}
          searchDescriptor={newSearchDescriptor}
          search={search}
        />
      </StoreProvider>, this.container);

    searchedConfig.should.equal(config);
    searchedSearchName.should.equal(searchName);
    searchedSearchDescriptor.should.equal(newSearchDescriptor);
    searchedListType.should.equal('common');
    searchedColumnSetName.should.equal('default');
  });
});
