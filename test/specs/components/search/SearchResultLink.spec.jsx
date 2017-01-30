import React from 'react';
import { render } from 'react-dom';
import Immutable from 'immutable';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import SearchResultLink from '../../../../src/components/search/SearchResultLink';

const expect = chai.expect;

chai.should();

const config = {
  listTypes: {
    common: {
      listNodeName: 'ns2:abstract-common-list',
      itemNodeName: 'list-item',
      getItemLocation: item => `itemLocation: ${item.get('csid')}`,
    },
  },
  recordTypes: {
    object: {
      name: 'object',
      serviceConfig: {
        servicePath: 'collectionobjects',
      },
    },
    person: {
      serviceConfig: {
        servicePath: 'personauthorities',
        serviceType: 'authority',
      },
      vocabularies: {
        ulan: {
          serviceConfig: {
            servicePath: 'urn:cspace:name(ulan_pa)',
          },
        },
      },
    },
  },
};

describe('SearchResultLink', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a pending message if search is pending', function test() {
    render(
      <IntlProvider locale="en">
        <SearchResultLink isSearchPending />
      </IntlProvider>, this.container);

    this.container.querySelector('span').textContent.should.equal('...');
  });

  it('should render an error message if there is a search error', function test() {
    const searchError = Immutable.Map();

    render(
      <IntlProvider locale="en">
        <SearchResultLink searchError={searchError} />
      </IntlProvider>, this.container);

    this.container.querySelector('span').textContent.should.equal('...');
  });

  it('should render a not found message if the record is not found', function test() {
    const searchResult = Immutable.fromJS({
      'ns2:abstract-common-list': {
        totalItems: '0',
      },
    });

    render(
      <IntlProvider locale="en">
        <SearchResultLink config={config} searchResult={searchResult} />
      </IntlProvider>, this.container);

    this.container.querySelector('span').textContent.should.match(/not found/);
  });

  it('should render a link from the search result', function test() {
    const docNumber = 'LI2017.1.17';

    const searchResult = Immutable.fromJS({
      'ns2:abstract-common-list': {
        totalItems: '1',
        'list-item': {
          docNumber,
          refName: 'urn:cspace:core.collectionspace.org:collectionobjects:id(d9968be7-83a2-4a94-af45)\'LI2017.1.17\'',
        },
      },
    });

    render(
      <IntlProvider locale="en">
        <SearchResultLink config={config} searchResult={searchResult} />
      </IntlProvider>, this.container);

    this.container.querySelector('a > span').textContent.should.equal(docNumber);
  });

  it('should render a link for an authority item result', function test() {
    const docNumber = 'Ulysses Ulan';

    const searchResult = Immutable.fromJS({
      'ns2:abstract-common-list': {
        totalItems: '1',
        'list-item': {
          docNumber,
          refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(ulan_pa):item:name(UlyssesUlan1485379812706)\'Ulysses Ulan\'',
        },
      },
    });

    render(
      <IntlProvider locale="en">
        <SearchResultLink config={config} searchResult={searchResult} />
      </IntlProvider>, this.container);

    this.container.querySelector('a > span').textContent.should.equal(docNumber);
  });

  it('should render nothing if no search props are supplied', function test() {
    render(
      <IntlProvider locale="en">
        <SearchResultLink />
      </IntlProvider>, this.container);

    expect(this.container.querySelector('span')).to.equal(null);
  });

  it('should call search when mounted', function test() {
    const searchName = 'test';
    const searchDescriptor = {};

    let searchedConfig = null;
    let searchedSearchName = null;
    let searchedSearchDescriptor = null;

    const search = (configArg, searchNameArg, searchDescriptorArg) => {
      searchedConfig = configArg;
      searchedSearchName = searchNameArg;
      searchedSearchDescriptor = searchDescriptorArg;
    };

    render(
      <IntlProvider locale="en">
        <SearchResultLink
          config={config}
          search={search}
          searchDescriptor={searchDescriptor}
          searchName={searchName}
        />
      </IntlProvider>, this.container);

    searchedConfig.should.equal(config);
    searchedSearchName.should.equal(searchName);
    searchedSearchDescriptor.should.equal(searchDescriptor);
  });

  it('should call search when a new searchName is supplied via props', function test() {
    const searchName = 'test';
    const searchDescriptor = {};

    let searchedConfig = null;
    let searchedSearchName = null;
    let searchedSearchDescriptor = null;

    const search = (configArg, searchNameArg, searchDescriptorArg) => {
      searchedConfig = configArg;
      searchedSearchName = searchNameArg;
      searchedSearchDescriptor = searchDescriptorArg;
    };

    render(
      <IntlProvider locale="en">
        <SearchResultLink
          config={config}
          searchDescriptor={searchDescriptor}
          searchName="oldSearchName"
        />
      </IntlProvider>, this.container);

    render(
      <IntlProvider locale="en">
        <SearchResultLink
          config={config}
          search={search}
          searchDescriptor={searchDescriptor}
          searchName={searchName}
        />
      </IntlProvider>, this.container);

    searchedConfig.should.equal(config);
    searchedSearchName.should.equal(searchName);
    searchedSearchDescriptor.should.equal(searchDescriptor);
  });
});
