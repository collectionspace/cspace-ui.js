import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import merge from 'lodash/merge';
import SearchPanel from '../../../../src/components/search/SearchPanel';
import SearchPanelContainer from '../../../../src/containers/search/SearchPanelContainer';
import { searchKey } from '../../../../src/reducers/search';

chai.use(chaiImmutable);
chai.should();

const mockStore = configureMockStore([thunk]);

describe('SearchPanelContainer', function suite() {
  const panelName = 'testSearch';
  const searchName = panelName;
  const searchResult = {};

  const searchError = {
    code: 'ERROR_CODE',
  };

  const searchDescriptor = {
    searchQuery: {
      p: 0,
      size: 5,
    },
  };

  const recordType = 'object';
  const preferredPageSize = 23;

  it('should set props on SearchPanel', function test() {
    const store = mockStore({
      prefs: Immutable.fromJS({}),
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

    const context = {
      store,
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SearchPanelContainer
        name={panelName}
        recordType={recordType}
        searchDescriptor={searchDescriptor}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(SearchPanel);

    result.props.searchResult.should.equal(Immutable.fromJS(searchResult));
    result.props.searchDescriptor.should.be.an('object');
    result.props.search.should.be.a('function');
    result.props.setPreferredPageSize.should.be.a('function');
  });

  it('should override the page size in the provided search descriptor with the preferred page size', function test() {
    const store = mockStore({
      prefs: Immutable.fromJS({
        panels: {
          [recordType]: {
            [panelName]: {
              pageSize: preferredPageSize,
            },
          },
        },
      }),
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

    const context = {
      store,
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SearchPanelContainer
        name={panelName}
        recordType={recordType}
        searchDescriptor={searchDescriptor}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.searchDescriptor.should.deep.equal(merge({}, searchDescriptor, {
      searchQuery: {
        size: preferredPageSize,
      },
    }));
  });
});
