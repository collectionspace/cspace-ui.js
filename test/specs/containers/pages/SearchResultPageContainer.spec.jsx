import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import SearchResultPage from '../../../../src/components/pages/SearchResultPage';
import SearchResultPageContainer from '../../../../src/containers/pages/SearchResultPageContainer';

chai.should();

const mockStore = configureMockStore([]);

describe('SearchResultPageContainer', () => {
  const store = mockStore({
    prefs: Immutable.fromJS({
      searchResultPagePageSize: 10,
    }),
    search: Immutable.Map(),
    user: Immutable.Map(),
  });

  const config = {};
  const params = {};

  const location = {
    action: '',
    pathname: '/search/collectionobject',
    search: '',
  };

  it('should set props on SearchResultPage', () => {
    const shallowRenderer = createRenderer();

    const context = {
      store,
      config,
    };

    shallowRenderer.render(
      <SearchResultPageContainer location={location} params={params} />, context,
    );

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(SearchResultPage);
    result.props.should.have.property('preferredPageSize', 10);
    result.props.should.have.property('search').that.is.a('function');
    result.props.should.have.property('setPreferredPageSize').that.is.a('function');
    result.props.should.have.property('setSearchPageAdvanced').that.is.a('function');
    result.props.should.have.property('setSearchPageKeyword').that.is.a('function');
  });
});
