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

const store = mockStore({
  optionList: {
    searchResultPageSizes: [
      { value: '10' },
      { value: '20' },
      { value: '40' },
    ],
  },
  search: Immutable.Map(),
});

const config = {
  recordTypes: {
    object: {
      messageDescriptors: {
        resultsTitle: {
          id: 'record.object.resultsTitle',
          defaultMessage: 'Objects',
        },
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
    pgNum: '1',
    pgSz: '2',
  },
};

const searchResult = Immutable.fromJS({
  'ns2:abstract-common-list': {
    pageNum: '0',
    pageSize: '2',
    totalItems: '39',
    'list-item': [], // This shoud have 2 (pageSize) items, but we don't need them for these tests.
  },
});

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

  it('should render nothing if the record type is unknown', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <SearchResultPage location={location} params={{ recordType: 'foo' }} />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.children.length.should.equal(0);
  });

  it('should normalize query parameters', function test() {
    const testQuery = (query) => {
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

      return (pushedLocation ? pushedLocation.query : null);
    };

    testQuery({}).should.deep.equal({ pgNum: '1', pgSz: '40' });
    testQuery({ pgNum: '0' }).should.deep.equal({ pgNum: '1', pgSz: '40' });
    testQuery({ pgNum: '-2' }).should.deep.equal({ pgNum: '1', pgSz: '40' });
    testQuery({ pgNum: 'foo' }).should.deep.equal({ pgNum: '1', pgSz: '40' });
    testQuery({ pgNum: '4foo' }).should.deep.equal({ pgNum: '4', pgSz: '40' });
    testQuery({ pgSz: '-3' }).should.deep.equal({ pgNum: '1', pgSz: '40' });
    testQuery({ pgSz: 'foo' }).should.deep.equal({ pgNum: '1', pgSz: '40' });
    testQuery({ pgSz: '24foo' }).should.deep.equal({ pgNum: '1', pgSz: '24' });

    expect(testQuery({ pgNum: '1', pgSz: '12' })).to.equal(null);
  });

  it('should call the search prop to perform a search', function test() {
    let searchedRecordTypeConfig = null;
    let searchedVocabulary = null;
    let searchedSearchQuery = null;

    const search = (recordTypeConfig, vocabulary, searchQuery) => {
      searchedRecordTypeConfig = recordTypeConfig;
      searchedVocabulary = vocabulary;
      searchedSearchQuery = searchQuery;
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

    searchedRecordTypeConfig.should.equal(config.recordTypes[params.recordType]);
    searchedVocabulary.should.equal(params.vocabulary);

    // expect the page num searched to be 1 less than the page num in the URL
    searchedSearchQuery.should.deep.equal(
      Object.assign({}, location.query, { pgNum: location.query.pgNum - 1 })
    );
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
              {searchResultPage.renderHeader(searchResult)}
            </ConfigProvider>
          </StoreProvider>
        </IntlProvider>, headerContainer);

      headerContainer.querySelector('header').should.not.equal(null);

      headerContainer.querySelector('header > span').textContent.should
        .equal('1–2 of 39 records found');

      const pageSizeChooser = headerContainer.querySelector('.cspace-ui-PageSizeChooser--common');

      pageSizeChooser.should.not.equal(null);

      const input = pageSizeChooser.querySelector('input');

      input.value.should.equal(location.query.pgSz);

      Simulate.mouseDown(input);

      const items = pageSizeChooser.querySelectorAll('li');

      // items should match the searchResultPageSizes option values
      items[0].textContent.should.equal('10');
      items[1].textContent.should.equal('20');
      items[2].textContent.should.equal('40');
    });

    it('should connect page size change events to a handler', function test() {
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

      const headerContainer = document.createElement('div');

      document.body.appendChild(headerContainer);

      render(
        <IntlProvider locale="en">
          <StoreProvider store={store}>
            <ConfigProvider config={config}>
              {searchResultPage.renderHeader(searchResult)}
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
          pgNum: '1',
          pgSz: '20',
        },
      });
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
              {searchResultPage.renderFooter(searchResult)}
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
              {searchResultPage.renderFooter(searchResult)}
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
          pgNum: '20',
          pgSz: location.query.pgSz,
        },
      });
    });
  });
});
