/* global window */

import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import InvocationModalContainer
  from '../../../../src/containers/invocable/InvocationModalContainer';
import SearchPanelContainer from '../../../../src/containers/search/SearchPanelContainer';
import RecordBatchPanel from '../../../../src/components/record/RecordBatchPanel';

const { expect } = chai;

chai.use(chaiImmutable);
chai.should();

const recordData = Immutable.fromJS({
  document: {
    'ns2:collectionspace_core': {
      uri: '/some/uri',
    },
  },
});

const config = {
  listTypes: {
    common: {
      listNodeName: 'ns2:abstract-common-list',
      itemNodeName: 'list-item',
    },
  },
  recordTypes: {
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
    group: {
      name: 'group',
      messages: {
        record: {
          collectionName: {
            id: 'record.group.collectionName',
            defaultMessage: 'Groups',
          },
        },
      },
      serviceConfig: {
        servicePath: 'groups',
        objectName: 'Group',
      },
    },
  },
};

const perms = Immutable.fromJS({
  batch: {
    data: 'CRUDL',
  },
  batchinvocation: {
    data: 'CRUDL',
  },
});

describe('RecordBatchPanel', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a div containing a search panel and an invocation modal', () => {
    const csid = '1234';
    const recordType = 'group';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordBatchPanel
        config={config}
        csid={csid}
        recordData={recordData}
        recordType={recordType}
        perms={perms}
      />,
    );

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal('div');

    const searchPanel = findWithType(result, SearchPanelContainer);

    searchPanel.props.config.should.equal(config);
    searchPanel.props.recordType.should.equal(recordType);

    searchPanel.props.searchDescriptor.should.equal(Immutable.fromJS({
      recordType: 'batch',
      searchQuery: {
        doctype: 'Group',
        mode: ['single', 'group'],
        p: 0,
        size: 5,
      },
    }));

    const modal = findWithType(result, InvocationModalContainer);

    modal.should.not.equal(null);
  });

  it('should render a nothing if list permission on batch does not exist', () => {
    const csid = '1234';
    const recordType = 'group';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordBatchPanel
        config={config}
        csid={csid}
        recordData={recordData}
        recordType={recordType}
      />,
    );

    const result = shallowRenderer.getRenderOutput();

    expect(result).to.equal(null);
  });

  it('should render a nothing if the record has not been saved', () => {
    const csid = '1234';
    const recordType = 'group';

    const unsavedRecordData = Immutable.fromJS({
      document: {
        'ns2:collectionspace_core': {
          // No uri
        },
      },
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordBatchPanel
        config={config}
        csid={csid}
        recordData={unsavedRecordData}
        recordType={recordType}
        perms={perms}
      />,
    );

    const result = shallowRenderer.getRenderOutput();

    expect(result).to.equal(null);
  });

  it('should update the search panel\'s search descriptor when the record type changes', () => {
    const csid = '1234';
    const recordType = 'group';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordBatchPanel
        config={config}
        csid={csid}
        recordData={recordData}
        recordType={recordType}
        perms={perms}
      />,
    );

    let result;
    let searchPanel;

    result = shallowRenderer.getRenderOutput();
    searchPanel = findWithType(result, SearchPanelContainer);

    searchPanel.props.searchDescriptor.should.equal(Immutable.fromJS({
      recordType: 'batch',
      searchQuery: {
        doctype: 'Group',
        mode: ['single', 'group'],
        p: 0,
        size: 5,
      },
    }));

    const newRecordType = 'collectionobject';

    shallowRenderer.render(
      <RecordBatchPanel
        config={config}
        csid={csid}
        recordData={recordData}
        recordType={newRecordType}
        perms={perms}
      />,
    );

    result = shallowRenderer.getRenderOutput();
    searchPanel = findWithType(result, SearchPanelContainer);

    searchPanel.props.searchDescriptor.should.equal(Immutable.fromJS({
      recordType: 'batch',
      searchQuery: {
        doctype: 'CollectionObject',
        mode: 'single',
        p: 0,
        size: 5,
      },
    }));
  });

  it('should close the invocation modal when the cancel button is clicked', () => {
    const csid = '1234';
    const recordType = 'group';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordBatchPanel
        config={config}
        csid={csid}
        recordData={recordData}
        recordType={recordType}
        perms={perms}
      />,
    );

    let result;
    let modal;

    result = shallowRenderer.getRenderOutput();

    const searchPanel = findWithType(result, SearchPanelContainer);
    const selectedBatchCsid = 'abcd';

    searchPanel.props.onItemClick(Immutable.Map({
      csid: selectedBatchCsid,
    }));

    result = shallowRenderer.getRenderOutput();
    modal = findWithType(result, InvocationModalContainer);

    modal.props.isOpen.should.equal(true);

    modal.props.onCancelButtonClick();

    result = shallowRenderer.getRenderOutput();
    modal = findWithType(result, InvocationModalContainer);

    modal.props.isOpen.should.equal(false);
  });

  it('should close the invocation modal when the close button is clicked', () => {
    const csid = '1234';
    const recordType = 'group';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordBatchPanel
        config={config}
        csid={csid}
        recordData={recordData}
        recordType={recordType}
        perms={perms}
      />,
    );

    let result;
    let modal;

    result = shallowRenderer.getRenderOutput();

    const searchPanel = findWithType(result, SearchPanelContainer);
    const selectedBatchCsid = 'abcd';

    searchPanel.props.onItemClick(Immutable.Map({
      csid: selectedBatchCsid,
    }));

    result = shallowRenderer.getRenderOutput();
    modal = findWithType(result, InvocationModalContainer);

    modal.props.isOpen.should.equal(true);

    modal.props.onCloseButtonClick();

    result = shallowRenderer.getRenderOutput();
    modal = findWithType(result, InvocationModalContainer);

    modal.props.isOpen.should.equal(false);
  });

  it('should call invoke and close the modal when the invoke button is clicked in the invocation modal and the selected batch job does not create new focus', () => {
    const csid = '1234';
    const recordType = 'group';

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

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordBatchPanel
        config={config}
        csid={csid}
        recordData={recordData}
        recordType={recordType}
        perms={perms}
        invoke={invoke}
      />,
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

        modal.props.isOpen.should.equal(false);

        resolve();
      }, 0);
    });
  });

  it('should call invoke and set isRunning to true when the invoke button is clicked in the invocation modal and the selected batch job creates new focus', () => {
    const csid = '1234';
    const recordType = 'group';

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

    shallowRenderer.render(
      <RecordBatchPanel
        config={config}
        csid={csid}
        recordData={recordData}
        recordType={recordType}
        perms={perms}
        invoke={invoke}
      />,
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

        modal.props.isOpen.should.equal(false);
        modal.props.isRunning.should.equal(false);

        resolve();
      }, 0);
    });
  });

  it('should close the modal, set isRunning to false, and navigate to the new focus when a batch job that creates new focus completes', () => {
    const csid = '1234';
    const recordType = 'group';

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

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordBatchPanel
        config={config}
        csid={csid}
        history={history}
        recordData={recordData}
        recordType={recordType}
        perms={perms}
        invoke={invoke}
      />,
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

        modal.props.isOpen.should.equal(false);
        modal.props.isRunning.should.equal(false);

        pushedLocation.should.deep.equal({
          pathname: '/record/collectionobject/8888',
        });

        resolve();
      }, 0);
    });
  });

  it('should update the search panel when it changes the search descriptor', () => {
    const csid = '1234';
    const recordType = 'group';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordBatchPanel
        config={config}
        csid={csid}
        recordData={recordData}
        recordType={recordType}
        perms={perms}
      />,
    );

    let result;
    let searchPanel;

    result = shallowRenderer.getRenderOutput();
    searchPanel = findWithType(result, SearchPanelContainer);

    const { searchDescriptor } = searchPanel.props;

    searchDescriptor.should.equal(Immutable.fromJS({
      recordType: 'batch',
      searchQuery: {
        doctype: 'Group',
        mode: ['single', 'group'],
        p: 0,
        size: 5,
      },
    }));

    const newSearchDescriptor = searchDescriptor.setIn(['searchQuery', 'p'], 1);

    searchPanel.props.onSearchDescriptorChange(newSearchDescriptor);

    result = shallowRenderer.getRenderOutput();
    searchPanel = findWithType(result, SearchPanelContainer);

    searchPanel.props.searchDescriptor.should.equal(newSearchDescriptor);
  });
});
