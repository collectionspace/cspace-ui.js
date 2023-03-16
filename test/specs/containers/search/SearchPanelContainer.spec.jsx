import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import SearchPanel from '../../../../src/components/search/SearchPanel';
import SearchPanelContainer from '../../../../src/containers/search/SearchPanelContainer';
import { searchKey } from '../../../../src/reducers/search';

chai.use(chaiImmutable);
chai.should();

const mockStore = configureMockStore([thunk]);

describe('SearchPanelContainer', () => {
  const panelName = 'testSearch';
  const searchName = panelName;
  const searchResult = {};

  const searchError = {
    code: 'ERROR_CODE',
  };

  const searchDescriptor = Immutable.fromJS({
    searchQuery: {
      p: 0,
      size: 5,
    },
  });

  const recordType = 'object';
  const preferredPageSize = 23;

  it('should set props on SearchPanel', () => {
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

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SearchPanelContainer
        store={store}
        name={panelName}
        recordType={recordType}
        searchDescriptor={searchDescriptor}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const panel = findWithType(result, SearchPanel);

    panel.props.searchResult.should.equal(Immutable.fromJS(searchResult));
    panel.props.searchDescriptor.should.be.an('object');
    panel.props.search.should.be.a('function');
    panel.props.setPreferredPageSize.should.be.a('function');
  });

  it('should override the page size in the provided search descriptor with the preferred page size', () => {
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

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SearchPanelContainer
        store={store}
        name={panelName}
        recordType={recordType}
        searchDescriptor={searchDescriptor}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const panel = findWithType(result, SearchPanel);

    panel.props.searchDescriptor.should
      .equal(searchDescriptor.setIn(['searchQuery', 'size'], preferredPageSize));
  });
});
