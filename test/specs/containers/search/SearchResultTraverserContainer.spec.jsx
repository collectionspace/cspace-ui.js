import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import SearchResultTraverser from '../../../../src/components/search/SearchResultTraverser';
import SearchResultTraverserContainer from '../../../../src/containers/search/SearchResultTraverserContainer';
import { searchKey } from '../../../../src/reducers/search';

import {
  getNextPageSearchDescriptor,
  getPreviousPageSearchDescriptor,
} from '../../../../src/helpers/searchHelpers';

const { expect } = chai;

chai.use(chaiImmutable);
chai.should();

const mockStore = configureMockStore();

const searchName = 'testSearch';

const searchDescriptor = Immutable.fromJS({
  recordType: 'all',
  searchQuery: {
    p: 2,
    size: 20,
    kw: '"123 456"',
  },
});

const nextPageSearchDescriptor = getNextPageSearchDescriptor(searchDescriptor);
const prevPageSearchDescriptor = getPreviousPageSearchDescriptor(searchDescriptor);

const searchState = Immutable.Map({
  isPending: true,
});

const nextPageSearchState = Immutable.Map({
  error: {},
});

const prevPageSearchState = Immutable.Map({
  result: {},
});

const store = mockStore({
  search: Immutable.fromJS({
    [searchName]: {
      byKey: {
        [searchKey(searchDescriptor)]: searchState,
        [searchKey(nextPageSearchDescriptor)]: nextPageSearchState,
        [searchKey(prevPageSearchDescriptor)]: prevPageSearchState,
      },
    },
  }),
});

const context = {
  store,
};

describe('SearchResultTraverserContainer', () => {
  it('should set props on SearchResultTraverser', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SearchResultTraverserContainer
        searchName={searchName}
        searchDescriptor={searchDescriptor}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(SearchResultTraverser);

    result.props.nextPageSearchDescriptor.should.equal(nextPageSearchDescriptor);
    result.props.prevPageSearchDescriptor.should.equal(prevPageSearchDescriptor);
    result.props.searchState.should.equal(searchState);
    result.props.nextPageSearchState.should.equal(nextPageSearchState);
    result.props.prevPageSearchState.should.equal(prevPageSearchState);
    result.props.search.should.be.a('function');
  });

  it('should set prevPageSearchState to undefined if the search descriptor is on page 0', () => {
    const pageZeroSearchDescriptor = Immutable.fromJS({
      recordType: 'collectionobject',
      searchQuery: {
        p: 0,
      },
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SearchResultTraverserContainer
        searchName={searchName}
        searchDescriptor={pageZeroSearchDescriptor}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();

    expect(result.props.prevPageSearchState).to.equal(undefined);
  });
});
