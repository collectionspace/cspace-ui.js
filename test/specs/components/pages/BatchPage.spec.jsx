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
import { configureCSpace } from '../../../../src/actions/cspace';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import ConfigProvider from '../../../../src/components/config/ConfigProvider';
import InvocationModalContainer from '../../../../src/containers/invocable/InvocationModalContainer';
import RecordEditorContainer from '../../../../src/containers/record/RecordEditorContainer';
import SearchPanelContainer from '../../../../src/containers/search/SearchPanelContainer';
import BatchPage from '../../../../src/components/pages/BatchPage';
import { MODAL_INVOCATION } from '../../../../src/constants/modalNames';
import { OP_CONTAIN } from '../../../../src/constants/searchOperators';

const { expect } = chai;

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
    batch: {
      forms: {
        default: {
          template: <div />,
        },
      },
      fields: {},
      messages: {
        record: {
          collectionName: {
            id: 'record.batch.collectionName',
            defaultMessage: 'Batch Jobs',
          },
        },
      },
      serviceConfig: {
        servicePath: 'batch',
      },
    },
    collectionobject: {
      name: 'collectionobject',
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
        objectName: 'CollectionObject',
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
  batch: {
    data: 'CRUL',
  },
  batchinvocation: {
    data: 'CRUD',
  },
});

const context = {
  config,
  store,
};

