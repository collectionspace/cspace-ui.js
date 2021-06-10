/* global window, document */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { MemoryRouter as Router } from 'react-router';
import { findRenderedComponentWithType, Simulate } from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider as StoreProvider } from 'react-redux';
import Immutable from 'immutable';
import { setupWorker, rest } from 'msw';
import { Modal } from 'cspace-layout';
import asyncQuerySelector from '../../../helpers/asyncQuerySelector';
import createTestContainer from '../../../helpers/createTestContainer';
import mockHistory from '../../../helpers/mockHistory';
import { configureCSpace } from '../../../../src/actions/cspace';
import RelationEditor from '../../../../src/components/record/RelationEditor';
import RelatedRecordPanel from '../../../../src/components/record/RelatedRecordPanel';
import RelatedRecordBrowser from '../../../../src/components/record/RelatedRecordBrowser';
import SearchToRelateModal from '../../../../src/components/search/SearchToRelateModal';
import RelatedRecordPanelContainer from '../../../../src/containers/record/RelatedRecordPanelContainer';

const { expect } = chai;

chai.should();

const mockStore = configureMockStore([thunk]);

const csid = '1234';
const recordType = 'collectionobject';
const relatedCsid = '5678';
const relatedRecordType = 'group';

const perms = Immutable.fromJS({
  collectionobject: {
    data: 'CRUDL',
  },
  group: {
    data: 'CRUDL',
  },
  relation: {
    data: 'CRUDL',
  },
});

const store = mockStore({
  authority: Immutable.Map(),
  notification: Immutable.Map(),
  optionList: Immutable.Map(),
  prefs: Immutable.Map(),
  record: Immutable.fromJS({
    '': {
      data: {
        current: {
          document: {},
        },
      },
    },
    [csid]: {
      data: {
        current: {
          document: {
            'ns2:collectionspace_core': {
              updatedAt: '2017-03-23-16:35:42.000Z',
            },
          },
        },
      },
    },
  }),
  recordPage: Immutable.Map(),
  relation: Immutable.fromJS({
    find: {
      [csid]: {
        [relatedCsid]: {
          affects: {
            result: {
              'rel:relations-common-list': {
                totalItems: '1',
              },
            },
          },
        },
      },
    },
  }),
  search: Immutable.Map(),
  searchToSelect: Immutable.fromJS({
    recordType: 'group',
  }),
  user: Immutable.fromJS({
    perms,
  }),
});

const config = {
  listTypes: {
    common: {
      listNodeName: 'ns2:abstract-common-list',
      itemNodeName: 'list-item',
    },
  },
  recordTypes: {
    group: {
      serviceConfig: {
        servicePath: 'groups',
        serviceType: 'procedure',
      },
      fields: {},
      forms: {
        default: {
          template: <div />,
        },
      },
      messages: {
        record: {
          name: {
            id: 'record.group.name',
            defaultMessage: 'Group',
          },
          collectionName: {
            id: 'record.group.collectionName',
            defaultMessage: 'Groups',
          },
        },
      },
      title: () => 'Title',
    },
  },
};

