/* eslint-disable no-unused-expressions */

import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import { Provider as StoreProvider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Immutable from 'immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import ConfigProvider from '../../../../src/components/config/ConfigProvider';
import ProtectedPage from '../../../../src/components/pages/ProtectedPage';

chai.should();

const mockStore = configureMockStore([]);

const store = mockStore({
  quickSearch: Immutable.Map(),
  prefs: Immutable.Map(),
});

const config = {};

describe('ProtectedPage', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <ProtectedPage username="user@collectionspace.org" />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render the content', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <ProtectedPage username="user@collectionspace.org">
              <div id="content">This is some content</div>
            </ProtectedPage>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.querySelector('div > div#content').textContent.should
      .equal('This is some content');
  });

  it('should render a header containing a user menu', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <ProtectedPage username="user@collectionspace.org">
              <div id="content">This is some content</div>
            </ProtectedPage>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.querySelector('header .cspace-ui-UserMenu--common').should.not.be.null;
  });
});
