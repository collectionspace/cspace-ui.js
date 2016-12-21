import React from 'react';
import { render } from 'react-dom';
import configureMockStore from 'redux-mock-store';
import { hashHistory } from 'react-router';

import createTestContainer from '../../helpers/createTestContainer';

import App from '../../../src/components/App';

chai.should();

const mockStore = configureMockStore();

const store = mockStore({
  user: {},
  login: {},
});

const plugins = {
  record: {},
};

const recordTypes = {};

describe('App', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render', function test() {
    render(
      <App
        store={store}
        history={hashHistory}
        plugins={plugins}
        recordTypes={recordTypes}
      />, this.container);

    this.container.querySelector('div.cspace-ui-RootPage--common').should
      .not.equal(null);
  });
});
