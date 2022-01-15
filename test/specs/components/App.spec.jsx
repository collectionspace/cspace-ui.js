import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import { StaticRouter } from 'react-router';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import Immutable from 'immutable';

import createTestContainer from '../../helpers/createTestContainer';

import App from '../../../src/components/App';

chai.should();

const mockStore = configureMockStore();

const store = mockStore({
  cspace: Immutable.Map(),
  user: {},
  login: Immutable.Map(),
  notification: Immutable.Map({
    notifications: Immutable.OrderedMap(),
  }),
});

const TestRouter = ({ children }) => (
  <StaticRouter location="/login" context={{}}>
    {children}
  </StaticRouter>
);

TestRouter.propTypes = {
  children: PropTypes.node,
};

describe('App', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render', function test() {
    const config = {
      index: '/',
      locale: 'en',
    };

    render(
      <App
        store={store}
        config={config}
        router={TestRouter}
      />, this.container,
    );

    this.container.querySelector('div.cspace-ui-RootPage--common').should
      .not.equal(null);
  });

  it('should render a BrowserRouter if no router prop is supplied and prettyUrls is true', () => {
    const config = {
      index: '/',
      locale: 'en',
      prettyUrls: true,
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <App
        store={store}
        config={config}
      />,
    );

    const result = shallowRenderer.getRenderOutput();

    findWithType(result, BrowserRouter).should.not.equal(null);
  });

  it('should render a HashRouter if no router prop is supplied and prettyUrls is true', () => {
    const config = {
      index: '/',
      locale: 'en',
      prettyUrls: false,
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <App
        store={store}
        config={config}
      />,
    );

    const result = shallowRenderer.getRenderOutput();

    findWithType(result, HashRouter).should.not.equal(null);
  });

  it('should call openModal to confirm router navigation', () => {
    const config = {
      index: '/',
      locale: 'en',
    };

    let openModalName = null;
    let openModalCallback = null;

    const openModal = (nameArg, callbackArg) => {
      openModalName = nameArg;
      openModalCallback = callbackArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <App
        store={store}
        config={config}
        openModal={openModal}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const router = findWithType(result, HashRouter);

    const modalName = 'modalName';
    const modalCallback = () => null;

    router.props.getUserConfirmation(modalName, modalCallback);

    openModalName.should.equal(modalName);
    openModalCallback.should.equal(modalCallback);
  });
});
