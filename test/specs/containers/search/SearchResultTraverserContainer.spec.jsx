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
import { findWithType } from 'react-shallow-testutils';

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
        store={store}
        searchName={searchName}
        searchDescriptor={searchDescriptor}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const traverser = findWithType(result, SearchResultTraverser);

    traverser.should.not.be.null;
    traverser.props.nextPageSearchDescriptor.should.equal(nextPageSearchDescriptor);
    traverser.props.prevPageSearchDescriptor.should.equal(prevPageSearchDescriptor);
    traverser.props.searchState.should.equal(searchState);
    traverser.props.nextPageSearchState.should.equal(nextPageSearchState);
    traverser.props.prevPageSearchState.should.equal(prevPageSearchState);
    traverser.props.search.should.be.a('function');
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
        store={store}
        searchName={searchName}
        searchDescriptor={pageZeroSearchDescriptor}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const traverser = findWithType(result, SearchResultTraverser);

    expect(traverser.props.prevPageSearchState).to.equal(undefined);
  });
});
