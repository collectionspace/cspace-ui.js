import React from 'react';
import { render } from 'react-dom';
import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import { Provider as StoreProvider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { createRenderer } from 'react-test-renderer/shallow';
import createTestContainer from '../../../helpers/createTestContainer';
import SearchResultTableContainer from '../../../../src/containers/search/SearchResultTableContainer';
import WatchedSearchResultTable from '../../../../src/components/search/WatchedSearchResultTable';

const { expect } = chai;

chai.should();

const mockStore = configureMockStore();

const store = mockStore({
  user: Immutable.Map(),
  search: Immutable.Map(),
});

const config = {};

describe('WatchedSearchResultTable', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a SearchResultTable', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <WatchedSearchResultTable />,
    );

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(SearchResultTableContainer);
  });

  it('should call onSearchDescriptorChange when the search descriptor changes', function test() {
    const searchDescriptor = Immutable.Map({
      recordType: 'group',
    });

    let changedSearchDescriptor = null;

    const handleSearchDescriptorChange = (searchDescriptorArg) => {
      changedSearchDescriptor = searchDescriptorArg;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <WatchedSearchResultTable
            config={config}
            searchDescriptor={searchDescriptor}
            onSearchDescriptorChange={handleSearchDescriptorChange}
          />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    expect(changedSearchDescriptor).to.equal(null);

    const nextSearchDescriptor = Immutable.Map({
      recordType: 'intake',
    });

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <WatchedSearchResultTable
            config={config}
            searchDescriptor={nextSearchDescriptor}
            onSearchDescriptorChange={handleSearchDescriptorChange}
          />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    changedSearchDescriptor.should.equal(nextSearchDescriptor);
  });

  it('should call search when search results are changed to undefined, and there is no search error', function test() {
    const searchDescriptor = Immutable.Map({
      recordType: 'group',
    });

    const searchResult = Immutable.Map();

    let searchCalled = false;

    const search = () => {
      searchCalled = true;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <WatchedSearchResultTable
            config={config}
            searchDescriptor={searchDescriptor}
            searchResult={searchResult}
            search={search}
          />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    searchCalled.should.equal(false);

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <WatchedSearchResultTable
            config={config}
            searchDescriptor={searchDescriptor}
            search={search}
          />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    searchCalled.should.equal(true);
  });
});
