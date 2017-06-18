import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { StaticRouter } from 'react-router';
import configureMockStore from 'redux-mock-store';
import Immutable from 'immutable';

import createTestContainer from '../../helpers/createTestContainer';

import App from '../../../src/components/App';

chai.should();

const mockStore = configureMockStore();

const store = mockStore({
  user: {},
  login: Immutable.Map(),
  notification: Immutable.Map({
    notifications: Immutable.OrderedMap(),
  }),
});

const config = {
  locale: 'en',
};

const TestRouter = ({ children }) => (
  <StaticRouter location="/login" context={{}}>
    {children}
  </StaticRouter>
);

TestRouter.propTypes = {
  children: PropTypes.node,
};

describe('App', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render', function test() {
    render(
      <App
        store={store}
        config={config}
        router={TestRouter}
      />, this.container);

    this.container.querySelector('div.cspace-ui-RootPage--common').should
      .not.equal(null);
  });
});
