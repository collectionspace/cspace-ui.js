import React from 'react';
import { render } from 'react-dom';
import { MemoryRouter as Router } from 'react-router';
import Immutable from 'immutable';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import SearchResultTraverser from '../../../../src/components/search/SearchResultTraverser';

import {
  getNextPageSearchDescriptor,
  getPreviousPageSearchDescriptor,
} from '../../../../src/helpers/searchHelpers';

const { expect } = chai;

chai.should();

const searchName = 'testSearch';

const searchDescriptor = Immutable.fromJS({
  recordType: 'collectionobject',
  searchQuery: {
    p: 5,
    size: 3,
    kw: 'foo',
  },
});

const nextPageSearchDescriptor = getNextPageSearchDescriptor(searchDescriptor);
const prevPageSearchDescriptor = getPreviousPageSearchDescriptor(searchDescriptor);

const pageNum = 5;
const pageSize = 3;
const totalItems = 33;

const searchState = Immutable.fromJS({
  indexesByCsid: {
    1111: 0,
    2222: 1,
    3333: 2,
  },
  result: {
    'ns2:abstract-common-list': {
      pageNum,
      pageSize,
      totalItems,
      'list-item': [
        {
          csid: '1111',
          refName: 'urn:cspace:core.collectionspace.org:collectionobjects:id(1111)\'2017.1\'',
        },
        {
          csid: '2222',
          refName: 'urn:cspace:core.collectionspace.org:collectionobjects:id(2222)\'2017.2\'',
        },
        {
          csid: '3333',
          refName: 'urn:cspace:core.collectionspace.org:collectionobjects:id(3333)\'2017.3\'',
        },
      ],
    },
  },
});

const prevPageSearchState = Immutable.fromJS({
  indexesByCsid: {
    '0000': 0,
    '0001': 1,
    '0002': 2,
  },
  result: {
    'ns2:abstract-common-list': {
      pageNum,
      pageSize,
      totalItems,
      'list-item': [
        {
          csid: '0000',
          refName: 'urn:cspace:core.collectionspace.org:collectionobjects:id(0000)\'2017.A\'',
        },
        {
          csid: '0001',
          refName: 'urn:cspace:core.collectionspace.org:collectionobjects:id(0001)\'2017.B\'',
        },
        {
          csid: '0002',
          refName: 'urn:cspace:core.collectionspace.org:collectionobjects:id(0002)\'2017.C\'',
        },
      ],
    },
  },
});

const nextPageSearchState = Immutable.fromJS({
  indexesByCsid: {
    4444: 0,
    5555: 1,
    6666: 2,
  },
  result: {
    'ns2:abstract-common-list': {
      pageNum,
      pageSize,
      totalItems,
      'list-item': [
        {
          csid: '4444',
          refName: 'urn:cspace:core.collectionspace.org:collectionobjects:id(4444)\'2017.4\'',
        },
        {
          csid: '5555',
          refName: 'urn:cspace:core.collectionspace.org:collectionobjects:id(5555)\'2017.5\'',
        },
        {
          csid: '6666',
          refName: 'urn:cspace:core.collectionspace.org:collectionobjects:id(6666)\'2017.6\'',
        },
      ],
    },
  },
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
      serviceConfig: {
        servicePath: 'collectionobjects',
      },
    },
  },
};

