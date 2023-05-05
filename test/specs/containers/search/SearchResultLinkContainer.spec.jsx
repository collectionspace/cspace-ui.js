import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import { findWithType } from 'react-shallow-testutils';
import SearchResultLink from '../../../../src/components/search/SearchResultLink';
import SearchResultLinkContainer from '../../../../src/containers/search/SearchResultLinkContainer';
import { searchKey } from '../../../../src/reducers/search';

chai.use(chaiImmutable);
chai.should();

const mockStore = configureMockStore();

const searchName = 'testSearch';

const searchDescriptor = Immutable.fromJS({
  recordType: 'all',
  searchQuery: {
    p: 0,
    size: 0,
    kw: '"123 456"',
  },
});

const searchResult = {
  'ns2:abstract-common-list': {
    totalItems: '1',
    'list-item': {
      docNumber: 'LI2017.1.17',
      refName: 'urn:cspace:core.collectionspace.org:collectionobjects:id(d9968be7-83a2-4a94-af45)\'LI2017.1.17\'',
    },
  },
};

const searchError = {
  code: 'ERROR_CODE',
};

const store = mockStore({
  search: Immutable.fromJS({
    [searchName]: {
      byKey: {
        [searchKey(searchDescriptor)]: {
          isPending: true,
          result: searchResult,
          error: searchError,
        },
      },
    },
  }),
});

describe('SearchResultLinkContainer', () => {
  it('should set props on SearchResultLink', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SearchResultLinkContainer
        store={store}
        searchName={searchName}
        searchDescriptor={searchDescriptor}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const searchResultLink = findWithType(result, SearchResultLink);

    searchResultLink.props.isSearchPending.should.equal(true);
    searchResultLink.props.searchResult.should.equal(Immutable.fromJS(searchResult));
    searchResultLink.props.searchError.should.equal(Immutable.fromJS(searchError));
  });
});
