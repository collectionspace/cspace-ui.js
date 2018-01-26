/* global window */

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
import chaiImmutable from 'chai-immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import ConfigProvider from '../../../../src/components/config/ConfigProvider';
import RecordEditorContainer from '../../../../src/containers/record/RecordEditorContainer';
import SearchPanelContainer from '../../../../src/containers/search/SearchPanelContainer';
import TermsPage from '../../../../src/components/pages/TermsPage';
import { OP_CONTAIN } from '../../../../src/constants/searchOperators';

const expect = chai.expect;

chai.use(chaiImmutable);
chai.should();

const mockStore = configureMockStore([thunk]);

const config = {
  listTypes: {
    common: {
      listNodeName: 'ns3:accounts-common-list',
      itemNodeName: 'account-list-item',
    },
  },
  recordTypes: {
    vocabulary: {
      fields: {},
      forms: {
        default: {
          template: <div />,
        },
      },
      messages: {
        record: {
          collectionName: {
            id: 'record.vocabulary.collectionName',
            defaultMessage: 'Term Lists',
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
  vocabulary: {
    data: 'CRUDL',
  },
});

const context = {
  config,
  store,
};

describe('TermsPage', function suite() {
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
              <TermsPage location={location} match={match} />
            </Router>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

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
              <TermsPage location={location} match={match} setAdminTab={setAdminTab} />
            </Router>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    setTabName.should.equal('vocabulary');
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
      <TermsPage location={location} match={match} />, context);

    const result = shallowRenderer.getRenderOutput();
    const recordEditor = findWithType(result, RecordEditorContainer);

    recordEditor.should.not.equal(null);
    recordEditor.props.csid.should.equal(csid);
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
      <TermsPage
        history={history}
        location={location}
        match={match}
        perms={perms}
      />, context);

    const result = shallowRenderer.getRenderOutput();
    const searchPanel = findWithType(result, SearchPanelContainer);

    const itemCsid = 'abcd';

    searchPanel.should.not.equal(null);
    searchPanel.props.onItemClick(Immutable.Map({ csid: itemCsid })).should.equal(false);

    replacedLocation.should.equal(`/admin/vocabulary/${itemCsid}`);
  });

  it('should not replace history when an item is clicked in the search panel but there are not read permissions on vocabularies', function test() {
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
      <TermsPage
        history={history}
        location={location}
        match={match}
        perms={null}
      />, context);

    const result = shallowRenderer.getRenderOutput();
    const searchPanel = findWithType(result, SearchPanelContainer);

    const itemCsid = 'abcd';

    searchPanel.should.not.equal(null);
    searchPanel.props.onItemClick(Immutable.Map({ csid: itemCsid })).should.equal(false);

    expect(replacedLocation).to.equal(null);
  });

  it('should update the search descriptor when the search bar value changes', function test() {
    const location = {
      search: '',
    };

    const match = {
      params: {},
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <TermsPage
        location={location}
        match={match}
        perms={null}
      />, context);

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
          recordType: 'vocabulary',
          searchQuery: {
            p: 0,
            size: 20,
            as: {
              value: 'searchval',
              op: OP_CONTAIN,
              path: 'ns2:vocabularies_common/displayName',
            },
          },
        }));

        resolve();
      }, 600);
    });
  });

  it('should only update the search descriptor once when the search bar value changes twice within the filter delay', function test() {
    const location = {
      search: '',
    };

    const match = {
      params: {},
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <TermsPage
        location={location}
        match={match}
        perms={null}
      />, context);

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
          recordType: 'vocabulary',
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
          recordType: 'vocabulary',
          searchQuery: {
            p: 0,
            size: 20,
            as: {
              value: 'another searchval',
              op: OP_CONTAIN,
              path: 'ns2:vocabularies_common/displayName',
            },
          },
        }));

        resolve();
      }, 400);
    }));
  });

  it('should update the search descriptor immediately when the search bar value is blanked', function test() {
    const location = {
      search: '',
    };

    const match = {
      params: {},
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <TermsPage
        location={location}
        match={match}
        perms={null}
      />, context);

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
          recordType: 'vocabulary',
          searchQuery: {
            p: 0,
            size: 20,
            as: {
              value: 'searchval',
              op: OP_CONTAIN,
              path: 'ns2:vocabularies_common/displayName',
            },
          },
        }));

        searchBar.props.onChange('');

        result = shallowRenderer.getRenderOutput();
        searchPanel = findWithType(result, SearchPanelContainer);

        searchPanel.props.searchDescriptor.should.equal(Immutable.fromJS({
          recordType: 'vocabulary',
          searchQuery: {
            size: 20,
            p: 0,
          },
        }));

        resolve();
      }, 600);
    });
  });
});
