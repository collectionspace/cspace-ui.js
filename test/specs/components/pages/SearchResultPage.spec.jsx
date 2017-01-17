/* global document */

import React from 'react';
import { render } from 'react-dom';
import { Simulate } from 'react-addons-test-utils';
import { IntlProvider } from 'react-intl';
import { Provider as StoreProvider } from 'react-redux';
import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import createTestContainer from '../../../helpers/createTestContainer';
import mockRouter from '../../../helpers/mockRouter';
import RouterProvider from '../../../helpers/RouterProvider';
import ConfigProvider from '../../../../src/components/config/ConfigProvider';
import SearchResultPage from '../../../../src/components/pages/SearchResultPage';

const expect = chai.expect;

chai.should();

const mockStore = configureMockStore([]);

const searchResult = Immutable.fromJS({
  'ns2:abstract-common-list': {
    pageNum: '0',
    pageSize: '2',
    totalItems: '39',
    'list-item': [
      {},
      {},
    ],
  },
});

const store = mockStore({
  optionList: {
    searchResultPageSizes: [
      { value: '10' },
      { value: '20' },
      { value: '40' },
    ],
  },
  search: Immutable.fromJS({
    byKey: {
      '{"recordType":"object","vocabulary":"something","searchQuery":{"p":0,"size":"2"}}': {
        result: searchResult,
      },
    },
  }),
});

const config = {
  recordTypes: {
    object: {
      messages: {
        resultsTitle: {
          id: 'record.object.resultsTitle',
          defaultMessage: 'Objects',
        },
      },
      columns: {
        search: [
          {
            name: 'objectNumber',
            messages: {
              label: {
                id: 'column.object.objectNumber',
                defaultMessage: 'Identification number',
              },
            },
            sortBy: 'collectionobjects_common:objectNumber',
            width: 200,
          },
          {
            name: 'title',
            messages: {
              label: {
                id: 'column.object.title',
                defaultMessage: 'Title',
              },
            },
            sortBy: 'collectionobjects_common:titleGroupList/0/title',
            width: 400,
          },
        ],
      },
    },
  },
};

const params = {
  recordType: 'object',
  vocabulary: 'something',
};

const location = {
  action: '',
  pathname: '/search/object',
  search: '',
  query: {
    p: '1',
    size: '2',
  },
};

