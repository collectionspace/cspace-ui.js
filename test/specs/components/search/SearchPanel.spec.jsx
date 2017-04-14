import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import { Simulate } from 'react-addons-test-utils';
import { Provider as StoreProvider } from 'react-redux';
import mockRouter from '../../../helpers/mockRouter';
import RouterProvider from '../../../helpers/RouterProvider';
import createTestContainer from '../../../helpers/createTestContainer';
import { searchKey } from '../../../../src/reducers/search';
import ConfigProvider from '../../../../src/components/config/ConfigProvider';
import SearchPanel from '../../../../src/components/search/SearchPanel';

chai.should();

const mockStore = configureMockStore();

const config = {
  listTypes: {
    common: {
      listNodeName: 'ns2:abstract-common-list',
      itemNodeName: 'list-item',
    },
  },
  recordTypes: {
    object: {
      name: 'object',
      serviceConfig: {
        objectName: 'CollectionObject',
      },
      columns: {
        default: [
          {
            name: 'objectNumber',
            messages: {
              label: {
                id: 'column.object.search.objectNumber',
                defaultMessage: 'Identification number',
              },
            },
            width: 200,
          },
          {
            name: 'title',
            messages: {
              label: {
                id: 'column.object.search.title',
                defaultMessage: 'Title',
              },
            },
            sortBy: 'collectionobjects_common:titleGroupList/0/title',
            width: 400,
          },
          {
            name: 'updatedAt',
            messages: {
              label: {
                id: 'column.object.search.updatedAt',
                defaultMessage: 'Last modified',
              },
            },
            width: 200,
          },
        ],
      },
    },
  },
};

const searchName = 'testSearch';

const searchDescriptor = {
  recordType: 'object',
  searchQuery: {
    p: 0,
    size: 5,
  },
};

const store = mockStore({
  optionList: {},
  prefs: Immutable.Map(),
  search: Immutable.fromJS({
    [searchName]: {
      byKey: {
        [searchKey(searchDescriptor)]: {
          result: {
            'ns2:abstract-common-list': {
              pageNum: '0',
              pageSize: '5',
              itemsInPage: '5',
              totalItems: '20',
              'list-item': [
                {
                  csid: 'ea399d7a-7ea3-4670-930b',
                  updatedAt: '2017-01-06T02:28:53.269Z',
                  objectNumber: '4',
                  title: 'Title',
                },
                {
                  csid: '0abd85b5-46be-4a6c-aa14',
                  updatedAt: '2017-01-04T05:29:41.963Z',
                  objectNumber: '3',
                },
                {
                  csid: '325b3337-9db5-45ae-a0a9',
                  updatedAt: '2017-01-04T05:27:50.225Z',
                  objectNumber: '32',
                },
                {
                  csid: '12a6be7f-4ea8-49c1-b41c',
                  updatedAt: '2017-01-04T05:22:21.581Z',
                  objectNumber: '6.0221415',
                },
                {
                  csid: '080b1ce2-598b-4340-b23a',
                  updatedAt: '2017-01-04T05:22:21.288Z',
                  objectNumber: '6.0221415',
                },
              ],
            },
          },
        },
      },
    },
  }),
});

