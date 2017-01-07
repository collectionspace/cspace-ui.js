import React from 'react';
import { render } from 'react-dom';
import { Simulate } from 'react-addons-test-utils';
import Immutable from 'immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import mockRouter from '../../../helpers/mockRouter';
import RouterProvider from '../../../helpers/RouterProvider';
import ConfigProvider from '../../../../src/components/config/ConfigProvider';
import SearchResultTable from '../../../../src/components/search/SearchResultTable';

const expect = chai.expect;

chai.should();

const config = {
  recordTypes: {
    object: {
      serviceConfig: {
        objectName: 'CollectionObject',
      },
      columns: {
        search: [
          {
            name: 'objectNumber',
            messages: {
              label: {
                defaultMessage: 'Identification number',
              },
            },
            width: 150,
          },
          {
            name: 'title',
            messages: {
              label: {
                defaultMessage: 'Title',
              },
            },
            width: 450,
          },
          {
            name: 'updatedAt',
            messages: {
              label: {
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

const searchResult = Immutable.fromJS({
  'ns2:abstract-common-list': {
    pageNum: '0',
    pageSize: '40',
    itemsInPage: '5',
    totalItems: '5',
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
});

describe('SearchResultTable', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <ConfigProvider config={config}>
        <SearchResultTable />
      </ConfigProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render the search result', function test() {
    render(
      <ConfigProvider config={config}>
        <SearchResultTable
          recordType="object"
          searchResult={searchResult}
        />
      </ConfigProvider>, this.container);

    this.container.querySelectorAll('.cspace-layout-TableRow--common').length.should.equal(5);
  });

  it('should not render when the search result contains no items', function test() {
    const emptySearchResult = Immutable.fromJS({
      'ns2:abstract-common-list': {
        pageNum: '0',
        pageSize: '40',
        itemsInPage: '0',
        totalItems: '0',
      },
    });

    render(
      <ConfigProvider config={config}>
        <SearchResultTable
          recordType="object"
          searchResult={emptySearchResult}
        />
      </ConfigProvider>, this.container);

    expect(this.container.querySelector('.cspace-layout-Table--normal')).to.equal(null);
  });

  it('should properly render a single (non-list) search result', function test() {
    const singleSearchResult = Immutable.fromJS({
      'ns2:abstract-common-list': {
        pageNum: '0',
        pageSize: '40',
        itemsInPage: '1',
        totalItems: '1',
        'list-item': {
          csid: 'ea399d7a-7ea3-4670-930b',
          updatedAt: '2017-01-06T02:28:53.269Z',
          objectNumber: '4',
          title: 'Title',
        },
      },
    });

    render(
      <ConfigProvider config={config}>
        <SearchResultTable
          recordType="object"
          searchResult={singleSearchResult}
        />
      </ConfigProvider>, this.container);

    this.container.querySelectorAll('.cspace-layout-TableRow--common').length.should.equal(1);
  });

  it('should call renderHeader to render the table header', function test() {
    let renderHeaderSearchResult = null;

    const renderHeader = (searchResultArg) => {
      renderHeaderSearchResult = searchResultArg;

      return (
        <header>renderHeader called</header>
      );
    };

    render(
      <ConfigProvider config={config}>
        <SearchResultTable
          recordType="object"
          searchResult={searchResult}
          renderHeader={renderHeader}
        />
      </ConfigProvider>, this.container);

    renderHeaderSearchResult.should.equal(searchResult);

    this.container.querySelector('header').textContent.should.equal('renderHeader called');
  });

  it('should call renderFooter to render the table header', function test() {
    let renderFooterSearchResult = null;

    const renderFooter = (searchResultArg) => {
      renderFooterSearchResult = searchResultArg;

      return (
        <footer>renderFooter called</footer>
      );
    };

    render(
      <ConfigProvider config={config}>
        <SearchResultTable
          recordType="object"
          searchResult={searchResult}
          renderFooter={renderFooter}
        />
      </ConfigProvider>, this.container);

    renderFooterSearchResult.should.equal(searchResult);

    this.container.querySelector('footer').textContent.should.equal('renderFooter called');
  });

  it('should call formatCellData to render the table header', function test() {
    const formatCellDataCalls = {};

    const formatCellData = (column, data) => {
      const colName = column.name;

      if (!formatCellDataCalls[colName]) {
        formatCellDataCalls[colName] = [];
      }

      formatCellDataCalls[colName].push(data);

      return `*${data}`;
    };

    render(
      <ConfigProvider config={config}>
        <SearchResultTable
          recordType="object"
          searchResult={searchResult}
          formatCellData={formatCellData}
        />
      </ConfigProvider>, this.container);

    Object.keys(formatCellDataCalls).length.should
      .equal(config.recordTypes.object.columns.search.length);

    Object.keys(formatCellDataCalls).forEach((colName) => {
      formatCellDataCalls[colName].length.should
        .equal(searchResult.getIn(['ns2:abstract-common-list', 'list-item']).size);
    });

    const cells = this.container.querySelectorAll('.ReactVirtualized__Table__rowColumn');

    for (let i = 0; i < cells.length; i += 1) {
      cells[i].textContent[0].should.equal('*');
    }
  });

  it('should call formatColumnLabel to render the column headers', function test() {
    const formatColumnLabelCalls = {};

    const formatColumnLabel = (column) => {
      const colName = column.name;

      formatColumnLabelCalls[colName] = true;

      return `*${colName}`;
    };

    render(
      <ConfigProvider config={config}>
        <SearchResultTable
          recordType="object"
          searchResult={searchResult}
          formatColumnLabel={formatColumnLabel}
        />
      </ConfigProvider>, this.container);

    Object.keys(formatColumnLabelCalls).length.should
      .equal(config.recordTypes.object.columns.search.length);

    const headers = this.container.querySelectorAll('.ReactVirtualized__Table__headerColumn');

    for (let i = 0; i < headers.length; i += 1) {
      headers[i].textContent.should.equal(`*${config.recordTypes.object.columns.search[i].name}`);
    }
  });

  it('should navigate to the record when a row is clicked', function test() {
    let pushedLocation = null;

    const router = mockRouter({
      push: (location) => {
        pushedLocation = location;
      },
    });

    render(
      <ConfigProvider config={config}>
        <RouterProvider router={router}>
          <SearchResultTable
            recordType="object"
            searchResult={searchResult}
          />
        </RouterProvider>
      </ConfigProvider>, this.container);

    const rows = this.container.querySelectorAll('.cspace-layout-TableRow--common');

    Simulate.click(rows[3]);

    const csid = searchResult.getIn(['ns2:abstract-common-list', 'list-item', '3', 'csid']);

    pushedLocation.should.equal(`/record/object/${csid}`);
  });

  it('should propertly determine the record type of a result in an all record types search', function test() {
    const allRecordTypesSearchResult = Immutable.fromJS({
      'ns2:abstract-common-list': {
        pageNum: '0',
        pageSize: '40',
        itemsInPage: '1',
        totalItems: '1',
        'list-item': {
          csid: 'ea399d7a-7ea3-4670-930b',
          updatedAt: '2017-01-06T02:28:53.269Z',
          docName: null,
          docNumber: '4',
          docType: 'CollectionObject',
        },
      },
    });

    let pushedLocation = null;

    const router = mockRouter({
      push: (location) => {
        pushedLocation = location;
      },
    });

    render(
      <ConfigProvider config={config}>
        <RouterProvider router={router}>
          <SearchResultTable
            recordType="object"
            searchResult={allRecordTypesSearchResult}
          />
        </RouterProvider>
      </ConfigProvider>, this.container);

    const rows = this.container.querySelectorAll('.cspace-layout-TableRow--common');

    Simulate.click(rows[0]);

    const csid = allRecordTypesSearchResult.getIn(['ns2:abstract-common-list', 'list-item', 'csid']);

    pushedLocation.should.equal(`/record/object/${csid}`);
  });
});
