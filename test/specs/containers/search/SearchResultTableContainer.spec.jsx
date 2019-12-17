import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import SearchResultTable from '../../../../src/components/search/SearchResultTable';
import { ConnectedSearchResultTable } from '../../../../src/containers/search/SearchResultTableContainer';
import { searchKey } from '../../../../src/reducers/search';

chai.use(chaiImmutable);
chai.should();

const mockStore = configureMockStore([thunk]);

describe('SearchResultTableContainer', () => {
  const searchName = 'testSearch';
  const searchDescriptor = Immutable.Map();
  const searchResult = {};

  const searchError = {
    code: 'ERROR_CODE',
  };

  it('should set props on SearchResultTable', () => {
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
      user: Immutable.Map(),
    });

    const context = {
      store,
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedSearchResultTable
        config={{}}
        searchName={searchName}
        searchDescriptor={searchDescriptor}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(SearchResultTable);

    result.props.isSearchPending.should.equal(true);
    result.props.searchResult.should.equal(Immutable.fromJS(searchResult));
    result.props.searchError.should.equal(Immutable.fromJS(searchError));

    result.props.formatCellData.should.be.a('function');
    result.props.formatColumnLabel.should.be.a('function');
  });

  it('should connect formatColumnLabel to intl.formatMessage', () => {
    const store = mockStore({
      search: Immutable.Map(),
      user: Immutable.Map(),
    });

    const context = {
      store,
    };

    const intl = {
      formatMessage: (message) => `formatted ${message.id}`,
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedSearchResultTable
        config={{}}
        intl={intl}
        searchName={searchName}
        searchDescriptor={searchDescriptor}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();

    result.props.formatColumnLabel({
      messages: {
        label: {
          id: 'column.object.objectNumber',
        },
      },
    }).should.equal('formatted column.object.objectNumber');
  });

  it('should supply formatCellData with intl and config', () => {
    const store = mockStore({
      search: Immutable.Map(),
      user: Immutable.Map(),
    });

    const context = {
      store,
    };

    const intl = {};
    const config = {};

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedSearchResultTable
        intl={intl}
        config={config}
        searchName={searchName}
        searchDescriptor={searchDescriptor}
      />, context,
    );

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

  it('should have formatCellData return the data if the column config does not contain a formatValue function', () => {
    const store = mockStore({
      search: Immutable.Map(),
      user: Immutable.Map(),
    });

    const context = {
      store,
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedSearchResultTable
        config={{}}
        searchName={searchName}
        searchDescriptor={searchDescriptor}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();

    result.props.formatCellData({}, 'data').should.equal('data');
  });
});
