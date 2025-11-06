import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider as StoreProvider } from 'react-redux';
import Immutable from 'immutable';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import SearchResultSidebar from '../../../../src/components/search/SearchResultSidebar';

const { expect } = chai;

chai.should();

const config = {
  recordTypes: {
    group: {},
  },
};

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  prefs: Immutable.Map({
    searchResultSidebarOpen: false,
  }),
  search: Immutable.Map({
    selected: Immutable.Map(),
  }),
  user: Immutable.Map({
    prefs: Immutable.Map(),
  }),
});

describe('SearchResultSidebar', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <SearchResultSidebar
            config={config}
            recordType="group"
            isOpen
          />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('.cspace-ui-SearchResultSidebar--common').nodeName.should.equal('DIV');
  });

  it('should only render the sidebar toggle if isOpen is false', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <SearchResultSidebar
            config={config}
            recordType="group"
            isOpen={false}
          />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    expect(this.container.querySelector('.cspace-ui-SearchResultSidebar--common')).to.equal(null);
    this.container.querySelector('.cspace-ui-SearchResultSidebar--closed').textContent.should.equal('Show sidebar');
  });
});
