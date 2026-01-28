import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { MemoryRouter as Router } from 'react-router';
import Immutable from 'immutable';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import SearchResultTable from '../../../../src/components/search/SearchResultTable';

const { expect } = chai;

chai.should();

const searchName = 'searchName';

const searchDescriptor = Immutable.fromJS({
  recordType: 'collectionobject',
  searchQuery: {
    sort: 'title',
  },
});

const groupSearchDescriptor = Immutable.fromJS({
  recordType: 'group',
  searchQuery: {
    sort: 'title',
  },
});

const config = {
  listTypes: {
    common: {
      listNodeName: 'ns2:abstract-common-list',
      itemNodeName: 'list-item',
      getItemLocationPath: (item) => `itemLocation: ${item.get('csid')}`,
    },
    foo: {
      listNodeName: 'ns2:abstract-common-list',
      itemNodeName: 'list-item',
    },
    bar: {
      listNodeName: 'ns2:abstract-common-list',
      itemNodeName: 'list-item',
      getItemLocationPath: () => null,
    },
  },
  recordTypes: {
    collectionobject: {
      name: 'collectionobject',
      serviceConfig: {
        objectName: 'CollectionObject',
      },
      columns: {
        default: {
          objectNumber: {
            messages: {
              label: {
                defaultMessage: 'Identification number',
              },
            },
            name: 'objectNumber',
            order: 1,
            width: 200,
          },
          title: {
            messages: {
              label: {
                defaultMessage: 'Title',
              },
            },
            name: 'title',
            order: 2,
            sortBy: 'collectionobjects_common:titleGroupList/0/title',
            width: 400,
          },
          updatedAt: {
            messages: {
              label: {
                defaultMessage: 'Last modified',
              },
            },
            name: 'updatedAt',
            order: 3,
            width: 200,
          },
        },
        narrow: {
          objectNumber: {
            messages: {
              label: {
                defaultMessage: 'ID',
              },
            },
            name: 'objectNumber',
            order: 1,
            width: 200,
          },
        },
      },
    },
    group: {
      name: 'group',
      serviceConfig: {
        objectName: 'Group',
      },
      columns: {},
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

const intl = {
  formatMessage: (message) => `formatted ${message.id}`,
};

describe('SearchResultTable', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <Router>
        <SearchResultTable
          config={config}
          intl={intl}
        />
      </Router>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render the specified column set', function test() {
    render(
      <Router>
        <SearchResultTable
          columnSetName="narrow"
          config={config}
          intl={intl}
          searchDescriptor={searchDescriptor}
          searchResult={searchResult}
        />
      </Router>, this.container,
    );

    const cols = this.container.querySelectorAll('.ReactVirtualized__Table__headerColumn');

    cols[0].textContent.should.equal('ID');
  });

  it('should render the default column set if the specified column set does not exist', function test() {
    render(
      <Router>
        <SearchResultTable
          columnSetName="foobar"
          config={config}
          intl={intl}
          searchDescriptor={searchDescriptor}
          searchResult={searchResult}
        />
      </Router>, this.container,
    );

    const cols = this.container.querySelectorAll('.ReactVirtualized__Table__headerColumn');

    cols[0].textContent.should.equal('Identification number');
  });

  it('should render no columns if the specified column set does not exist, and there is no default column set', function test() {
    render(
      <Router>
        <SearchResultTable
          columnSetName="foobar"
          config={config}
          intl={intl}
          searchDescriptor={groupSearchDescriptor}
          searchResult={searchResult}
        />
      </Router>, this.container,
    );

    const cols = this.container.querySelectorAll('.ReactVirtualized__Table__headerColumn');

    cols.should.have.lengthOf(0);
  });

  it('should render the search result', function test() {
    render(
      <Router>
        <SearchResultTable
          config={config}
          intl={intl}
          searchDescriptor={searchDescriptor}
          searchResult={searchResult}
        />
      </Router>, this.container,
    );

    this.container.querySelectorAll('.cspace-layout-TableRow--common').length.should.equal(5);
  });

  it('should render a link for each result', function test() {
    render(
      <Router>
        <SearchResultTable
          config={config}
          intl={intl}
          searchDescriptor={searchDescriptor}
          searchResult={searchResult}
        />
      </Router>, this.container,
    );

    this.container.querySelectorAll('a').length.should.equal(5);
  });

  it('should not render links when linkItems is false', function test() {
    render(
      <Router>
        <SearchResultTable
          config={config}
          intl={intl}
          linkItems={false}
          searchDescriptor={searchDescriptor}
          searchResult={searchResult}
        />
      </Router>, this.container,
    );

    this.container.querySelectorAll('a').length.should.equal(0);
  });

  it('should not render links when the list type does not have a configured getItemLocationPath function', function test() {
    render(
      <Router>
        <SearchResultTable
          config={config}
          intl={intl}
          listType="foo"
          searchDescriptor={searchDescriptor}
          searchResult={searchResult}
        />
      </Router>, this.container,
    );

    this.container.querySelectorAll('a').length.should.equal(0);
  });

  it('should not render links when the list type getItemLocationPath function returns a blank path', function test() {
    render(
      <Router>
        <SearchResultTable
          config={config}
          intl={intl}
          listType="bar"
          searchDescriptor={searchDescriptor}
          searchResult={searchResult}
        />
      </Router>, this.container,
    );

    this.container.querySelectorAll('a').length.should.equal(0);
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
      <Router>
        <SearchResultTable
          config={config}
          intl={intl}
          searchDescriptor={searchDescriptor}
          searchResult={emptySearchResult}
        />
      </Router>, this.container,
    );

    expect(this.container.querySelector('.cspace-layout-Table--normal')).to.equal(null);
  });

  it('should render a loading indicator when the search is pending and the search result has unknown total items count', function test() {
    const emptySearchResult = Immutable.fromJS({
      'ns2:abstract-common-list': {
        pageNum: '0',
        pageSize: '40',
        itemsInPage: null,
        totalItems: null,
      },
    });

    render(
      <IntlProvider locale="en">
        <Router>
          <SearchResultTable
            config={config}
            intl={intl}
            isSearchPending
            searchDescriptor={searchDescriptor}
            searchResult={emptySearchResult}
          />
        </Router>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('.cspace-ui-SearchResultEmpty--common').textContent.should
      .equal('⋯');
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
      <Router>
        <SearchResultTable
          intl={intl}
          config={config}
          searchDescriptor={searchDescriptor}
          searchResult={singleSearchResult}
        />
      </Router>, this.container,
    );

    this.container.querySelectorAll('.cspace-layout-TableRow--common').length.should.equal(1);
  });

  it('should allow a search result to have no items, even if totalItems is non-zero', function test() {
    const singleSearchResult = Immutable.fromJS({
      'ns2:abstract-common-list': {
        pageNum: '0',
        pageSize: '40',
        itemsInPage: '1',
        totalItems: '4',
      },
    });

    render(
      <Router>
        <SearchResultTable
          intl={intl}
          config={config}
          searchDescriptor={searchDescriptor}
          searchResult={singleSearchResult}
        />
      </Router>, this.container,
    );

    this.container.querySelectorAll('.ReactVirtualized__Table__headerRow').length.should.equal(1);
  });

  it('should render the sorted column header specified in the search descriptor', function test() {
    render(
      <Router>
        <SearchResultTable
          intl={intl}
          config={config}
          searchDescriptor={searchDescriptor}
          searchResult={searchResult}
        />
      </Router>, this.container,
    );

    const cols = this.container.querySelectorAll('.ReactVirtualized__Table__headerColumn');

    cols[1].className.should.match(/ReactVirtualized__Table__sortableHeaderColumn/);
    cols[1].querySelector('svg.ReactVirtualized__Table__sortableHeaderIcon--ASC').should.not.equal(null);
  });

  it('should call onSortChange when a sortable column header is clicked', function test() {
    let changedToSort = null;

    const handleSortChange = (sort) => {
      changedToSort = sort;
    };

    render(
      <Router>
        <SearchResultTable
          intl={intl}
          config={config}
          searchDescriptor={searchDescriptor}
          searchResult={searchResult}
          onSortChange={handleSortChange}
        />
      </Router>, this.container,
    );

    const cols = this.container.querySelectorAll('.ReactVirtualized__Table__headerColumn');

    Simulate.click(cols[1]);

    changedToSort.should.equal('title desc');
  });

  it('should call renderHeader to render the table header', function test() {
    let renderHeaderSearchResult = null;

    const renderHeader = (args) => {
      renderHeaderSearchResult = args.searchResult;

      return (
        <header>renderHeader called</header>
      );
    };

    render(
      <Router>
        <SearchResultTable
          intl={intl}
          config={config}
          searchDescriptor={searchDescriptor}
          searchResult={searchResult}
          renderHeader={renderHeader}
        />
      </Router>, this.container,
    );

    renderHeaderSearchResult.should.equal(searchResult);

    this.container.querySelector('header').textContent.should.equal('renderHeader called');
  });

  it('should call renderFooter to render the table header', function test() {
    let renderFooterSearchResult = null;

    const renderFooter = (args) => {
      renderFooterSearchResult = args.searchResult;

      return (
        <footer>renderFooter called</footer>
      );
    };

    render(
      <Router>
        <SearchResultTable
          intl={intl}
          config={config}
          searchDescriptor={searchDescriptor}
          searchResult={searchResult}
          renderFooter={renderFooter}
        />
      </Router>, this.container,
    );

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
      <Router>
        <SearchResultTable
          intl={intl}
          config={config}
          searchDescriptor={searchDescriptor}
          searchResult={searchResult}
          formatCellData={formatCellData}
        />
      </Router>, this.container,
    );

    Object.keys(formatCellDataCalls).length.should
      .equal(Object.keys(config.recordTypes.collectionobject.columns.default).length);

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
      <Router>
        <SearchResultTable
          intl={intl}
          config={config}
          searchDescriptor={searchDescriptor}
          searchResult={searchResult}
          formatColumnLabel={formatColumnLabel}
        />
      </Router>, this.container,
    );

    Object.keys(formatColumnLabelCalls).length.should
      .equal(Object.keys(config.recordTypes.collectionobject.columns.default).length);

    const headers = this.container.querySelectorAll('.ReactVirtualized__Table__headerColumn');

    headers[0].textContent.should.equal('*objectNumber');
    headers[1].textContent.should.equal('*title');
    headers[2].textContent.should.equal('*updatedAt');
  });

  it('should call onItemClick when a row is clicked', function test() {
    let clickedItem = null;

    const handleItemClick = (itemArg) => {
      clickedItem = itemArg;

      return true;
    };

    render(
      <Router>
        <SearchResultTable
          intl={intl}
          config={config}
          searchName={searchName}
          searchDescriptor={searchDescriptor}
          searchResult={searchResult}
          onItemClick={handleItemClick}
        />
      </Router>, this.container,
    );

    const rows = this.container.querySelectorAll('.cspace-layout-TableRow--common');

    Simulate.click(rows[3]);

    clickedItem.should.equal(searchResult.getIn(['ns2:abstract-common-list', 'list-item', '3']));
  });

  it('should call onItemClick when linkItems is false and enter is depressed on a row', function test() {
    let clickedItem = null;

    const handleItemClick = (itemArg) => {
      clickedItem = itemArg;

      return true;
    };

    render(
      <Router>
        <SearchResultTable
          config={config}
          intl={intl}
          searchName={searchName}
          searchDescriptor={searchDescriptor}
          searchResult={searchResult}
          onItemClick={handleItemClick}
          linkItems={false}
        />
      </Router>, this.container,
    );

    const rows = this.container.querySelectorAll('.cspace-layout-TableRow--common');

    Simulate.keyDown(rows[3], { key: 'Enter' });

    clickedItem.should.equal(searchResult.getIn(['ns2:abstract-common-list', 'list-item', '3']));
  });
});
