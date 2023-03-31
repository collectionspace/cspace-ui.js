/* global window */

import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import { MemoryRouter as Router } from 'react-router';
import { Provider as StoreProvider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import ConfigProvider from '../../../../src/components/config/ConfigProvider';
import AdminTabButtonBar from '../../../../src/components/admin/AdminTabButtonBar';
import RecordEditorContainer from '../../../../src/containers/record/RecordEditorContainer';
import SearchPanelContainer from '../../../../src/containers/search/SearchPanelContainer';
import AuthRolePage from '../../../../src/components/pages/AuthRolePage';

const { expect } = chai;

chai.use(chaiImmutable);
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
    1234: {},
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

describe('AuthRolePage', () => {
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
              <AuthRolePage location={location} match={match} />
            </Router>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should call setAdminTab when mounted', function test() {
    let setTabName = null;

    const setAdminTab = (tabNameArg) => {
      setTabName = tabNameArg;
    };

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
              <AuthRolePage location={location} match={match} setAdminTab={setAdminTab} />
            </Router>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    setTabName.should.equal('authrole');
  });

  it('should render a record editor when a csid param exists in the match', () => {
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
      <AuthRolePage location={location} match={match} />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const recordEditor = findWithType(result, RecordEditorContainer);

    recordEditor.should.not.equal(null);
    recordEditor.props.csid.should.equal(csid);
  });

  it('should replace history with a new location to clone a record', () => {
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
      <AuthRolePage
        history={history}
        location={location}
        match={match}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const recordEditor = findWithType(result, RecordEditorContainer);

    recordEditor.should.not.equal(null);
    recordEditor.props.clone();

    replacedLocation.should.deep.equal({
      pathname: '/admin/authrole/new',
      search: `?clone=${csid}`,
    });
  });

  it('should replace history with a new location when the create new button is clicked', () => {
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
      <AuthRolePage
        history={history}
        location={location}
        match={match}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const buttonBar = findWithType(result, AdminTabButtonBar);

    buttonBar.should.not.equal(null);
    buttonBar.props.onCreateButtonClick();

    replacedLocation.should.equal('/admin/authrole/new');
  });

  it('should replace history with a new location when a record is created', () => {
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
      <AuthRolePage
        history={history}
        location={location}
        match={match}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const recordEditor = findWithType(result, RecordEditorContainer);

    const newRecordCsid = 'abcd';

    recordEditor.should.not.equal(null);
    recordEditor.props.onRecordCreated(newRecordCsid);

    replacedLocation.should.equal(`/admin/authrole/${newRecordCsid}`);
  });

  it('should replace history with a new location when a role deletion completes', () => {
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
      <AuthRolePage
        history={history}
        location={location}
        match={match}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const recordEditor = findWithType(result, RecordEditorContainer);

    recordEditor.should.not.equal(null);
    recordEditor.props.onRecordDeleted();

    replacedLocation.should.equal('/admin/authrole');
  });

  it('should replace history with a new location when an item is clicked in the search panel', () => {
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
      <AuthRolePage
        history={history}
        location={location}
        match={match}
        perms={perms}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const searchPanel = findWithType(result, SearchPanelContainer);

    const itemCsid = 'abcd';

    searchPanel.should.not.equal(null);
    searchPanel.props.onItemClick(Immutable.Map({ '@csid': itemCsid })).should.equal(false);

    replacedLocation.should.equal(`/admin/authrole/${itemCsid}`);
  });

  it('should not replace history when an item is clicked in the search panel but there are not read permissions on roles', () => {
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
      <AuthRolePage
        history={history}
        location={location}
        match={match}
        perms={null}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const searchPanel = findWithType(result, SearchPanelContainer);

    const itemCsid = 'abcd';

    searchPanel.should.not.equal(null);
    searchPanel.props.onItemClick(Immutable.Map({ '@csid': itemCsid })).should.equal(false);

    expect(replacedLocation).to.equal(null);
  });

  it('should update the search descriptor\'s sequence ID when a record is saved in the record editor', () => {
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
      <AuthRolePage location={location} match={match} />, context,
    );

    let result;

    result = shallowRenderer.getRenderOutput();

    const recordEditor = findWithType(result, RecordEditorContainer);

    recordEditor.props.onRecordSaved();

    return new Promise((resolve) => {
      window.setTimeout(() => {
        result = shallowRenderer.getRenderOutput();

        const searchPanel = findWithType(result, SearchPanelContainer);
        const seqId = searchPanel.props.searchDescriptor.get('seqId');

        Date.parse(seqId).should.be.closeTo(Date.now(), 500);

        resolve();
      }, 0);
    });
  });

  it('should update the search descriptor when the search bar value changes', () => {
    const location = {
      search: '',
    };

    const match = {
      params: {},
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <AuthRolePage
        location={location}
        match={match}
        perms={null}
      />, context,
    );

    let result;
    let searchPanel;

    result = shallowRenderer.getRenderOutput();
    searchPanel = findWithType(result, SearchPanelContainer);

    searchPanel.should.not.equal(null);

    const searchBar = searchPanel.props.renderTableHeader();

    searchBar.props.onChange('searchval');

    return new Promise((resolve) => {
      window.setTimeout(() => {
        result = shallowRenderer.getRenderOutput();
        searchPanel = findWithType(result, SearchPanelContainer);

        searchPanel.props.searchDescriptor.should.equal(Immutable.fromJS({
          recordType: 'authrole',
          searchQuery: {
            dn: 'searchval',
            p: 0,
            size: 20,
          },
        }));

        resolve();
      }, 600);
    });
  });

  it('should only update the search descriptor once when the search bar value changes twice within the filter delay', () => {
    const location = {
      search: '',
    };

    const match = {
      params: {},
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <AuthRolePage
        location={location}
        match={match}
        perms={null}
      />, context,
    );

    let result;
    let searchPanel;

    result = shallowRenderer.getRenderOutput();
    searchPanel = findWithType(result, SearchPanelContainer);

    searchPanel.should.not.equal(null);

    const searchBar = searchPanel.props.renderTableHeader();

    searchBar.props.onChange('searchval');

    return new Promise((resolve) => {
      window.setTimeout(() => {
        searchBar.props.onChange('another searchval');

        resolve();
      }, 200);
    })
      .then(() => new Promise((resolve) => {
        window.setTimeout(() => {
          result = shallowRenderer.getRenderOutput();
          searchPanel = findWithType(result, SearchPanelContainer);

          searchPanel.props.searchDescriptor.should.equal(Immutable.fromJS({
            recordType: 'authrole',
            searchQuery: {
              size: 20,
            },
          }));

          resolve();
        }, 400);
      }))
      .then(() => new Promise((resolve) => {
        window.setTimeout(() => {
          result = shallowRenderer.getRenderOutput();
          searchPanel = findWithType(result, SearchPanelContainer);

          searchPanel.props.searchDescriptor.should.equal(Immutable.fromJS({
            recordType: 'authrole',
            searchQuery: {
              dn: 'another searchval',
              p: 0,
              size: 20,
            },
          }));

          resolve();
        }, 400);
      }));
  });

  it('should update the search descriptor immediately when the search bar value is blanked', () => {
    const location = {
      search: '',
    };

    const match = {
      params: {},
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <AuthRolePage
        location={location}
        match={match}
        perms={null}
      />, context,
    );

    let result;
    let searchPanel;

    result = shallowRenderer.getRenderOutput();
    searchPanel = findWithType(result, SearchPanelContainer);

    searchPanel.should.not.equal(null);

    const searchBar = searchPanel.props.renderTableHeader();

    searchBar.props.onChange('searchval');

    return new Promise((resolve) => {
      window.setTimeout(() => {
        result = shallowRenderer.getRenderOutput();
        searchPanel = findWithType(result, SearchPanelContainer);

        searchPanel.props.searchDescriptor.should.equal(Immutable.fromJS({
          recordType: 'authrole',
          searchQuery: {
            dn: 'searchval',
            p: 0,
            size: 20,
          },
        }));

        searchBar.props.onChange('');

        result = shallowRenderer.getRenderOutput();
        searchPanel = findWithType(result, SearchPanelContainer);

        searchPanel.props.searchDescriptor.should.equal(Immutable.fromJS({
          recordType: 'authrole',
          searchQuery: {
            p: 0,
            size: 20,
          },
        }));

        resolve();
      }, 600);
    });
  });
});
