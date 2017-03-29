/* global window */

import React from 'react';
import { render } from 'react-dom';
import { findRenderedComponentWithType, Simulate } from 'react-addons-test-utils';
import { IntlProvider } from 'react-intl';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider as StoreProvider } from 'react-redux';
import Immutable from 'immutable';
import moxios from 'moxios';
import createTestContainer from '../../../helpers/createTestContainer';
import mockRouter from '../../../helpers/mockRouter';
import { configureCSpace } from '../../../../src/actions/cspace';
import RelationEditor from '../../../../src/components/record/RelationEditor';
import RelatedRecordPanel from '../../../../src/components/record/RelatedRecordPanel';
import RelatedRecordBrowser from '../../../../src/components/record/RelatedRecordBrowser';

chai.should();

const mockStore = configureMockStore([thunk]);

const csid = '1234';
const recordType = 'collectionobject';
const relatedCsid = '5678';
const relatedRecordType = 'group';

const store = mockStore({
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
  relation: Immutable.fromJS({
    find: {
      [csid]: {
        [relatedCsid]: {
          affects: {
            result: {
              'ns2:relations-common-list': {
                totalItems: '1',
              },
            },
          },
        },
      },
    },
  }),
  search: Immutable.Map(),
  searchToRelate: Immutable.Map(),
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
      },
      forms: {
        default: <div />,
      },
      messages: {
        record: {
          collectionName: {
            id: 'record.group.collectionName',
            defaultMessage: 'Groups',
          },
        },
      },
    },
  },
};

describe('RelatedRecordBrowser', function suite() {
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
          <RelatedRecordBrowser />
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render a relation editor if a related csid is provided', function test() {
    const resultTree = render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RelatedRecordBrowser
            config={config}
            recordType={recordType}
            csid={csid}
            relatedRecordType={relatedRecordType}
            relatedCsid={relatedCsid}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    const component = findRenderedComponentWithType(resultTree, RelationEditor);

    component.should.not.equal(null);
  });

  it('should replace history when the clone button is clicked', function test() {
    let replacedLocation = null;

    const router = mockRouter({
      replace: (locationArg) => {
        replacedLocation = locationArg;
      },
    });

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RelatedRecordBrowser
            config={config}
            recordType={recordType}
            csid={csid}
            relatedRecordType={relatedRecordType}
            relatedCsid={relatedCsid}
            router={router}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    const button = this.container.querySelector('button[name=clone]');

    Simulate.click(button);

    replacedLocation.should.deep.equal({
      pathname: `/record/${recordType}/${csid}/${relatedRecordType}/new`,
      query: {
        clone: relatedCsid,
      },
    });
  });

  it('should replace history when the create new button is clicked', function test() {
    let replacedLocation = null;

    const router = mockRouter({
      replace: (locationArg) => {
        replacedLocation = locationArg;
      },
    });

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RelatedRecordBrowser
            config={config}
            recordType={recordType}
            csid={csid}
            relatedRecordType={relatedRecordType}
            router={router}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    const button = this.container.querySelector('button[name=create]');

    Simulate.click(button);

    replacedLocation.should.equal(`/record/${recordType}/${csid}/${relatedRecordType}/new`);
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
          <RelatedRecordBrowser
            config={config}
            recordType={recordType}
            csid={csid}
            relatedRecordType={relatedRecordType}
            onShowRelated={handleShowRelated}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    const component = findRenderedComponentWithType(resultTree, RelatedRecordPanel);

    component.props.onItemClick(Immutable.Map({ csid: relatedCsid }));

    showRelatedRecordType.should.equal(relatedRecordType);
    showRelatedCsid.should.equal(relatedCsid);
  });

  it('should replace history when a new related record is created', function test() {
    let replacedLocation = null;

    const router = mockRouter({
      replace: (locationArg) => {
        replacedLocation = locationArg;
      },
    });

    const newCsid = '9999';

    moxios.stubRequest('/cspace-services/groups', {
      status: 201,
      headers: {
        location: `groups/${newCsid}`,
      },
    });

    moxios.stubRequest(`/cspace-services/groups/${newCsid}?wf_deleted=false`, {
      status: 200,
      headers: {
        data: {},
      },
    });

    moxios.stubRequest('/cspace-services/relations', {
      status: 201,
      headers: {
        location: 'relations/somecsid',
      },
    });

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RelatedRecordBrowser
            config={config}
            recordType={recordType}
            csid={csid}
            relatedRecordType={relatedRecordType}
            relatedCsid=""
            router={router}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    const saveButton = this.container.querySelector('button[name=save]');

    Simulate.click(saveButton);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        replacedLocation.should.equal(`/record/${recordType}/${csid}/${relatedRecordType}/${newCsid}`);

        resolve();
      }, 10);
    });
  });
});