describe('BatchPage', () => {
  before(() => store.dispatch(configureCSpace())
    .then(() => store.clearActions()));

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
              <BatchPage match={match} />
            </Router>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

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
              <BatchPage match={match} setToolTab={setToolTab} />
            </Router>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    toolTabRecordType.should.equal('batch');
  });

  it('should render a record editor when a csid param exists in the match', () => {
    const csid = '1234';

    const match = {
      params: {
        csid,
      },
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BatchPage match={match} />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const recordEditor = findWithType(result, RecordEditorContainer);

    recordEditor.should.not.equal(null);
    recordEditor.props.csid.should.equal(csid);
  });

  it('should replace history with a new location when an item is clicked in the search panel', () => {
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
      <BatchPage
        history={history}
        match={match}
        perms={perms}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const searchPanel = findWithType(result, SearchPanelContainer);

    const itemCsid = 'abcd';

    searchPanel.should.not.equal(null);
    searchPanel.props.onItemClick(Immutable.Map({ csid: itemCsid })).should.equal(false);

    replacedLocation.should.equal(`/tool/batch/${itemCsid}`);
  });

  it('should not replace history when an item is clicked in the search panel if the user does not have read permission on batch jobs', () => {
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
      <BatchPage
        history={history}
        match={match}
        perms={null}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const searchPanel = findWithType(result, SearchPanelContainer);

    const itemCsid = 'abcd';

    searchPanel.should.not.equal(null);
    searchPanel.props.onItemClick(Immutable.Map({ csid: itemCsid })).should.equal(false);

    expect(replacedLocation).to.equal(null);
  });

  it('should update the search descriptor when the search bar value is changed', () => {
    const match = {
      params: {},
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BatchPage
        match={match}
        perms={perms}
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

        searchPanel.should.not.equal(null);

        searchPanel.props.searchDescriptor.should.equal(Immutable.fromJS({
          recordType: 'batch',
          searchQuery: {
            as: {
              value: 'searchval',
              op: OP_CONTAIN,
              path: 'ns2:batch_common/name',
            },
            size: 20,
            p: 0,
            sort: 'name',
          },
        }));

        resolve();
      }, 600);
    });
  });

  it('should only update the search descriptor once when the search bar value changes twice within the filter delay', () => {
    const match = {
      params: {},
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BatchPage
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
            recordType: 'batch',
            searchQuery: {
              size: 20,
              sort: 'name',
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
            recordType: 'batch',
            searchQuery: {
              p: 0,
              size: 20,
              sort: 'name',
              as: {
                value: 'another searchval',
                op: OP_CONTAIN,
                path: 'ns2:batch_common/name',

              },
            },
          }));

          resolve();
        }, 400);
      }));
  });

  it('should update the search descriptor immediately when the search bar value is blanked', () => {
    const match = {
      params: {},
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BatchPage
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
          recordType: 'batch',
          searchQuery: {
            as: {
              value: 'searchval',
              op: OP_CONTAIN,
              path: 'ns2:batch_common/name',
            },
            size: 20,
            p: 0,
            sort: 'name',
          },
        }));

        searchBar.props.onChange('');

        result = shallowRenderer.getRenderOutput();
        searchPanel = findWithType(result, SearchPanelContainer);

        searchPanel.props.searchDescriptor.should.equal(Immutable.fromJS({
          recordType: 'batch',
          searchQuery: {
            size: 20,
            p: 0,
            sort: 'name',
          },
        }));

        resolve();
      }, 600);
    });
  });

  it('should call openModal when the run button is clicked in the record editor', () => {
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
      <BatchPage
        match={match}
        openModal={openModal}
        perms={perms}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const recordEditor = findWithType(result, RecordEditorContainer);

    recordEditor.should.not.equal(null);
    recordEditor.props.onRunButtonClick();

    openedModalName.should.equal(MODAL_INVOCATION);
  });

  it('should call invoke and close the modal when the invoke button is clicked in the invocation modal and the selected batch job does not create new focus', () => {
    const csid = '1234';
    const recordType = 'group';

    const match = {
      params: {
        csid,
      },
    };

    let invokeConfig = null;
    let invokeBatchMetadata = null;
    let invokeInvocationDescriptor = null;

    const invoke = (configArg, batchMetadataArg, invocationDescriptorArg, onValidationSuccess) => {
      invokeConfig = configArg;
      invokeBatchMetadata = batchMetadataArg;
      invokeInvocationDescriptor = invocationDescriptorArg;

      onValidationSuccess();

      return Promise.resolve();
    };

    let closeModalCalled;

    const closeModal = () => {
      closeModalCalled = true;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BatchPage
        match={match}
        openModalName={MODAL_INVOCATION}
        invoke={invoke}
        closeModal={closeModal}
      />, context,
    );

    let result;
    let modal;

    result = shallowRenderer.getRenderOutput();
    modal = findWithType(result, InvocationModalContainer);

    const searchPanel = findWithType(result, SearchPanelContainer);

    searchPanel.props.onItemClick();

    const batchMetadata = Immutable.fromJS({
      document: {
        'ns2:collectionspace_core': {
          uri: '/batch/abcd',
        },
      },
    });

    const invocationDescriptor = {
      csid,
      recordType,
    };

    modal.props.onInvokeButtonClick(batchMetadata, invocationDescriptor);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        invokeConfig.should.equal(config);
        invokeBatchMetadata.should.equal(batchMetadata);
        invokeInvocationDescriptor.should.equal(invocationDescriptor);

        result = shallowRenderer.getRenderOutput();
        modal = findWithType(result, InvocationModalContainer);

        closeModalCalled.should.equal(true);

        resolve();
      }, 0);
    });
  });

  it('should call invoke and set isRunning to true when the invoke button is clicked in the invocation modal and the selected batch job creates new focus', () => {
    const csid = '1234';
    const recordType = 'group';

    const match = {
      params: {
        csid,
      },
    };

    const shallowRenderer = createRenderer();

    let invokeConfig = null;
    let invokeBatchMetadata = null;
    let invokeInvocationDescriptor = null;

    const invoke = (configArg, batchMetadataArg, invocationDescriptorArg, onValidationSuccess) => {
      invokeConfig = configArg;
      invokeBatchMetadata = batchMetadataArg;
      invokeInvocationDescriptor = invocationDescriptorArg;

      onValidationSuccess();

      const result = shallowRenderer.getRenderOutput();
      const modal = findWithType(result, InvocationModalContainer);

      modal.props.isOpen.should.equal(true);
      modal.props.isRunning.should.equal(true);

      return Promise.resolve();
    };

    let closeModalCalled;

    const closeModal = () => {
      closeModalCalled = true;
    };

    shallowRenderer.render(
      <BatchPage
        match={match}
        openModalName={MODAL_INVOCATION}
        invoke={invoke}
        closeModal={closeModal}
      />, context,
    );

    let result;
    let modal;

    result = shallowRenderer.getRenderOutput();
    modal = findWithType(result, InvocationModalContainer);

    const searchPanel = findWithType(result, SearchPanelContainer);

    const batchMetadata = Immutable.fromJS({
      document: {
        'ns2:collectionspace_core': {
          uri: '/batch/abcd',
        },
        'ns2:batch_common': {
          createsNewFocus: 'true',
        },
      },
    });

    const invocationDescriptor = {
      csid,
      recordType,
    };

    searchPanel.props.onItemClick();

    modal.props.onInvokeButtonClick(batchMetadata, invocationDescriptor);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        invokeConfig.should.equal(config);
        invokeBatchMetadata.should.equal(batchMetadata);
        invokeInvocationDescriptor.should.equal(invocationDescriptor);

        result = shallowRenderer.getRenderOutput();
        modal = findWithType(result, InvocationModalContainer);

        modal.props.isRunning.should.equal(false);

        closeModalCalled.should.equal(true);

        resolve();
      }, 0);
    });
  });

  it('should close the modal, set isRunning to false, and navigate to the new focus when a batch job that creates new focus completes', () => {
    const csid = '1234';
    const recordType = 'group';

    const match = {
      params: {
        csid,
      },
    };

    const invoke = () => Promise.resolve({
      data: {
        'ns2:invocationResults': {
          primaryURICreated: '/collectionobjects/8888',
        },
      },
    });

    let pushedLocation = null;

    const history = {
      push: (locationArg) => {
        pushedLocation = locationArg;
      },
    };

    let closeModalCalled;

    const closeModal = () => {
      closeModalCalled = true;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BatchPage
        history={history}
        match={match}
        openModalName={MODAL_INVOCATION}
        invoke={invoke}
        closeModal={closeModal}
      />, context,
    );

    let result;
    let modal;

    result = shallowRenderer.getRenderOutput();
    modal = findWithType(result, InvocationModalContainer);

    const searchPanel = findWithType(result, SearchPanelContainer);

    const batchMetadata = Immutable.fromJS({
      document: {
        'ns2:collectionspace_core': {
          uri: '/batch/abcd',
        },
        'ns2:batch_common': {
          createsNewFocus: 'true',
        },
      },
    });

    const invocationDescriptor = {
      csid,
      recordType,
    };

    searchPanel.props.onItemClick();

    modal.props.onInvokeButtonClick(batchMetadata, invocationDescriptor);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        result = shallowRenderer.getRenderOutput();
        modal = findWithType(result, InvocationModalContainer);

        modal.props.isRunning.should.equal(false);

        closeModalCalled.should.equal(true);

        pushedLocation.should.deep.equal({
          pathname: '/record/collectionobject/8888',
        });

        resolve();
      }, 0);
    });
  });

  it('should call closeModal when the close button or the cancel button is clicked in the invocation modal', () => {
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
      <BatchPage
        match={match}
        openModalName={MODAL_INVOCATION}
        closeModal={closeModal}
      />, context,
    );

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