describe('RelatedRecordBrowser', () => {
  const worker = setupWorker();

  before(() => {
    worker.start({ quiet: true });

    return store.dispatch(configureCSpace())
      .then(() => store.clearActions());
  });

  beforeEach(function before() {
    this.container = createTestContainer(this);
    Modal.setAppElement(this.container);
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
          <RelatedRecordBrowser config={config} />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('DIV');
    unmountComponentAtNode(this.container);
    this.container.remove();
  });

  it('should render a relation editor if a related csid is provided', function test() {
    const resultTree = render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RelatedRecordBrowser
              config={config}
              recordType={recordType}
              csid={csid}
              relatedRecordType={relatedRecordType}
              relatedCsid={relatedCsid}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const component = findRenderedComponentWithType(resultTree, RelationEditor);

    component.should.not.equal(null);
  });

  it('should replace history when a related csid is not provided but a preferred related csid is provided', function test() {
    const location = {
      state: {
        foo: 'foo',
        bar: 'bar',
      },
    };

    let replacedLocation = null;

    const history = mockHistory({
      replace: (locationArg) => {
        replacedLocation = locationArg;
      },
    });

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RelatedRecordBrowser
              config={config}
              location={location}
              recordType={recordType}
              csid={csid}
              relatedRecordType={relatedRecordType}
              preferredRelatedCsid={relatedCsid}
              history={history}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    replacedLocation.should.deep.equal({
      pathname: `/record/${recordType}/${csid}/${relatedRecordType}/${relatedCsid}`,
      state: location.state,
    });
  });

  it('should replace history when the clone button is clicked', function test() {
    const location = {
      state: {
        foo: 'foo',
        bar: 'bar',
      },
    };

    let replacedLocation = null;

    const history = mockHistory({
      replace: (locationArg) => {
        replacedLocation = locationArg;
      },
    });

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RelatedRecordBrowser
              config={config}
              location={location}
              perms={perms}
              recordType={recordType}
              csid={csid}
              relatedRecordType={relatedRecordType}
              relatedCsid={relatedCsid}
              history={history}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const button = this.container.querySelector('button[name="clone"]');

    Simulate.click(button);

    replacedLocation.should.deep.equal({
      pathname: `/record/${recordType}/${csid}/${relatedRecordType}/new`,
      search: `?clone=${relatedCsid}`,
      state: location.state,
    });
  });

  it('should replace history when the create new button is clicked', function test() {
    const location = {
      state: {
        foo: 'foo',
        bar: 'bar',
      },
    };

    let replacedLocation = null;

    const history = mockHistory({
      replace: (locationArg) => {
        replacedLocation = locationArg;
      },
    });

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RelatedRecordBrowser
              config={config}
              location={location}
              perms={perms}
              recordType={recordType}
              csid={csid}
              relatedRecordType={relatedRecordType}
              history={history}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const button = this.container.querySelector('button[name="create"]');

    Simulate.click(button);

    replacedLocation.should.deep.equal({
      pathname: `/record/${recordType}/${csid}/${relatedRecordType}/new`,
      state: location.state,
    });
  });

  it('should call onShowRelated when a related record list item is clicked', function test() {
    let showRelatedRecordType = null;
    let showRelatedCsid = null;

    const handleShowRelated = (recordTypeArg, csidArg) => {
      showRelatedRecordType = recordTypeArg;
      showRelatedCsid = csidArg;
    };

    const resultTree = render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RelatedRecordBrowser
              config={config}
              recordType={recordType}
              csid={csid}
              relatedRecordType={relatedRecordType}
              onShowRelated={handleShowRelated}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const component = findRenderedComponentWithType(resultTree, RelatedRecordPanel);

    component.props.onItemClick(Immutable.Map({ csid: relatedCsid }));

    showRelatedRecordType.should.equal(relatedRecordType);
    showRelatedCsid.should.equal(relatedCsid);
  });

  it('should replace history when a new related record is created', function test() {
    const location = {
      state: {
        foo: 'foo',
        bar: 'bar',
      },
    };

    let replacedLocation = null;

    const history = mockHistory({
      replace: (locationArg) => {
        replacedLocation = locationArg;
      },
    });

    const newCsid = '9999';

    worker.use(
      rest.post('/cspace-services/groups', (req, res, ctx) => res(
        ctx.status(201),
        ctx.set('location', `groups/${newCsid}`),
      )),
      rest.get(
        `/cspace-services/groups/${newCsid}`,
        (req, res, ctx) => res(ctx.json({})),
      ),
      rest.post('/cspace-services/relations', (req, res, ctx) => res(
        ctx.status(201),
        ctx.set('location', 'relations/somecsid'),
      )),
    );

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RelatedRecordBrowser
              config={config}
              location={location}
              recordType={recordType}
              csid={csid}
              relatedRecordType={relatedRecordType}
              relatedCsid=""
              history={history}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const saveButton = this.container.querySelector('button[name="save"]');

    Simulate.click(saveButton);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        replacedLocation.should.deep.equal({
          pathname: `/record/${recordType}/${csid}/${relatedRecordType}/${newCsid}`,
          state: location.state,
        });

        resolve();
      }, 100);
    });
  });

  it('should show the search to relate modal when the relate button is clicked', function test() {
    const resultTree = render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RelatedRecordBrowser
              config={config}
              perms={perms}
              recordType={recordType}
              csid={csid}
              relatedRecordType={relatedRecordType}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const button = this.container.querySelector('button[name="relate"]');

    Simulate.click(button);

    const modalComponent = findRenderedComponentWithType(resultTree, SearchToRelateModal);

    modalComponent.should.not.equal(null);

    modalComponent.props.onCloseButtonClick();
  });

  it('should close the search to relate modal when the close button is clicked', function test() {
    const resultTree = render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RelatedRecordBrowser
              config={config}
              perms={perms}
              recordType={recordType}
              csid={csid}
              relatedRecordType={relatedRecordType}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const button = this.container.querySelector('button[name="relate"]');

    Simulate.click(button);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        let modalNode;

        modalNode = document.querySelector('.ReactModal__Content--after-open');

        modalNode.should.not.equal(null);

        const modalComponent = findRenderedComponentWithType(resultTree, SearchToRelateModal);

        modalComponent.props.onCloseButtonClick();

        modalNode = document.querySelector('.ReactModal__Content--after-open');

        expect(modalNode).to.equal(null);

        unmountComponentAtNode(this.container);
        this.container.remove();
        resolve();
      }, 0);
    });
  });

  it('should close the search to relate modal when the cancel button is clicked', async function test() {
    const resultTree = render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RelatedRecordBrowser
              config={config}
              perms={perms}
              recordType={recordType}
              csid={csid}
              relatedRecordType={relatedRecordType}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const button = await asyncQuerySelector(this.container, 'button[name="relate"]');

    Simulate.click(button);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        let modalNode;

        modalNode = asyncQuerySelector(document, '.ReactModal__Content--after-open');

        modalNode.should.not.equal(null);

        const modalComponent = findRenderedComponentWithType(resultTree, SearchToRelateModal);

        modalComponent.props.onCancelButtonClick();

        modalNode = document.querySelector('.ReactModal__Content--after-open');

        expect(modalNode).to.equal(null);

        unmountComponentAtNode(this.container);
        this.container.remove();
        resolve();
      }, 0);
    });
  });

  it('should close the search to relate modal when relations have been created', async function test() {
    const resultTree = render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RelatedRecordBrowser
              config={config}
              perms={perms}
              recordType={recordType}
              csid={csid}
              relatedRecordType={relatedRecordType}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const button = await asyncQuerySelector(this.container, 'button[name="relate"]');

    Simulate.click(button);

    let modalNode;

    return new Promise((resolve) => {
      window.setTimeout(() => {
        modalNode = asyncQuerySelector(document, '.ReactModal__Content--after-open');

        modalNode.should.not.equal(null);

        const modalComponent = findRenderedComponentWithType(resultTree, SearchToRelateModal);

        modalComponent.props.onRelationsCreated();

        modalNode = document.querySelector('.ReactModal__Content--after-open');

        expect(modalNode).to.equal(null);

        unmountComponentAtNode(this.container);
        this.container.remove();
        resolve();
      }, 0);
    });
  });

  it('should replace history when the related record is unrelated in the related record panel', function test() {
    const location = {
      state: {
        foo: 'foo',
        bar: 'bar',
      },
    };

    let replacedLocation = null;

    const history = mockHistory({
      replace: (locationArg) => {
        replacedLocation = locationArg;
      },
    });

    const resultTree = render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RelatedRecordBrowser
              config={config}
              location={location}
              recordType={recordType}
              csid={csid}
              relatedRecordType={relatedRecordType}
              relatedCsid={relatedCsid}
              history={history}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const panel = findRenderedComponentWithType(resultTree, RelatedRecordPanel);

    panel.props.onUnrelated([
      { csid: '1111' },
      { csid: '1112' },
      { csid: relatedCsid },
      { csid: '1113' },
    ]);

    replacedLocation.should.deep.equal({
      pathname: `/record/${recordType}/${csid}/${relatedRecordType}`,
      state: location.state,
    });
  });

  it('should call deselect when a record is unrelated in the relation editor', function test() {
    let deselectedName = null;
    let deselectedCsid = null;

    const deselectItem = (nameArg, csidArg) => {
      deselectedName = nameArg;
      deselectedCsid = csidArg;
    };

    const resultTree = render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RelatedRecordBrowser
              config={config}
              recordType={recordType}
              csid={csid}
              relatedRecordType={relatedRecordType}
              relatedCsid={relatedCsid}
              deselectItem={deselectItem}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const relationEditor = findRenderedComponentWithType(resultTree, RelationEditor);

    relationEditor.props.onUnrelated({ csid }, { csid: relatedCsid });

    deselectedName.should.equal(`relatedRecordBrowser-${relatedRecordType}`);
    deselectedCsid.should.equal(relatedCsid);
  });

  it('should replace history when the relation editor is closed', function test() {
    const location = {
      state: {
        foo: 'foo',
        bar: 'bar',
      },
    };

    let replacedLocation = null;

    const history = mockHistory({
      replace: (locationArg) => {
        replacedLocation = locationArg;
      },
    });

    const resultTree = render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RelatedRecordBrowser
              config={config}
              location={location}
              recordType={recordType}
              csid={csid}
              relatedRecordType={relatedRecordType}
              relatedCsid={relatedCsid}
              history={history}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const relationEditor = findRenderedComponentWithType(resultTree, RelationEditor);

    relationEditor.props.onClose();

    replacedLocation.should.deep.equal({
      pathname: `/record/${recordType}/${csid}/${relatedRecordType}`,
      state: location.state,
    });
  });

  it('should call setPreferredRelatedCsid when the related csid is changed via props', function test() {
    const newRelatedCsid = 'aaaa';

    let setRecordType = null;
    let setCsid = '';

    const setPreferredRelatedCsid = (recordTypeArg, csidArg) => {
      setRecordType = recordTypeArg;
      setCsid = csidArg;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RelatedRecordBrowser
              config={config}
              recordType={recordType}
              csid={csid}
              relatedRecordType={relatedRecordType}
              relatedCsid={relatedCsid}
              setPreferredRelatedCsid={setPreferredRelatedCsid}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RelatedRecordBrowser
              config={config}
              recordType={recordType}
              csid={csid}
              relatedRecordType={relatedRecordType}
              relatedCsid={newRelatedCsid}
              setPreferredRelatedCsid={setPreferredRelatedCsid}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    setRecordType.should.equal(relatedRecordType);
    setCsid.should.equal(newRelatedCsid);
  });

  it('should call setPreferredRelatedCsid when the relation editor is closed', function test() {
    const location = {};
    const history = mockHistory();

    let setRecordType = null;
    let setCsid = '';

    const setPreferredRelatedCsid = (recordTypeArg, csidArg) => {
      setRecordType = recordTypeArg;
      setCsid = csidArg;
    };

    const resultTree = render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RelatedRecordBrowser
              config={config}
              location={location}
              recordType={recordType}
              csid={csid}
              relatedRecordType={relatedRecordType}
              relatedCsid={relatedCsid}
              history={history}
              setPreferredRelatedCsid={setPreferredRelatedCsid}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const relationEditor = findRenderedComponentWithType(resultTree, RelationEditor);

    relationEditor.props.onClose();

    setRecordType.should.equal(relatedRecordType);
    expect(setCsid).to.equal(undefined);
  });
});
