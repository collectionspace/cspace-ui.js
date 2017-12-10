import React from 'react';
import { render } from 'react-dom';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import { MemoryRouter as Router } from 'react-router';
import { Provider as StoreProvider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import ConfigProvider from '../../../../src/components/config/ConfigProvider';
import RolesButtonBar from '../../../../src/components/admin/RolesButtonBar';
import RecordEditorContainer from '../../../../src/containers/record/RecordEditorContainer';
import SearchPanelContainer from '../../../../src/containers/search/SearchPanelContainer';
import RolesPage from '../../../../src/components/pages/RolesPage';

const expect = chai.expect;

chai.should();

const mockStore = configureMockStore([thunk]);

const config = {
  listTypes: {
    role: {
      listNodeName: 'ns2:roles_list',
      itemNodeName: 'role',
    },
  },
  recordTypes: {
    authrole: {
      fields: {},
      forms: {
        default: {
          template: <div />,
        },
      },
      messages: {
        record: {
          collectionName: {
            id: 'record.authrole.collectionName',
            defaultMessage: 'Roles',
          },
        },
      },
    },
  },
};

const store = mockStore({
  notification: Immutable.Map(),
  prefs: Immutable.Map(),
  record: Immutable.fromJS({
    1234: {

    },
  }),
  search: Immutable.Map(),
  user: Immutable.Map(),
});

const perms = Immutable.fromJS({
  authrole: {
    data: 'CRUDL',
  },
});

const context = {
  config,
  store,
};

describe('RolesPage', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    const location = {
      search: '',
    };

    const match = {
      params: {},
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <Router>
              <RolesPage location={location} match={match} />
            </Router>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render a record editor when a csid param exists in the match', function test() {
    const location = {
      search: '',
    };

    const csid = '1234';

    const match = {
      params: {
        csid,
      },
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RolesPage location={location} match={match} />, context);

    const result = shallowRenderer.getRenderOutput();
    const recordEditor = findWithType(result, RecordEditorContainer);

    recordEditor.should.not.equal(null);
    recordEditor.props.csid.should.equal(csid);
  });

  it('should replace history with a new location to clone a record', function test() {
    const location = {
      search: '',
    };

    const csid = '1234';

    const match = {
      params: {
        csid,
      },
    };

    let replacedLocation = null;

    const history = {
      replace: (locationArg) => {
        replacedLocation = locationArg;
      },
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RolesPage
        history={history}
        location={location}
        match={match}
      />, context);

    const result = shallowRenderer.getRenderOutput();
    const recordEditor = findWithType(result, RecordEditorContainer);

    recordEditor.should.not.equal(null);
    recordEditor.props.clone();

    replacedLocation.should.deep.equal({
      pathname: '/admin/authrole/new',
      search: `?clone=${csid}`,
    });
  });

  it('should replace history with a new location when the create new button is clicked', function test() {
    const location = {
      search: '',
    };

    const match = {
      params: {},
    };

    let replacedLocation = null;

    const history = {
      replace: (locationArg) => {
        replacedLocation = locationArg;
      },
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RolesPage
        history={history}
        location={location}
        match={match}
      />, context);

    const result = shallowRenderer.getRenderOutput();
    const buttonBar = findWithType(result, RolesButtonBar);

    buttonBar.should.not.equal(null);
    buttonBar.props.onCreateButtonClick();

    replacedLocation.should.equal('/admin/authrole/new');
  });

  it('should replace history with a new location when a record is created', function test() {
    const location = {
      search: '',
    };

    const match = {
      params: {
        csid: 'new',
      },
    };

    let replacedLocation = null;

    const history = {
      replace: (locationArg) => {
        replacedLocation = locationArg;
      },
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RolesPage
        history={history}
        location={location}
        match={match}
      />, context);

    const result = shallowRenderer.getRenderOutput();
    const recordEditor = findWithType(result, RecordEditorContainer);

    const newRecordCsid = 'abcd';

    recordEditor.should.not.equal(null);
    recordEditor.props.onRecordCreated(newRecordCsid);

    replacedLocation.should.equal(`/admin/authrole/${newRecordCsid}`);
  });

  it('should replace history with a new location when a role deletion completes', function test() {
    const location = {
      search: '',
    };

    const match = {
      params: {
        csid: '1234',
      },
    };

    let replacedLocation = null;

    const history = {
      replace: (locationArg) => {
        replacedLocation = locationArg;
      },
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RolesPage
        history={history}
        location={location}
        match={match}
      />, context);

    const result = shallowRenderer.getRenderOutput();
    const recordEditor = findWithType(result, RecordEditorContainer);

    recordEditor.should.not.equal(null);
    recordEditor.props.onRecordDeleted();

    replacedLocation.should.equal('/admin/authrole');
  });

  it('should replace history with a new location when an item is clicked in the search panel', function test() {
    const location = {
      search: '',
    };

    const match = {
      params: {},
    };

    let replacedLocation = null;

    const history = {
      replace: (locationArg) => {
        replacedLocation = locationArg;
      },
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RolesPage
        history={history}
        location={location}
        match={match}
        perms={perms}
      />, context);

    const result = shallowRenderer.getRenderOutput();
    const searchPanel = findWithType(result, SearchPanelContainer);

    const itemCsid = 'abcd';

    searchPanel.should.not.equal(null);
    searchPanel.props.onItemClick(Immutable.Map({ '@csid': itemCsid })).should.equal(false);

    replacedLocation.should.equal(`/admin/authrole/${itemCsid}`);
  });

  it('should not replace history when an item is clicked in the search panel but there are not read permissions on roles', function test() {
    const location = {
      search: '',
    };

    const match = {
      params: {},
    };

    let replacedLocation = null;

    const history = {
      replace: (locationArg) => {
        replacedLocation = locationArg;
      },
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RolesPage
        history={history}
        location={location}
        match={match}
        perms={null}
      />, context);

    const result = shallowRenderer.getRenderOutput();
    const searchPanel = findWithType(result, SearchPanelContainer);

    const itemCsid = 'abcd';

    searchPanel.should.not.equal(null);
    searchPanel.props.onItemClick(Immutable.Map({ '@csid': itemCsid })).should.equal(false);

    expect(replacedLocation).to.equal(null);
  });
});
