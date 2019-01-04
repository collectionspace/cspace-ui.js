/* global window */

import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import SearchPanelContainer from '../../../../src/containers/search/SearchPanelContainer';
import RecordBatchPanel from '../../../../src/components/record/RecordBatchPanel';
import BatchModal from '../../../../src/components/invocable/BatchModal';

const expect = chai.expect;

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
});

describe('RecordBatchPanel', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a div containing a search panel and a batch modal', function test() {
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
      />);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal('div');

    const searchPanel = findWithType(result, SearchPanelContainer);

    searchPanel.props.config.should.equal(config);
    searchPanel.props.recordType.should.equal(recordType);

    searchPanel.props.searchDescriptor.should.equal(Immutable.fromJS({
      recordType: 'batch',
      searchQuery: {
        doctype: 'Group',
        p: 0,
        size: 5,
      },
    }));

    const modal = findWithType(result, BatchModal);

    modal.should.not.equal(null);
  });

  it('should render a nothing if list permission on batch does not exist', function test() {
    const csid = '1234';
    const recordType = 'group';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordBatchPanel
        config={config}
        csid={csid}
        recordData={recordData}
        recordType={recordType}
      />);

    const result = shallowRenderer.getRenderOutput();

    expect(result).to.equal(null);
  });

  it('should render a nothing if the record has not been saved', function test() {
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
      />);

    const result = shallowRenderer.getRenderOutput();

    expect(result).to.equal(null);
  });

  it('should update the search panel\'s search descriptor when the record type changes', function test() {
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
      />);

    let result;
    let searchPanel;

    result = shallowRenderer.getRenderOutput();
    searchPanel = findWithType(result, SearchPanelContainer);

    searchPanel.props.searchDescriptor.should.equal(Immutable.fromJS({
      recordType: 'batch',
      searchQuery: {
        doctype: 'Group',
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
      />);

    result = shallowRenderer.getRenderOutput();
    searchPanel = findWithType(result, SearchPanelContainer);

    searchPanel.props.searchDescriptor.should.equal(Immutable.fromJS({
      recordType: 'batch',
      searchQuery: {
        doctype: 'CollectionObject',
        p: 0,
        size: 5,
      },
    }));
  });

  it('should close the batch modal when the cancel button is clicked', function test() {
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
      />);

    let result;
    let modal;

    result = shallowRenderer.getRenderOutput();

    const searchPanel = findWithType(result, SearchPanelContainer);
    const selectedBatchCsid = 'abcd';

    searchPanel.props.onItemClick(Immutable.Map({
      csid: selectedBatchCsid,
    }));

    result = shallowRenderer.getRenderOutput();
    modal = findWithType(result, BatchModal);

    modal.props.isOpen.should.equal(true);

    modal.props.onCancelButtonClick();

    result = shallowRenderer.getRenderOutput();
    modal = findWithType(result, BatchModal);

    modal.props.isOpen.should.equal(false);
  });

  it('should close the batch modal when the close button is clicked', function test() {
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
      />);

    let result;
    let modal;

    result = shallowRenderer.getRenderOutput();

    const searchPanel = findWithType(result, SearchPanelContainer);
    const selectedBatchCsid = 'abcd';

    searchPanel.props.onItemClick(Immutable.Map({
      csid: selectedBatchCsid,
    }));

    result = shallowRenderer.getRenderOutput();
    modal = findWithType(result, BatchModal);

    modal.props.isOpen.should.equal(true);

    modal.props.onCloseButtonClick();

    result = shallowRenderer.getRenderOutput();
    modal = findWithType(result, BatchModal);

    modal.props.isOpen.should.equal(false);
  });

  it('should call run and close the modal when the run button is clicked in the batch modal and the selected batch job does not create new focus', function test() {
    const csid = '1234';
    const recordType = 'group';

    let runConfig = null;
    let runBatchItem = null;
    let runInvocationDescriptor = null;

    const run = (configArg, batchItemArg, invocationDescriptorArg) => {
      runConfig = configArg;
      runBatchItem = batchItemArg;
      runInvocationDescriptor = invocationDescriptorArg;

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
        run={run}
      />);

    let result;
    let modal;

    result = shallowRenderer.getRenderOutput();
    modal = findWithType(result, BatchModal);

    const searchPanel = findWithType(result, SearchPanelContainer);

    const selectedBatchItem = Immutable.Map({
      csid: 'abcd',
    });

    searchPanel.props.onItemClick(selectedBatchItem);

    modal.props.onRunButtonClick();

    runConfig.should.equal(config);
    runBatchItem.should.equal(selectedBatchItem);
    runInvocationDescriptor.should.deep.equal({ csid, recordType });

    result = shallowRenderer.getRenderOutput();
    modal = findWithType(result, BatchModal);

    modal.props.isOpen.should.equal(false);
  });

  it('should call run and set isRunning to true when the run button is clicked in the batch modal and the selected batch job creates new focus', function test() {
    const csid = '1234';
    const recordType = 'group';

    let runConfig = null;
    let runBatchItem = null;
    let runInvocationDescriptor = null;

    const run = (configArg, batchItemArg, invocationDescriptorArg) => {
      runConfig = configArg;
      runBatchItem = batchItemArg;
      runInvocationDescriptor = invocationDescriptorArg;

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
        run={run}
      />);

    let result;
    let modal;

    result = shallowRenderer.getRenderOutput();
    modal = findWithType(result, BatchModal);

    const searchPanel = findWithType(result, SearchPanelContainer);

    const selectedBatchItem = Immutable.Map({
      csid: 'abcd',
      createsNewFocus: 'true',
    });

    searchPanel.props.onItemClick(selectedBatchItem);

    modal.props.onRunButtonClick();

    runConfig.should.equal(config);
    runBatchItem.should.equal(selectedBatchItem);
    runInvocationDescriptor.should.deep.equal({ csid, recordType });

    result = shallowRenderer.getRenderOutput();
    modal = findWithType(result, BatchModal);

    modal.props.isOpen.should.equal(true);
    modal.props.isRunning.should.equal(true);
  });

  it('should close the modal, set isRunning to false, and navigate to the new focus when a batch job that creates new focus completes', function test() {
    const csid = '1234';
    const recordType = 'group';

    const run = () => Promise.resolve({
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
        run={run}
      />);

    let result;
    let modal;

    result = shallowRenderer.getRenderOutput();
    modal = findWithType(result, BatchModal);

    const searchPanel = findWithType(result, SearchPanelContainer);

    const selectedBatchItem = Immutable.Map({
      csid: 'abcd',
      createsNewFocus: 'true',
    });

    searchPanel.props.onItemClick(selectedBatchItem);

    modal.props.onRunButtonClick();

    return new Promise((resolve) => {
      window.setTimeout(() => {
        result = shallowRenderer.getRenderOutput();
        modal = findWithType(result, BatchModal);

        modal.props.isOpen.should.equal(false);
        modal.props.isRunning.should.equal(false);

        pushedLocation.should.deep.equal({
          pathname: '/record/collectionobject/8888',
        });

        resolve();
      }, 0);
    });
  });

  it('should update the search panel when it changes the search descriptor', function test() {
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
      />);

    let result;
    let searchPanel;

    result = shallowRenderer.getRenderOutput();
    searchPanel = findWithType(result, SearchPanelContainer);

    const searchDescriptor = searchPanel.props.searchDescriptor;

    searchDescriptor.should.equal(Immutable.fromJS({
      recordType: 'batch',
      searchQuery: {
        doctype: 'Group',
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
