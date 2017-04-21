/* global window */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Simulate } from 'react-addons-test-utils';
import { IntlProvider } from 'react-intl';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider as StoreProvider } from 'react-redux';
import Immutable from 'immutable';
import moxios from 'moxios';
import createTestContainer from '../../../helpers/createTestContainer';
import mockRouter from '../../../helpers/mockRouter';
import { configureCSpace } from '../../../../src/actions/cspace';
import RecordBrowser from '../../../../src/components/record/RecordBrowser';

chai.should();

const mockStore = configureMockStore([thunk]);

const data = Immutable.fromJS({
  document: {
    'ns2:collectionobjects_common': {
      objectNumber: '2017.1.1',
    },
  },
});

const store = mockStore({
  record: Immutable.fromJS({
    '': {
      data: {
        current: {
          document: {},
        },
      },
    },
    '4f516e24-6dfc-47c0-b368': {
      data: {
        baseline: data,
        current: data,
      },
    },
  }),
  prefs: Immutable.Map(),
  recordBrowser: Immutable.Map(),
  search: Immutable.Map(),
  searchToRelate: Immutable.Map(),
});

const config = {
  recordTypes: {
    collectionobject: {
      forms: {
        default: <div />,
      },
      serviceConfig: {
        servicePath: 'collectionobjects',
      },
    },
  },
};

describe('RecordBrowser', function suite() {
  before(() => {
    configureCSpace({});
  });

  beforeEach(function before() {
    this.container = createTestContainer(this);
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordBrowser
            config={config}
            csid="bf334217-62e9-4ef5-a46a"
            recordType="collectionobject"
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render a RecordBrowserNavBar', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordBrowser config={config} recordType="collectionobject" />
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.querySelector('.cspace-ui-RecordBrowserNavBar--common').should.not.equal(null);
  });

  it('should render a RecordEditor if a relatedRecordType prop is not supplied', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordBrowser
            config={config}
            recordType="collectionobject"
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.querySelector('.cspace-ui-RecordEditor--common').should.not.equal(null);
  });

  it('should replace history after a new record has been created', function test() {
    const createdCsid = '1234';

    moxios.stubRequest('/cspace-services/collectionobjects', {
      status: 201,
      headers: {
        location: `collectionobjects/${createdCsid}`,
      },
    });

    moxios.stubRequest(`/cspace-services/collectionobjects/${createdCsid}?wf_deleted=false`, {
      status: 200,
      response: {},
    });

    let replacementUrl = null;

    const stubbedRouter = mockRouter({
      replace: (url) => {
        replacementUrl = url;
      },
    });

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordBrowser
            config={config}
            csid=""
            recordType="collectionobject"
            router={stubbedRouter}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    const saveButton = this.container.querySelector('button[name=save]');

    Simulate.click(saveButton);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        replacementUrl.should.equal(`/record/collectionobject/${createdCsid}`);
        resolve();
      }, 0);
    });
  });

  it('should push on history to clone a record', function test() {
    let pushedUrl = null;

    const stubbedRouter = mockRouter({
      push: (url) => {
        pushedUrl = url;
      },
    });

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordBrowser
            config={config}
            csid="4f516e24-6dfc-47c0-b368"
            recordType="collectionobject"
            router={stubbedRouter}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    const cloneButton = this.container.querySelector('button[name=clone]');

    Simulate.click(cloneButton);

    pushedUrl.should.deep.equal({
      pathname: '/record/collectionobject',
      query: {
        clone: '4f516e24-6dfc-47c0-b368',
      },
    });
  });

  it('should render a RelatedRecordBrowser if a relatedRecordType prop is supplied', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordBrowser
            config={config}
            recordType="collectionobject"
            relatedRecordType="group"
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.querySelector('.cspace-ui-RelatedRecordBrowser--common').should.not.equal(null);
  });

  it('should call clearPreferredRelatedCsid when unmounted', function test() {
    let clearCalled = false;

    const clearPreferredRelatedCsid = () => {
      clearCalled = true;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordBrowser
            config={config}
            recordType="collectionobject"
            clearPreferredRelatedCsid={clearPreferredRelatedCsid}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    unmountComponentAtNode(this.container);

    clearCalled.should.equal(true);
  });

  it('should call clearPreferredRelatedCsid when a new csid is supplied via props', function test() {
    let clearCalled = false;

    const clearPreferredRelatedCsid = () => {
      clearCalled = true;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordBrowser
            config={config}
            csid="1111"
            recordType="collectionobject"
            clearPreferredRelatedCsid={clearPreferredRelatedCsid}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordBrowser
            config={config}
            csid="2222"
            recordType="collectionobject"
            clearPreferredRelatedCsid={clearPreferredRelatedCsid}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    clearCalled.should.equal(true);
  });
});