describe('SearchPanel', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a section', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <SearchPanel
              config={config}
              searchDescriptor={searchDescriptor}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('SECTION');
  });

  it('should call search and onSearchDescriptorChange when mounted', function test() {
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

    let changedToSearchDescriptor = null;

    const handleSearchDescriptorChange = (searchDescriptorArg) => {
      changedToSearchDescriptor = searchDescriptorArg;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <SearchPanel
              config={config}
              name={searchName}
              searchDescriptor={searchDescriptor}
              search={search}
              onSearchDescriptorChange={handleSearchDescriptorChange}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    searchedConfig.should.equal(config);
    searchedSearchName.should.equal(searchName);
    searchedSearchDescriptor.should.equal(searchDescriptor);
    searchedListType.should.equal('common');
    searchedColumnSetName.should.equal('default');

    changedToSearchDescriptor.should.equal(searchDescriptor);
  });

  it('should call search and onSearchDescriptorChange when a new search descriptor is supplied', function test() {
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

    let changedToSearchDescriptor = null;

    const handleSearchDescriptorChange = (searchDescriptorArg) => {
      changedToSearchDescriptor = searchDescriptorArg;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <SearchPanel
              config={config}
              name={searchName}
              searchDescriptor={searchDescriptor}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    const newSearchDescriptor = {
      recordType: 'group',
      searchQuery: {
        p: 2,
        size: 10,
      },
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <SearchPanel
              config={config}
              name={searchName}
              searchDescriptor={newSearchDescriptor}
              search={search}
              onSearchDescriptorChange={handleSearchDescriptorChange}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    searchedConfig.should.equal(config);
    searchedSearchName.should.equal(searchName);
    searchedSearchDescriptor.should.equal(newSearchDescriptor);
    searchedListType.should.equal('common');
    searchedColumnSetName.should.equal('default');

    changedToSearchDescriptor.should.equal(newSearchDescriptor);
  });

  it('should render a header, footer, and search result table', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <SearchPanel
              config={config}
              recordType="object"
              name={searchName}
              searchDescriptor={searchDescriptor}
              title="SearchPanel title"
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.querySelector('header > button').textContent.should.equal('SearchPanel title');
    this.container.querySelectorAll('.ReactVirtualized__Table__row').length.should.equal(5);
    this.container.querySelector('footer > .cspace-ui-Pager--common').should.not.equal(null);
  });


  it('should call onSearchDescriptorChange when a page is selected', function test() {
    let changedToSearchDescriptor = null;

    const handleSearchDescriptorChange = (searchDescriptorArg) => {
      changedToSearchDescriptor = searchDescriptorArg;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <SearchPanel
              config={config}
              recordType="object"
              name={searchName}
              searchDescriptor={searchDescriptor}
              onSearchDescriptorChange={handleSearchDescriptorChange}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    const pager = this.container.querySelector('.cspace-ui-Pager--common');
    const buttons = pager.querySelectorAll('.cspace-input-MiniButton--common');
    const nextPageButton = buttons[buttons.length - 1];

    Simulate.click(nextPageButton);

    changedToSearchDescriptor.should.deep.equal({
      recordType: 'object',
      searchQuery: {
        p: 1,
        size: 5,
      },
    });
  });

  it('should call onSearchDescriptorChange when the page size changes', function test() {
    let changedToSearchDescriptor = null;

    const handleSearchDescriptorChange = (searchDescriptorArg) => {
      changedToSearchDescriptor = searchDescriptorArg;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <SearchPanel
              config={config}
              recordType="object"
              name={searchName}
              searchDescriptor={searchDescriptor}
              onSearchDescriptorChange={handleSearchDescriptorChange}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    const pageSizeInput = this.container.querySelector('.cspace-ui-PageSizeChooser--common input');
    const newPageSize = 17;

    pageSizeInput.value = newPageSize;

    Simulate.change(pageSizeInput);
    Simulate.keyDown(pageSizeInput, { key: 'Enter' });

    changedToSearchDescriptor.should.deep.equal({
      recordType: 'object',
      searchQuery: {
        p: 0,
        size: newPageSize,
      },
    });
  });

  it('should call setPreferredPageSize when the page size changes', function test() {
    const recordType = 'object';

    let preferredPageSizeRecordType = null;
    let preferredPageSizeName = null;
    let preferredPageSize = null;

    const setPreferredPageSize = (recordTypeArg, nameArg, pageSizeArg) => {
      preferredPageSizeRecordType = recordTypeArg;
      preferredPageSizeName = nameArg;
      preferredPageSize = pageSizeArg;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <SearchPanel
              config={config}
              recordType={recordType}
              name={searchName}
              searchDescriptor={searchDescriptor}
              setPreferredPageSize={setPreferredPageSize}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    const pageSizeInput = this.container.querySelector('.cspace-ui-PageSizeChooser--common input');
    const newPageSize = 32;

    pageSizeInput.value = newPageSize;

    Simulate.change(pageSizeInput);
    Simulate.keyDown(pageSizeInput, { key: 'Enter' });

    preferredPageSizeRecordType.should.equal(recordType);
    preferredPageSizeName.should.equal(searchName);
    preferredPageSize.should.equal(newPageSize);
  });

  it('should call onSearchDescriptorChange when a column is sorted', function test() {
    let changedToSearchDescriptor = null;

    const handleSearchDescriptorChange = (searchDescriptorArg) => {
      changedToSearchDescriptor = searchDescriptorArg;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <SearchPanel
              config={config}
              recordType="object"
              name={searchName}
              searchDescriptor={searchDescriptor}
              onSearchDescriptorChange={handleSearchDescriptorChange}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    const titleHeader = this.container.querySelector('.ReactVirtualized__Table__sortableHeaderColumn');

    Simulate.click(titleHeader);

    changedToSearchDescriptor.should.deep.equal({
      recordType: 'object',
      searchQuery: {
        p: 0,
        size: 5,
        sort: 'title',
      },
    });
  });

  it('should push a search result location to history when the search button is clicked', function test() {
    const recordType = 'object';

    let pushedLocation = null;

    const router = mockRouter({
      push: (locationArg) => {
        pushedLocation = locationArg;
      },
    });

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <RouterProvider router={router}>
              <SearchPanel
                config={config}
                csid="1234"
                recordType={recordType}
                name={searchName}
                searchDescriptor={searchDescriptor}
              />
            </RouterProvider>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    const searchButton = this.container.querySelector('button[name="search"]');

    Simulate.click(searchButton);

    pushedLocation.should.deep.equal({
      pathname: `/list/${recordType}`,
      query: {
        p: '1',
        size: undefined,
      },
    });
  });
});
