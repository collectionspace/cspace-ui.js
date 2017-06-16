import React from 'react';
import { render } from 'react-dom';
import { MemoryRouter as Router } from 'react-router';
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

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RootPage />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });
});
