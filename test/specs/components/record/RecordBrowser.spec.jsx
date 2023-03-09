/* global window */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Simulate } from 'react-dom/test-utils';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import { IntlProvider } from 'react-intl';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider as StoreProvider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router';
import Immutable from 'immutable';
import { setupWorker, rest } from 'msw';
import createTestContainer from '../../../helpers/createTestContainer';
import mockHistory from '../../../helpers/mockHistory';
import { configureCSpace } from '../../../../src/actions/cspace';
import RecordBrowser from '../../../../src/components/record/RecordBrowser';
import RecordEditorContainer from '../../../../src/containers/record/RecordEditorContainer';

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
  authority: Immutable.Map(),
  notification: Immutable.Map(),
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
  recordPage: Immutable.Map(),
  prefs: Immutable.Map(),
  recordBrowser: Immutable.Map(),
  search: Immutable.Map(),
  searchToSelect: Immutable.Map(),
  user: Immutable.fromJS({
    perms: {
      collectionobject: {
        data: 'CRUDL',
      },
    },
  }),
});

const config = {
  recordTypes: {
    collectionobject: {
      fields: {},
      forms: {
        default: {
          template: <div />,
        },
      },
      messages: {
        record: {
          collectionName: {
            id: 'record.collectionobject.collectionName',
            defaultMessage: 'Objects',
          },
        },
      },
      serviceConfig: {
        servicePath: 'collectionobjects',
        serviceType: 'object',
      },
      title: () => '',
    },
  },
};

describe('RecordBrowser', () => {
  const worker = setupWorker();

  before(() => {
    worker.start({ quiet: true });

    return store.dispatch(configureCSpace())
      .then(() => store.clearActions());
  });

  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  afterEach(() => {
    worker.resetHandlers();
  });

  after(() => {
    worker.stop();
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RecordBrowser
              config={config}
              csid="bf334217-62e9-4ef5-a46a"
              recordType="collectionobject"
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render a RecordBrowserNavBar', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RecordBrowser config={config} recordType="collectionobject" />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('.cspace-ui-RecordBrowserNavBar--common').should.not.equal(null);
  });

  it('should render a RecordEditor if a relatedRecordType prop is not supplied', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RecordBrowser
              config={config}
              recordType="collectionobject"
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('.cspace-ui-RecordEditor--common').should.not.equal(null);
  });

  it('should replace history after a new record has been created', function test() {
    const createdCsid = '1234';

    worker.use(
      rest.post('/cspace-services/collectionobjects', (req, res, ctx) => res(
        ctx.status(201),
        ctx.set('location', `collectionobjects/${createdCsid}`),
      )),
      rest.get(
        `/cspace-services/collectionobjects/${createdCsid}`,
        (req, res, ctx) => res(ctx.json({})),
      ),
    );

    let replacementUrl = null;

    const history = mockHistory({
      replace: (url) => {
        replacementUrl = url;
      },
    });

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RecordBrowser
              config={config}
              csid=""
              recordType="collectionobject"
              history={history}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const saveButton = this.container.querySelector('button[name=save]');

    Simulate.click(saveButton);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        replacementUrl.should.equal(`/record/collectionobject/${createdCsid}`);

        resolve();
      }, 100);
    });
  });

  it('should push a location onto history to clone a record', function test() {
    let pushedUrl = null;

    const history = mockHistory({
      push: (url) => {
        pushedUrl = url;
      },
    });

    const csid = '4f516e24-6dfc-47c0-b368';

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RecordBrowser
              config={config}
              csid={csid}
              recordType="collectionobject"
              history={history}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const cloneButton = this.container.querySelector('button[name=clone]');

    Simulate.click(cloneButton);

    pushedUrl.should.deep.equal({
      pathname: '/record/collectionobject',
      search: `?clone=${csid}`,
    });
  });

  it('should render a RelatedRecordBrowser if a relatedRecordType prop is supplied', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RecordBrowser
              config={config}
              recordType="collectionobject"
              relatedRecordType="group"
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

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
          <Router>
            <RecordBrowser
              config={config}
              recordType="collectionobject"
              clearPreferredRelatedCsid={clearPreferredRelatedCsid}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

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
          <Router>
            <RecordBrowser
              config={config}
              csid="1111"
              recordType="collectionobject"
              clearPreferredRelatedCsid={clearPreferredRelatedCsid}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RecordBrowser
              config={config}
              csid="2222"
              recordType="collectionobject"
              clearPreferredRelatedCsid={clearPreferredRelatedCsid}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    clearCalled.should.equal(true);
  });

  it('should replace the history location with the index location when a record is soft-deleted and there is no search state', () => {
    let replacedLocation = null;

    const history = mockHistory({
      replace: (location) => {
        replacedLocation = location;
      },
    });

    const csid = '4f516e24-6dfc-47c0-b368';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordBrowser
        config={config}
        csid={csid}
        recordType="collectionobject"
        history={history}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const recordEditorContainer = findWithType(result, RecordEditorContainer);

    recordEditorContainer.props.onRecordTransitioned('delete');

    replacedLocation.should.equal('/');
  });

  it('should replace the history location with a search result page location when a record is soft-deleted and there is a search state', () => {
    let replacedLocation = null;

    const history = mockHistory({
      replace: (location) => {
        replacedLocation = location;
      },
    });

    const csid = '4f516e24-6dfc-47c0-b368';
    const searchName = 'searchName';

    const location = {
      state: {
        searchName,
        searchDescriptor: {
          recordType: 'collectionobject',
          searchQuery: {
            kw: 'foo',
            p: 2,
            size: 15,
          },
        },
      },
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordBrowser
        config={config}
        csid={csid}
        recordType="collectionobject"
        history={history}
        location={location}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const recordEditorContainer = findWithType(result, RecordEditorContainer);

    recordEditorContainer.props.onRecordTransitioned('delete');

    replacedLocation.should.deep.equal({
      pathname: '/list/collectionobject',
      search: '?kw=foo&p=3&size=15',
    });
  });
});
