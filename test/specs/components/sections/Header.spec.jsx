import React from 'react';
import { render } from 'react-dom';
import { MemoryRouter as Router } from 'react-router';
import { IntlProvider } from 'react-intl';
import { Provider as StoreProvider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Immutable from 'immutable';

import createTestContainer from '../../../helpers/createTestContainer';

import ConfigProvider from '../../../../src/components/config/ConfigProvider';
import Header from '../../../../src/components/sections/Header';

chai.should();

const mockStore = configureMockStore([]);

const store = mockStore({
  quickSearch: Immutable.Map(),
  prefs: Immutable.Map(),
});

const config = {
  recordTypes: {},
};

describe('Header', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a header', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <Router>
              <Header username="username" />
            </Router>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('HEADER');
  });
});
