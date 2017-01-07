import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createRenderer } from 'react-addons-test-utils';
import Immutable from 'immutable';
import SearchResultTable from '../../../../src/components/search/SearchResultTable';
import { ConnectedSearchResultTable } from '../../../../src/containers/search/SearchResultTableContainer';

// import {
//   SET_KEYWORD_SEARCH_KEYWORD,
//   SET_KEYWORD_SEARCH_RECORD_TYPE,
//   SET_KEYWORD_SEARCH_VOCABULARY,
// } from '../../../../src/actions/keywordSearch';

chai.should();

const mockStore = configureMockStore([thunk]);

describe('SearchResultTableContainer', function suite() {
  it('should set props on SearchResultTable', function test() {
    const searchResult = Immutable.Map();
    const searchError = 'Error';

    const store = mockStore({
      search: Immutable.fromJS({
        isPending: true,
        result: searchResult,
        error: searchError,
      }),
    });

    const context = {
      store,
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ConnectedSearchResultTable />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(SearchResultTable);

    result.props.isSearchPending.should.equal(true);
    result.props.searchResult.should.equal(searchResult);
    result.props.searchError.should.equal(searchError);

    result.props.formatCellData.should.be.a('function');
    result.props.formatColumnLabel.should.be.a('function');
  });

  it('should connect formatColumnLabel to intl.formatMessage', function test() {
    const store = mockStore({
      search: Immutable.Map(),
    });

    const context = {
      store,
    };

    const intl = {
      formatMessage: message => `formatted ${message.id}`,
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ConnectedSearchResultTable intl={intl} />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.formatColumnLabel({
      messages: {
        label: {
          id: 'column.object.objectNumber',
        },
      },
    }).should.equal('formatted column.object.objectNumber');
  });

  it('should supply formatCellData with intl and config', function test() {
    const store = mockStore({
      search: Immutable.Map(),
    });

    const context = {
      store,
    };

    const intl = {};
    const config = {};

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ConnectedSearchResultTable intl={intl} config={config} />, context);

    const result = shallowRenderer.getRenderOutput();

    let suppliedIntl = null;
    let suppliedConfig = null;

    result.props.formatCellData({
      formatValue: (data, { intl: intlArg, config: configArg }) => {
        suppliedIntl = intlArg;
        suppliedConfig = configArg;
      },
    }, 'data');

    suppliedIntl.should.equal(intl);
    suppliedConfig.should.equal(config);
  });

  it('should have formatCellData return the data if the column config does not contain a formatValue function', function test() {
    const store = mockStore({
      search: Immutable.Map(),
    });

    const context = {
      store,
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ConnectedSearchResultTable />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.formatCellData({}, 'data').should.equal('data');
  });
});
