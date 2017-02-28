import React from 'react';
import { render } from 'react-dom';
import { hashHistory } from 'react-router';
import configureMockStore from 'redux-mock-store';
import { Provider as StoreProvider } from 'react-redux';
import thunk from 'redux-thunk';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';

import createTestContainer from '../../helpers/createTestContainer';

import ConfigProvider from '../../../src/components/config/ConfigProvider';
import Router from '../../../src/components/Router';

chai.should();

const readRecord = () => null;
const createNewRecord = () => null;

const mockStore = configureMockStore([thunk]);

const store = mockStore({
  login: {},
  quickSearch: Immutable.Map(),
  prefs: Immutable.Map(),
  record: {
    data: {
      1234: Immutable.Map(),
    },
    readsPending: {},
    savesPending: {},
  },
  search: Immutable.Map(),
  user: {
    username: '',
  },
});

const config = {
  listTypes: {
    authRef: {},
  },
  recordTypes: {
    object: {
      forms: {
        default: <div />,
      },
      messages: {
        record: {
          name: {
            id: 'name',
            defaultMessage: 'Object',
          },
          collectionName: {
            id: 'collectionName',
            defaultMessage: 'Objects',
          },
        },
      },
      serviceConfig: {
        serviceType: 'object',
      },
      title: () => '',
    },
  },
};

describe('Router', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should call redirectLogin when entering a protected page if there is no username', function test() {
    let redirectLoginCalled = false;

    const redirectLogin = () => {
      redirectLoginCalled = true;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <Router
              createNewRecord={createNewRecord}
              history={hashHistory}
              readRecord={readRecord}
              redirectLogin={redirectLogin}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    hashHistory.push('/dashboard');

    redirectLoginCalled.should.equal(true);
  });
});