describe('SearchResultPage', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <SearchResultPage location={location} params={params} />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should not render a result table if the record type is unknown', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <SearchResultPage location={location} params={{ recordType: 'foo' }} />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    expect(this.container.querySelector('.cspace-ui-SearchResultTable--common')).to.equal(null);
  });

  it('should normalize query parameters', function test() {
    const testQuery = (query) => {
      let replacedLocation = null;

      const router = mockRouter({
        replace: (locationArg) => {
          replacedLocation = locationArg;
        },
      });

      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <RouterProvider router={router}>
                <SearchResultPage
                  location={{
                    action: '',
                    pathname: '',
                    search: '',
                    query,
                  }}
                  params={params}
                />
              </RouterProvider>
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, this.container);

      return (replacedLocation ? replacedLocation.query : null);
    };

    testQuery({}).should.deep.equal({ p: '1', size: '20' });
    testQuery({ p: '0' }).should.deep.equal({ p: '1', size: '20' });
    testQuery({ p: '-2' }).should.deep.equal({ p: '1', size: '20' });
    testQuery({ p: 'foo' }).should.deep.equal({ p: '1', size: '20' });
    testQuery({ p: '4foo' }).should.deep.equal({ p: '4', size: '20' });
    testQuery({ size: '-3' }).should.deep.equal({ p: '1', size: '20' });
    testQuery({ size: 'foo' }).should.deep.equal({ p: '1', size: '20' });
    testQuery({ size: '24foo' }).should.deep.equal({ p: '1', size: '24' });
    testQuery({ size: '3000' }).should.deep.equal({ p: '1', size: '2500' });

    expect(testQuery({ p: '1', size: '12' })).to.equal(null);
  });

  it('should call the search prop to perform a search', function test() {
    let searchedConfig = null;
    let searchedSearchDescriptor = null;

    const search = (configArg, searchDescriptorArg) => {
      searchedConfig = configArg;
      searchedSearchDescriptor = searchDescriptorArg;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <SearchResultPage
              location={location}
              params={params}
              search={search}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    searchedConfig.should.equal(config);

    searchedSearchDescriptor.should.deep.equal({
      recordType: params.recordType,
      vocabulary: params.vocabulary,

      // expect the page num searched to be 1 less than the page num in the URL
      searchQuery: Object.assign({}, location.query, {
        p: location.query.p - 1,
      }),
    });
  });

  it('should handle table sort changes', function test() {
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
              <SearchResultPage
                location={location}
                params={params}
              />
            </RouterProvider>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    const col = this.container.querySelector('.ReactVirtualized__Table__sortableHeaderColumn');

    Simulate.click(col);

    pushedLocation.should.deep.equal({
      pathname: location.pathname,
      query: Object.assign({}, location.query, {
        sort: 'objectNumber',
      }),
    });
  });

  describe('renderHeader', function method() {
    it('should render the search result header', function test() {
      const pageContainer = document.createElement('div');

      document.body.appendChild(pageContainer);

      let searchResultPage;

      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <SearchResultPage
                location={location}
                params={params}
                ref={(ref) => { searchResultPage = ref; }}
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, pageContainer);

      const headerContainer = document.createElement('div');

      document.body.appendChild(headerContainer);

      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              {searchResultPage.renderHeader({ searchResult })}
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, headerContainer);

      headerContainer.querySelector('header').should.not.equal(null);

      headerContainer.querySelector('header > span').textContent.should
        .equal('1–2 of 39 records found');

      const pageSizeChooser = headerContainer.querySelector('.cspace-ui-PageSizeChooser--common');

      pageSizeChooser.should.not.equal(null);

      const input = pageSizeChooser.querySelector('input');

      input.value.should.equal(location.query.size);

      Simulate.mouseDown(input);

      const items = pageSizeChooser.querySelectorAll('li');

      // items should match the searchResultPageSizes option values
      items[0].textContent.should.equal('10');
      items[1].textContent.should.equal('20');
      items[2].textContent.should.equal('40');
    });

    it('should render a pending message if the search is pending', function test() {
      const pageContainer = document.createElement('div');

      document.body.appendChild(pageContainer);

      let searchResultPage;

      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <SearchResultPage
                location={location}
                params={params}
                ref={(ref) => { searchResultPage = ref; }}
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, pageContainer);

      const headerContainer = document.createElement('div');

      document.body.appendChild(headerContainer);

      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              {searchResultPage.renderHeader({ isSearchPending: true })}
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, headerContainer);

      headerContainer.querySelector('header').should.not.equal(null);

      headerContainer.querySelector('header > span').textContent.should
        .equal('Searching...');
    });

    it('should render an error message if the search has an error', function test() {
      const searchError = Immutable.Map({
        code: 'ERROR_CODE',
      });

      const pageContainer = document.createElement('div');

      document.body.appendChild(pageContainer);

      let searchResultPage;

      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <SearchResultPage
                location={location}
                params={params}
                ref={(ref) => { searchResultPage = ref; }}
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, pageContainer);

      const headerContainer = document.createElement('div');

      document.body.appendChild(headerContainer);

      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              {searchResultPage.renderHeader({ searchError })}
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, headerContainer);

      headerContainer.querySelector('header').should.not.equal(null);

      headerContainer.querySelector('header').textContent.should.match(/^Error/);
    });

    it('should connect page size change events to a handler', function test() {
      let pushedLocation = null;

      const router = mockRouter({
        push: (locationArg) => {
          pushedLocation = locationArg;
        },
      });

      let preferredPageSize = null;

      const setPreferredPageSize = (pageSize) => {
        preferredPageSize = pageSize;
      };

      const pageContainer = document.createElement('div');

      document.body.appendChild(pageContainer);

      let searchResultPage;

      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <RouterProvider router={router}>
                <SearchResultPage
                  location={location}
                  params={params}
                  ref={(ref) => { searchResultPage = ref; }}
                  setPreferredPageSize={setPreferredPageSize}
                />
              </RouterProvider>
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, pageContainer);

      const headerContainer = document.createElement('div');

      document.body.appendChild(headerContainer);

      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              {searchResultPage.renderHeader({ searchResult })}
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, headerContainer);

      const pageSizeChooser = headerContainer.querySelector('.cspace-ui-PageSizeChooser--common');

      pageSizeChooser.should.not.equal(null);

      const input = pageSizeChooser.querySelector('input');

      Simulate.mouseDown(input);

      const items = pageSizeChooser.querySelectorAll('li');

      Simulate.click(items[1]);

      pushedLocation.should.deep.equal({
        pathname: location.pathname,
        query: {
          p: '1',
          size: '20',
        },
      });

      preferredPageSize.should.equal(20);
    });
  });

  describe('renderFooter', function method() {
    it('should render the search result footer', function test() {
      const pageContainer = document.createElement('div');

      document.body.appendChild(pageContainer);

      let searchResultPage;

      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <SearchResultPage
                location={location}
                params={params}
                ref={(ref) => { searchResultPage = ref; }}
              />
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, pageContainer);

      const footerContainer = document.createElement('div');

      document.body.appendChild(footerContainer);

      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              {searchResultPage.renderFooter({ searchResult })}
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, footerContainer);

      footerContainer.querySelector('footer').should.not.equal(null);

      const pager = footerContainer.querySelector('footer > .cspace-ui-Pager--common');

      pager.should.not.equal(null);

      const pages = pager.querySelectorAll('li');

      pages[0].textContent.should.equal('1');

      // searchResult has pageSize=2, totalItems=39, so expect 20 pages
      pages[pages.length - 1].textContent.should.equal('20');
    });

    it('should connect page select events to a handler', function test() {
      let pushedLocation = null;

      const router = mockRouter({
        push: (locationArg) => {
          pushedLocation = locationArg;
        },
      });

      const pageContainer = document.createElement('div');

      document.body.appendChild(pageContainer);

      let searchResultPage;

      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              <RouterProvider router={router}>
                <SearchResultPage
                  location={location}
                  params={params}
                  ref={(ref) => { searchResultPage = ref; }}
                />
              </RouterProvider>
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, pageContainer);

      const footerContainer = document.createElement('div');

      document.body.appendChild(footerContainer);

      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              {searchResultPage.renderFooter({ searchResult })}
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, footerContainer);

      footerContainer.querySelector('footer').should.not.equal(null);

      const pager = footerContainer.querySelector('footer > .cspace-ui-Pager--common');

      pager.should.not.equal(null);

      const pages = pager.querySelectorAll('li');
      const lastPageButton = pages[pages.length - 1].querySelector('button');

      Simulate.click(lastPageButton);

      pushedLocation.should.deep.equal({
        pathname: location.pathname,
        query: {
          p: '20',
          size: location.query.size,
        },
      });
    });
  });
});
