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
import ReportingPage from '../../../../src/components/pages/ReportingPage';
import { OP_AND, OP_EQ } from '../../../../src/constants/searchOperators';

const expect = chai.expect;

chai.use(chaiImmutable);
chai.should();

const mockStore = configureMockStore([thunk]);

const config = {
  listTypes: {
    common: {
      listNodeName: 'ns2:abstract-common-list',
      itemNodeName: 'list-item',
    },
  },
  recordTypes: {
    report: {
      forms: {
        default: <div />,
      },
      fields: {},
      messages: {
        record: {
          collectionName: {
            id: 'record.report.collectionName',
            defaultMessage: 'Reports',
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
  report: {
    data: 'RUL',
  },
});

const context = {
  config,
  store,
};


describe('ReportingPage', function suite() {
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
              <ReportingPage location={location} match={match} />
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
      <ReportingPage location={location} match={match} />, context);

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
      <ReportingPage
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

    replacedLocation.should.equal(`/reporting/report/${itemCsid}`);
  });

  it('should not render any reports if the user has no permission to run reports', function test() {
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
      <ReportingPage
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

  it('should only initially filter by whether the report allows parameters', function test() {
    const location = {
      search: '',
    };

    const match = {
      params: {},
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ReportingPage
        location={location}
        match={match}
        perms={null}
      />, context);

    const result = shallowRenderer.getRenderOutput();
    const searchPanel = findWithType(result, SearchPanelContainer);

    searchPanel.should.not.equal(null);

    searchPanel.props.searchDescriptor.should.equal(Immutable.fromJS({
      recordType: 'report',
      searchQuery: {
        as: {
          value: 1,
          op: OP_EQ,
          path: 'ns2:reports_common/supportsParams',
        },
        size: 20,
      },
    }));
  });

  it('should update the search descriptor when the search bar value is changed', function test() {
    const location = {
      search: '',
    };

    const match = {
      params: {},
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ReportingPage
        location={location}
        match={match}
        perms={perms}
      />, context);

    let result;
    let searchPanel;

    result = shallowRenderer.getRenderOutput();
    searchPanel = findWithType(result, SearchPanelContainer);

    searchPanel.should.not.equal(null);

    const searchBar = searchPanel.props.renderTableHeader();

    // Check that initially the only filter is on supportsParams
    searchPanel.props.searchDescriptor.should.equal(Immutable.fromJS({
      recordType: 'report',
      searchQuery: {
        as: {
          value: 1,
          op: OP_EQ,
          path: 'ns2:reports_common/supportsParams',
        },
        size: 20,
      },
    }));

    searchBar.props.onChange('searchval');

    return new Promise((resolve) => {
      window.setTimeout(() => {
        result = shallowRenderer.getRenderOutput();
        searchPanel = findWithType(result, SearchPanelContainer);

        searchPanel.should.not.equal(null);

        const newDescriptor = Immutable.fromJS({
          recordType: 'report',
          searchQuery: {
            as: {
              value: {
                baseReportFilter: {
                  value: 1,
                  op: 'eq',
                  path: 'ns2:reports_common/supportsParams',
                },
                valueFilter: {
                  value: 'searchval',
                  op: 'cont',
                  path: 'ns2:reports_common/name',
                },
              },
              op: OP_AND,
            },
            size: 20,
            p: 0,
          },
        });

        newDescriptor.should.equal(searchPanel.props.searchDescriptor);
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
      <ReportingPage
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

    // Check that initially the only filter is on supportsParams
    searchPanel.props.searchDescriptor.should.equal(Immutable.fromJS({
      recordType: 'report',
      searchQuery: {
        as: {
          value: 1,
          op: OP_EQ,
          path: 'ns2:reports_common/supportsParams',
        },
        size: 20,
      },
    }));

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
          recordType: 'report',
          searchQuery: {
            as: {
              value: 1,
              op: OP_EQ,
              path: 'ns2:reports_common/supportsParams',
            },
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
          recordType: 'report',
          searchQuery: {
            as: {
              value: {
                baseReportFilter: {
                  value: 1,
                  op: 'eq',
                  path: 'ns2:reports_common/supportsParams',
                },
                valueFilter: {
                  value: 'another searchval',
                  op: 'cont',
                  path: 'ns2:reports_common/name',
                },
              },
              op: OP_AND,
            },
            size: 20,
            p: 0,
          },
        }));

        resolve();
      }, 400);
    }));
  });

  it('should only filter by the supportsParams filter when the clear button is clicked', function test() {
    const location = {
      search: '',
    };

    const match = {
      params: {},
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ReportingPage
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
          recordType: 'report',
          searchQuery: {
            as: {
              value: {
                baseReportFilter: {
                  value: 1,
                  op: 'eq',
                  path: 'ns2:reports_common/supportsParams',
                },
                valueFilter: {
                  value: 'searchval',
                  op: 'cont',
                  path: 'ns2:reports_common/name',
                },
              },
              op: OP_AND,
            },
            size: 20,
            p: 0,
          },
        }));

        searchBar.props.onChange('');

        result = shallowRenderer.getRenderOutput();
        searchPanel = findWithType(result, SearchPanelContainer);

        searchPanel.props.searchDescriptor.should.equal(Immutable.fromJS({
          recordType: 'report',
          searchQuery: {
            as: {
              value: 1,
              op: OP_EQ,
              path: 'ns2:reports_common/supportsParams',
            },
            size: 20,
            p: 0,
          },
        }));

        resolve();
      }, 600);
    });
  });
});
