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
import { configureCSpace } from '../../../../src/actions/cspace';
import createTestContainer from '../../../helpers/createTestContainer';
import ConfigProvider from '../../../../src/components/config/ConfigProvider';
import InvocationModal from '../../../../src/components/invocable/InvocationModal';
import InvocationModalContainer from '../../../../src/containers/invocable/InvocationModalContainer';
import RecordEditorContainer from '../../../../src/containers/record/RecordEditorContainer';
import SearchPanelContainer from '../../../../src/containers/search/SearchPanelContainer';
import ReportPage from '../../../../src/components/pages/ReportPage';
import { OP_CONTAIN } from '../../../../src/constants/searchOperators';

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
        default: {
          template: <div />,
        },
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
      serviceConfig: {
        servicePath: 'reports',
      },
    },
  },
};

const store = mockStore({
  authority: Immutable.Map(),
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
  report: {
    data: 'RUL',
  },
});

const context = {
  config,
  store,
};

describe('ReportPage', function suite() {
  before(() =>
    store.dispatch(configureCSpace())
      .then(() => store.clearActions())
  );

  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    const match = {
      params: {},
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <Router>
              <ReportPage match={match} />
            </Router>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should call setToolTab when mounted', function test() {
    const match = {
      params: {},
    };

    let toolTabRecordType = null;

    const setToolTab = (recordTypeArg) => {
      toolTabRecordType = recordTypeArg;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <Router>
              <ReportPage match={match} setToolTab={setToolTab} />
            </Router>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    toolTabRecordType.should.equal('report');
  });

  it('should render a record editor when a csid param exists in the match', function test() {
    const csid = '1234';

    const match = {
      params: {
        csid,
      },
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ReportPage match={match} />, context);

    const result = shallowRenderer.getRenderOutput();
    const recordEditor = findWithType(result, RecordEditorContainer);

    recordEditor.should.not.equal(null);
    recordEditor.props.csid.should.equal(csid);
  });

  it('should replace history with a new location when an item is clicked in the search panel', function test() {
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
      <ReportPage
        history={history}
        match={match}
        perms={perms}
      />, context);

    const result = shallowRenderer.getRenderOutput();
    const searchPanel = findWithType(result, SearchPanelContainer);

    const itemCsid = 'abcd';

    searchPanel.should.not.equal(null);
    searchPanel.props.onItemClick(Immutable.Map({ csid: itemCsid })).should.equal(false);

    replacedLocation.should.equal(`/tool/report/${itemCsid}`);
  });

  it('should not replace history when an item is clicked in the search panel if the user does not have read permission on reports', function test() {
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
      <ReportPage
        history={history}
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

  it('should update the search descriptor when the search bar value is changed', function test() {
    const match = {
      params: {},
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ReportPage
        match={match}
        perms={perms}
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

        searchPanel.should.not.equal(null);

        searchPanel.props.searchDescriptor.should.equal(Immutable.fromJS({
          recordType: 'report',
          searchQuery: {
            as: {
              value: 'searchval',
              op: OP_CONTAIN,
              path: 'ns2:reports_common/name',
            },
            size: 20,
            p: 0,
          },
        }));

        resolve();
      }, 600);
    });
  });

  it('should only update the search descriptor once when the search bar value changes twice within the filter delay', function test() {
    const match = {
      params: {},
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ReportPage
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
          recordType: 'report',
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
          recordType: 'report',
          searchQuery: {
            p: 0,
            size: 20,
            as: {
              value: 'another searchval',
              op: OP_CONTAIN,
              path: 'ns2:reports_common/name',
            },
          },
        }));

        resolve();
      }, 400);
    }));
  });

  it('should update the search descriptor immediately when the search bar value is blanked', function test() {
    const match = {
      params: {},
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ReportPage
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
              value: 'searchval',
              op: OP_CONTAIN,
              path: 'ns2:reports_common/name',
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
            size: 20,
            p: 0,
          },
        }));

        resolve();
      }, 600);
    });
  });

  it('should call openModal when the run button is clicked in the record editor', function test() {
    const csid = '1234';

    const match = {
      params: {
        csid,
      },
    };

    let openedModalName = null;

    const openModal = (modalNameArg) => {
      openedModalName = modalNameArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ReportPage match={match} openModal={openModal} />, context);

    const result = shallowRenderer.getRenderOutput();
    const recordEditor = findWithType(result, RecordEditorContainer);

    recordEditor.should.not.equal(null);
    recordEditor.props.onRunButtonClick();

    openedModalName.should.equal(InvocationModal.modalName);
  });

  it('should call openReport followed by closeModal when the invoke button is clicked in the invocation modal', function test() {
    const csid = '1234';

    const match = {
      params: {
        csid,
      },
    };

    let openedConfig = null;
    let openedReportMetadata = null;
    let openedInvocationDescriptor = null;

    const openReport = (configArg, reportMetadataArg, invocationDescriptorArg) => {
      openedConfig = configArg;
      openedReportMetadata = reportMetadataArg;
      openedInvocationDescriptor = invocationDescriptorArg;

      return Promise.resolve();
    };

    let closeModalCalled;

    const closeModal = () => {
      closeModalCalled = true;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ReportPage
        match={match}
        openModalName={InvocationModal.modalName}
        openReport={openReport}
        closeModal={closeModal}
      />, context);

    const result = shallowRenderer.getRenderOutput();
    const modal = findWithType(result, InvocationModalContainer);

    modal.should.not.equal(null);

    const reportMetadata = Immutable.fromJS({
      document: {
        'ns2:reports_common': {
          filename: 'foo',
        },
      },
    });

    const invocationDescriptor = {
      mode: 'single',
    };

    modal.props.onInvokeButtonClick(reportMetadata, invocationDescriptor);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        openedConfig.should.equal(config);
        openedReportMetadata.should.equal(reportMetadata);
        openedInvocationDescriptor.should.equal(invocationDescriptor);

        closeModalCalled.should.equal(true);

        resolve();
      }, 0);
    });
  });

  it('should call closeModal when the close button or the cancel button is clicked in the invocation modal', function test() {
    const csid = '1234';

    const match = {
      params: {
        csid,
      },
    };

    let closeModalCalled;

    const closeModal = () => {
      closeModalCalled = true;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ReportPage
        match={match}
        openModalName={InvocationModal.modalName}
        closeModal={closeModal}
      />, context);

    const result = shallowRenderer.getRenderOutput();
    const modal = findWithType(result, InvocationModalContainer);

    modal.should.not.equal(null);

    const event = {
      stopPropagation: () => undefined,
    };

    modal.props.onCloseButtonClick(event);

    closeModalCalled.should.equal(true);

    closeModalCalled = false;

    modal.props.onCancelButtonClick(event);

    closeModalCalled.should.equal(true);
  });
});