describe('SearchResultTraverser', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a nav', function test() {
    render(
      <IntlProvider locale="en">
        <Router>
          <SearchResultTraverser
            searchDescriptor={searchDescriptor}
          />
        </Router>
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('NAV');
  });

  it('should render a pending message if no search state is provided', function test() {
    render(
      <IntlProvider locale="en">
        <Router>
          <SearchResultTraverser
            searchDescriptor={searchDescriptor}
          />
        </Router>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('nav').textContent.should.equal('Search result … of …');
  });

  it('should render a pending message if the search is pending', function test() {
    const pendingSearchState = Immutable.fromJS({
      isPending: true,
    });

    render(
      <IntlProvider locale="en">
        <Router>
          <SearchResultTraverser
            searchDescriptor={searchDescriptor}
            searchState={pendingSearchState}
          />
        </Router>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('nav').textContent.should.equal('Search result … of …');
  });

  it('should render a pending message if the search has an error', function test() {
    const errorSearchState = Immutable.fromJS({
      error: {},
    });

    render(
      <IntlProvider locale="en">
        <Router>
          <SearchResultTraverser
            searchDescriptor={searchDescriptor}
            searchState={errorSearchState}
          />
        </Router>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('nav').textContent.should.equal('Search result … of …');
  });

  it('should render nothing if no search descriptor is provided', function test() {
    render(
      <IntlProvider locale="en">
        <Router>
          <SearchResultTraverser />
        </Router>
      </IntlProvider>, this.container,
    );

    expect(this.container.firstElementChild).to.equal(null);
  });

  it('should render the current item number and the total item count', function test() {
    const csid = '2222';
    const index = 1;

    render(
      <IntlProvider locale="en">
        <Router>
          <SearchResultTraverser
            config={config}
            csid={csid}
            searchDescriptor={searchDescriptor}
            searchState={searchState}
          />
        </Router>
      </IntlProvider>, this.container,
    );

    const itemNum = (pageNum * pageSize) + index + 1;

    this.container.querySelector('nav a').textContent.should
      .equal(`Search result ${itemNum} of ${totalItems}`);
  });

  it('should handle a result with a single (non-list) item', function test() {
    const csid = '1111';
    const index = 0;

    const singleItemSearchState = Immutable.fromJS({
      indexesByCsid: {
        1111: 0,
      },
      result: {
        'ns2:abstract-common-list': {
          pageNum,
          pageSize,
          totalItems,
          'list-item': {
            refName: 'urn:cspace:core.collectionspace.org:collectionobjects:id(1111)\'2017.1\'',
          },
        },
      },
    });

    render(
      <IntlProvider locale="en">
        <Router>
          <SearchResultTraverser
            config={config}
            csid={csid}
            searchDescriptor={searchDescriptor}
            searchState={singleItemSearchState}
          />
        </Router>
      </IntlProvider>, this.container,
    );

    const itemNum = (pageNum * pageSize) + index + 1;

    this.container.querySelector('nav a').textContent.should
      .equal(`Search result ${itemNum} of ${totalItems}`);
  });

  it('should render a link to the previous item', function test() {
    const csid = '2222';

    render(
      <IntlProvider locale="en">
        <Router>
          <SearchResultTraverser
            config={config}
            csid={csid}
            searchDescriptor={searchDescriptor}
            searchState={searchState}
          />
        </Router>
      </IntlProvider>, this.container,
    );

    const prevLink = this.container.querySelector('a[rel="prev"]');

    prevLink.should.not.equal(null);
    prevLink.textContent.should.equal('Previous');
    prevLink.href.should.equal('http://localhost:9876/record/collectionobject/1111');
  });

  it('should render a link to the next item', function test() {
    const csid = '2222';

    render(
      <IntlProvider locale="en">
        <Router>
          <SearchResultTraverser
            config={config}
            csid={csid}
            searchDescriptor={searchDescriptor}
            searchState={searchState}
          />
        </Router>
      </IntlProvider>, this.container,
    );

    const nextLink = this.container.querySelector('a[rel="next"]');

    nextLink.should.not.equal(null);
    nextLink.textContent.should.equal('Next');
    nextLink.href.should.equal('http://localhost:9876/record/collectionobject/3333');
  });

  it('should render a link to the first item on the next page when the current item is the last on its page, and the next page has been loaded', function test() {
    const csid = '3333';

    render(
      <IntlProvider locale="en">
        <Router>
          <SearchResultTraverser
            config={config}
            csid={csid}
            searchDescriptor={searchDescriptor}
            searchState={searchState}
            nextPageSearchDescriptor={nextPageSearchDescriptor}
            nextPageSearchState={nextPageSearchState}
          />
        </Router>
      </IntlProvider>, this.container,
    );

    const nextLink = this.container.querySelector('a[rel="next"]');

    nextLink.should.not.equal(null);
    nextLink.href.should.equal('http://localhost:9876/record/collectionobject/4444');
  });

  it('should render a placeholder link to the first item on the next page when the current item is the last on its page, and the next page is pending', function test() {
    const csid = '3333';

    const pendingNextPageSearchState = Immutable.Map({
      isPending: true,
    });

    render(
      <IntlProvider locale="en">
        <Router>
          <SearchResultTraverser
            config={config}
            csid={csid}
            searchDescriptor={searchDescriptor}
            searchState={searchState}
            nextPageSearchDescriptor={nextPageSearchDescriptor}
            nextPageSearchState={pendingNextPageSearchState}
          />
        </Router>
      </IntlProvider>, this.container,
    );

    const nextLink = this.container.querySelector('nav > div:last-child > span:last-child');

    nextLink.should.not.equal(null);
    nextLink.textContent.should.equal('Next');
  });

  it('should render a placeholder next link when the current item is the last item of all pages', function test() {
    const csid = '3333';

    const onePageSearchState = Immutable.fromJS({
      indexesByCsid: {
        1111: 0,
        2222: 1,
        3333: 2,
      },
      result: {
        'ns2:abstract-common-list': {
          pageNum: 0,
          pageSize: 20,
          totalItems: 3,
          'list-item': [
            {
              csid: '1111',
              refName: 'urn:cspace:core.collectionspace.org:collectionobjects:id(1111)\'2017.1\'',
            },
            {
              csid: '2222',
              refName: 'urn:cspace:core.collectionspace.org:collectionobjects:id(2222)\'2017.2\'',
            },
            {
              csid: '3333',
              refName: 'urn:cspace:core.collectionspace.org:collectionobjects:id(3333)\'2017.3\'',
            },
          ],
        },
      },
    });

    render(
      <IntlProvider locale="en">
        <Router>
          <SearchResultTraverser
            config={config}
            csid={csid}
            searchDescriptor={searchDescriptor}
            searchState={onePageSearchState}
            nextPageSearchDescriptor={nextPageSearchDescriptor}
          />
        </Router>
      </IntlProvider>, this.container,
    );

    const nextLink = this.container.querySelector('nav > div:last-child > span:last-child');

    nextLink.should.not.equal(null);
    nextLink.textContent.should.equal('Next');
  });

  it('should handle a next page result set with a single (non-list) item', function test() {
    const csid = '3333';

    const singleItemNextPageSearchState = Immutable.fromJS({
      indexesByCsid: {
        4444: 0,
      },
      result: {
        'ns2:abstract-common-list': {
          pageNum,
          pageSize,
          totalItems,
          'list-item': {
            csid: '4444',
            refName: 'urn:cspace:core.collectionspace.org:collectionobjects:id(4444)\'2017.4\'',
          },
        },
      },
    });

    render(
      <IntlProvider locale="en">
        <Router>
          <SearchResultTraverser
            config={config}
            csid={csid}
            searchDescriptor={searchDescriptor}
            searchState={searchState}
            nextPageSearchDescriptor={nextPageSearchDescriptor}
            nextPageSearchState={singleItemNextPageSearchState}
          />
        </Router>
      </IntlProvider>, this.container,
    );

    const nextLink = this.container.querySelector('a[rel="next"]');

    nextLink.should.not.equal(null);
    nextLink.href.should.equal('http://localhost:9876/record/collectionobject/4444');
  });

  it('should render a link to the last item on the previous page when the current item is the first on its page, and the previous page has been loaded', function test() {
    const csid = '1111';

    render(
      <IntlProvider locale="en">
        <Router>
          <SearchResultTraverser
            config={config}
            csid={csid}
            searchDescriptor={searchDescriptor}
            searchState={searchState}
            prevPageSearchDescriptor={prevPageSearchDescriptor}
            prevPageSearchState={prevPageSearchState}
          />
        </Router>
      </IntlProvider>, this.container,
    );

    const prevLink = this.container.querySelector('a[rel="prev"]');

    prevLink.should.not.equal(null);
    prevLink.href.should.equal('http://localhost:9876/record/collectionobject/0002');
  });

  it('should render a placeholder link to the last item on the previous page when the current item is the first on its page, and the previous page is pending', function test() {
    const csid = '1111';

    const pendingPrevPageSearchState = Immutable.Map({
      isPending: true,
    });

    render(
      <IntlProvider locale="en">
        <Router>
          <SearchResultTraverser
            config={config}
            csid={csid}
            searchDescriptor={searchDescriptor}
            searchState={searchState}
            prevPageSearchDescriptor={prevPageSearchDescriptor}
            prevPageSearchState={pendingPrevPageSearchState}
          />
        </Router>
      </IntlProvider>, this.container,
    );

    const prevLink = this.container.querySelector('nav > div:last-child > span:first-child');

    prevLink.should.not.equal(null);
    prevLink.textContent.should.equal('Previous');
  });

  it('should render a placeholder previous link when the current item is the first item of all pages', function test() {
    const csid = '1111';

    const onePageSearchState = Immutable.fromJS({
      indexesByCsid: {
        1111: 0,
        2222: 1,
        3333: 2,
      },
      result: {
        'ns2:abstract-common-list': {
          pageNum: 0,
          pageSize: 20,
          totalItems: 3,
          'list-item': [
            {
              csid: '1111',
              refName: 'urn:cspace:core.collectionspace.org:collectionobjects:id(1111)\'2017.1\'',
            },
            {
              csid: '2222',
              refName: 'urn:cspace:core.collectionspace.org:collectionobjects:id(2222)\'2017.2\'',
            },
            {
              csid: '3333',
              refName: 'urn:cspace:core.collectionspace.org:collectionobjects:id(3333)\'2017.3\'',
            },
          ],
        },
      },
    });

    render(
      <IntlProvider locale="en">
        <Router>
          <SearchResultTraverser
            config={config}
            csid={csid}
            searchDescriptor={searchDescriptor}
            searchState={onePageSearchState}
          />
        </Router>
      </IntlProvider>, this.container,
    );

    const prevLink = this.container.querySelector('nav > div:last-child > span:first-child');

    prevLink.should.not.equal(null);
    prevLink.textContent.should.equal('Previous');
  });

  it('should handle a previous page result set with a single (non-list) item', function test() {
    const csid = '1111';

    const singleItemPrevPageSearchState = Immutable.fromJS({
      indexesByCsid: {
        '0002': 0,
      },
      result: {
        'ns2:abstract-common-list': {
          pageNum,
          pageSize,
          totalItems,
          'list-item': {
            csid: '0002',
            refName: 'urn:cspace:core.collectionspace.org:collectionobjects:id(0002)\'2017.C\'',
          },
        },
      },
    });

    render(
      <IntlProvider locale="en">
        <Router>
          <SearchResultTraverser
            config={config}
            csid={csid}
            searchDescriptor={searchDescriptor}
            searchState={searchState}
            prevPageSearchDescriptor={prevPageSearchDescriptor}
            prevPageSearchState={singleItemPrevPageSearchState}
          />
        </Router>
      </IntlProvider>, this.container,
    );

    const prevLink = this.container.querySelector('a[rel="prev"]');

    prevLink.should.not.equal(null);
    prevLink.href.should.equal('http://localhost:9876/record/collectionobject/0002');
  });

  it('should call search when mounted if a search state is not provided', function test() {
    let searchedConfig = null;
    let searchedSearchName = null;
    let searchedSearchDescriptor = null;
    let searchedListType = null;

    const search = (configArg, searchNameArg, searchDescriptorArg, listTypeArg) => {
      searchedConfig = configArg;
      searchedSearchName = searchNameArg;
      searchedSearchDescriptor = searchDescriptorArg;
      searchedListType = listTypeArg;
    };

    const csid = '2222';

    render(
      <IntlProvider locale="en">
        <Router>
          <SearchResultTraverser
            config={config}
            csid={csid}
            searchName={searchName}
            searchDescriptor={searchDescriptor}
            search={search}
          />
        </Router>
      </IntlProvider>, this.container,
    );

    searchedConfig.should.equal(config);
    searchedSearchName.should.equal(searchName);
    searchedSearchDescriptor.should.equal(searchDescriptor);
    searchedListType.should.equal('common');
  });

  it('should call search when updated if a search state is not provided', function test() {
    let searchedConfig = null;
    let searchedSearchName = null;
    let searchedSearchDescriptor = null;
    let searchedListType = null;

    const search = (configArg, searchNameArg, searchDescriptorArg, listTypeArg) => {
      searchedConfig = configArg;
      searchedSearchName = searchNameArg;
      searchedSearchDescriptor = searchDescriptorArg;
      searchedListType = listTypeArg;
    };

    const csid = '2222';

    render(
      <IntlProvider locale="en">
        <Router>
          <SearchResultTraverser
            config={config}
            csid={csid}
            searchName={searchName}
            searchDescriptor={searchDescriptor}
            searchState={searchState}
            search={search}
          />
        </Router>
      </IntlProvider>, this.container,
    );

    expect(searchedConfig).to.equal(null);

    render(
      <IntlProvider locale="en">
        <Router>
          <SearchResultTraverser
            config={config}
            csid={csid}
            searchName={searchName}
            searchDescriptor={searchDescriptor}
            search={search}
          />
        </Router>
      </IntlProvider>, this.container,
    );

    searchedConfig.should.equal(config);
    searchedSearchName.should.equal(searchName);
    searchedSearchDescriptor.should.equal(searchDescriptor);
    searchedListType.should.equal('common');
  });

  it('should call search when mounted if a previous page search state is not provided, and the current item is the first on its page', function test() {
    let searchedConfig = null;
    let searchedSearchName = null;
    let searchedSearchDescriptor = null;
    let searchedListType = null;

    const search = (configArg, searchNameArg, searchDescriptorArg, listTypeArg) => {
      searchedConfig = configArg;
      searchedSearchName = searchNameArg;
      searchedSearchDescriptor = searchDescriptorArg;
      searchedListType = listTypeArg;
    };

    const csid = '1111';

    render(
      <IntlProvider locale="en">
        <Router>
          <SearchResultTraverser
            config={config}
            csid={csid}
            searchName={searchName}
            searchDescriptor={searchDescriptor}
            searchState={searchState}
            search={search}
            prevPageSearchDescriptor={prevPageSearchDescriptor}
          />
        </Router>
      </IntlProvider>, this.container,
    );

    searchedConfig.should.equal(config);
    searchedSearchName.should.equal(searchName);
    searchedSearchDescriptor.should.equal(prevPageSearchDescriptor);
    searchedListType.should.equal('common');
  });

  it('should call search when mounted if a next page search state is not provided, and the current item is the last on its page', function test() {
    let searchedConfig = null;
    let searchedSearchName = null;
    let searchedSearchDescriptor = null;
    let searchedListType = null;

    const search = (configArg, searchNameArg, searchDescriptorArg, listTypeArg) => {
      searchedConfig = configArg;
      searchedSearchName = searchNameArg;
      searchedSearchDescriptor = searchDescriptorArg;
      searchedListType = listTypeArg;
    };

    const csid = '3333';

    render(
      <IntlProvider locale="en">
        <Router>
          <SearchResultTraverser
            config={config}
            csid={csid}
            searchName={searchName}
            searchDescriptor={searchDescriptor}
            searchState={searchState}
            search={search}
            nextPageSearchDescriptor={nextPageSearchDescriptor}
          />
        </Router>
      </IntlProvider>, this.container,
    );

    searchedConfig.should.equal(config);
    searchedSearchName.should.equal(searchName);
    searchedSearchDescriptor.should.equal(nextPageSearchDescriptor);
    searchedListType.should.equal('common');
  });

  it('should handle a single item (non-list) search result when deciding if the next page should be retrieved', function test() {
    let searchedConfig = null;
    let searchedSearchName = null;
    let searchedSearchDescriptor = null;
    let searchedListType = null;

    const search = (configArg, searchNameArg, searchDescriptorArg, listTypeArg) => {
      searchedConfig = configArg;
      searchedSearchName = searchNameArg;
      searchedSearchDescriptor = searchDescriptorArg;
      searchedListType = listTypeArg;
    };

    const csid = '1111';

    const singleItemSearchState = Immutable.fromJS({
      indexesByCsid: {
        1111: 0,
      },
      result: {
        'ns2:abstract-common-list': {
          pageNum,
          pageSize,
          totalItems,
          'list-item': {
            refName: 'urn:cspace:core.collectionspace.org:collectionobjects:id(1111)\'2017.1\'',
          },
        },
      },
    });

    render(
      <IntlProvider locale="en">
        <Router>
          <SearchResultTraverser
            config={config}
            csid={csid}
            searchName={searchName}
            searchDescriptor={searchDescriptor}
            searchState={singleItemSearchState}
            search={search}
            nextPageSearchDescriptor={nextPageSearchDescriptor}
          />
        </Router>
      </IntlProvider>, this.container,
    );

    searchedConfig.should.equal(config);
    searchedSearchName.should.equal(searchName);
    searchedSearchDescriptor.should.equal(nextPageSearchDescriptor);
    searchedListType.should.equal('common');
  });
});
