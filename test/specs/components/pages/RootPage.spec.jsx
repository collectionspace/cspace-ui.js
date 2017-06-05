import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import { Provider as StoreProvider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Immutable from 'immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import RootPage from '../../../../src/components/pages/RootPage';

chai.should();

const mockStore = configureMockStore();

const store = mockStore({
  notification: Immutable.OrderedMap(),
});

describe('RootPage', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render the content', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RootPage>
            <div id="content">This is some content</div>
          </RootPage>
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.querySelector('div > div#content').textContent.should
      .equal('This is some content');
  });
});
