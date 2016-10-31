import React from 'react';
import { render } from 'react-dom';
import { hashHistory } from 'react-router';
import configureMockStore from 'redux-mock-store';
import { Provider as StoreProvider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';

import createTestContainer from '../../helpers/createTestContainer';

import RecordPluginProvider from '../../../src/components/record/RecordPluginProvider';
import Router from '../../../src/components/Router';

chai.should();

const readRecord = () => null;
const createNewRecord = () => null;
const redirectLogin = () => null;

const mockStore = configureMockStore();

const store = mockStore({
  login: {},
  user: {
    username: '',
  },
  record: {
    data: {
      1234: Immutable.Map(),
    },
    readsPending: {},
    savesPending: {},
  },
});

const recordPlugins = {
  object: {
    formTemplate: <div />,
    messageDescriptors: {
      recordNameTitle: {
        id: 'recordNameTitle',
        defaultMessage: 'Object',
      },
    },
    title: () => '',
  },
};

describe('Router', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should call redirectLogin when entering a protected page if there is no username', function test() {
    let redirectLoginCalled = false;

    const stubbedRedirectLogin = () => {
      redirectLoginCalled = true;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordPluginProvider recordPlugins={recordPlugins}>
            <Router
              createNewRecord={createNewRecord}
              history={hashHistory}
              readRecord={readRecord}
              redirectLogin={stubbedRedirectLogin}
            />
          </RecordPluginProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    hashHistory.push('/dashboard');

    redirectLoginCalled.should.equal(true);
  });

  it('should call readRecord when entering a record page with a csid', function test() {
    let readRecordCalled = false;

    const stubbedReadRecord = () => {
      readRecordCalled = true;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordPluginProvider recordPlugins={recordPlugins}>
            <Router
              createNewRecord={createNewRecord}
              history={hashHistory}
              readRecord={stubbedReadRecord}
              redirectLogin={redirectLogin}
            />
          </RecordPluginProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    hashHistory.push('/record/object/1234');

    readRecordCalled.should.equal(true);
  });

  it('should call createNewRecord when entering a record page without a csid', function test() {
    let createNewRecordCalled = false;

    const stubbedCreateNewRecord = () => {
      createNewRecordCalled = true;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordPluginProvider recordPlugins={recordPlugins}>
            <Router
              createNewRecord={stubbedCreateNewRecord}
              history={hashHistory}
              readRecord={readRecord}
              redirectLogin={redirectLogin}
            />
          </RecordPluginProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    hashHistory.push('/record/object');

    createNewRecordCalled.should.equal(true);
  });
});
