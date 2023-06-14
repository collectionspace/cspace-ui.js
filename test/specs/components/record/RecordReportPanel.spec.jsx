/* global window */

import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import InvocationModalContainer from '../../../../src/containers/invocable/InvocationModalContainer';
import SearchPanelContainer from '../../../../src/containers/search/SearchPanelContainer';
import RecordReportPanel from '../../../../src/components/record/RecordReportPanel';

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
  report: {
    data: 'CRUDL',
  },
  reportinvocation: {
    data: 'CRUDL',
  },
});

describe('RecordReportPanel', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a div containing a search panel and an invocation modal', () => {
    const csid = '1234';
    const recordType = 'group';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordReportPanel
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
      recordType: 'report',
      searchQuery: {
        as: {
          op: 'or',
          value: [
            {
              op: 'eq',
              path: 'ns2:reports_common/supportsGroup',
              value: true,
            },
            {
              op: 'and',
              value: [
                {
                  op: 'eq',
                  path: 'ns2:reports_common/forDocTypes/forDocType',
                  value: 'Group',
                },
                {
                  op: 'eq',
                  path: 'ns2:reports_common/supportsSingleDoc',
                  value: true,
                },
              ],
            },
          ],
        },
        p: 0,
        size: 5,
      },
    }));

    const modal = findWithType(result, InvocationModalContainer);

    modal.should.not.equal(null);
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
      <RecordReportPanel
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

  it('should render nothing if list permission on report does not exist', () => {
    const csid = '1234';
    const recordType = 'group';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordReportPanel
        config={config}
        csid={csid}
        recordData={recordData}
        recordType={recordType}
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
      <RecordReportPanel
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
      recordType: 'report',
      searchQuery: {
        as: {
          op: 'or',
          value: [
            {
              op: 'eq',
              path: 'ns2:reports_common/supportsGroup',
              value: true,
            },
            {
              op: 'and',
              value: [
                {
                  op: 'eq',
                  path: 'ns2:reports_common/forDocTypes/forDocType',
                  value: 'Group',
                },
                {
                  op: 'eq',
                  path: 'ns2:reports_common/supportsSingleDoc',
                  value: true,
                },
              ],
            },
          ],
        },
        p: 0,
        size: 5,
      },
    }));

    const newRecordType = 'collectionobject';

    shallowRenderer.render(
      <RecordReportPanel
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
      recordType: 'report',
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
      <RecordReportPanel
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
    const selectedReportCsid = 'abcd';

    searchPanel.props.onItemClick(Immutable.Map({
      csid: selectedReportCsid,
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
      <RecordReportPanel
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
    const selectedReportCsid = 'abcd';

    searchPanel.props.onItemClick(Immutable.Map({
      csid: selectedReportCsid,
    }));

    result = shallowRenderer.getRenderOutput();
    modal = findWithType(result, InvocationModalContainer);

    modal.props.isOpen.should.equal(true);

    modal.props.onCloseButtonClick();

    result = shallowRenderer.getRenderOutput();
    modal = findWithType(result, InvocationModalContainer);

    modal.props.isOpen.should.equal(false);
  });

  it('should call openReport when the invoke button is clicked in the invocation modal', () => {
    const csid = '1234';
    const recordType = 'group';

    let openedConfig = null;
    let openedReportMetadata = null;
    let openedInvocationDescriptor = null;

    const openReport = (configArg, reportMetadataArg, invocationDescriptorArg) => {
      openedConfig = configArg;
      openedReportMetadata = reportMetadataArg;
      openedInvocationDescriptor = invocationDescriptorArg;

      return Promise.resolve();
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordReportPanel
        config={config}
        csid={csid}
        recordData={recordData}
        recordType={recordType}
        perms={perms}
        openReport={openReport}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const searchPanel = findWithType(result, SearchPanelContainer);
    const modal = findWithType(result, InvocationModalContainer);

    const selectedReportCsid = 'abcd';

    searchPanel.props.onItemClick(Immutable.Map({
      csid: selectedReportCsid,
    }));

    const reportMetadata = Immutable.fromJS({
      document: {
        'ns2:collectionspace_core': {
          uri: `/reports/${selectedReportCsid}`,
        },
      },
    });

    const invocationDescriptor = {
      csid,
      recordType,
      mode: 'single',
    };

    modal.props.onInvokeButtonClick(reportMetadata, invocationDescriptor);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        openedConfig.should.equal(config);
        openedReportMetadata.should.equal(reportMetadata);
        openedInvocationDescriptor.should.equal(invocationDescriptor);

        resolve();
      }, 0);
    });
  });

  it('should update the search panel when it changes the search descriptor', () => {
    const csid = '1234';
    const recordType = 'group';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordReportPanel
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
      recordType: 'report',
      searchQuery: {
        as: {
          op: 'or',
          value: [
            {
              op: 'eq',
              path: 'ns2:reports_common/supportsGroup',
              value: true,
            },
            {
              op: 'and',
              value: [
                {
                  op: 'eq',
                  path: 'ns2:reports_common/forDocTypes/forDocType',
                  value: 'Group',
                },
                {
                  op: 'eq',
                  path: 'ns2:reports_common/supportsSingleDoc',
                  value: true,
                },
              ],
            },
          ],
        },
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

  it('should allow group mode invocation when the record type is group', () => {
    const csid = '1234';
    const recordType = 'group';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordReportPanel
        config={config}
        csid={csid}
        recordData={recordData}
        recordType={recordType}
        perms={perms}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const invocationModal = findWithType(result, InvocationModalContainer);
    const getAllowedModes = invocationModal.props.allowedModes;
    const modes = getAllowedModes();

    modes.should.deep.equal(['group']);
  });

  it('should allow group and single mode invocation when the record type is group and the report is registered for doctype group', () => {
    const csid = '1234';
    const recordType = 'group';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordReportPanel
        config={config}
        csid={csid}
        recordData={recordData}
        recordType={recordType}
        perms={perms}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const invocationModal = findWithType(result, InvocationModalContainer);
    const getAllowedModes = invocationModal.props.allowedModes;
    const modes = getAllowedModes(['group']);

    modes.should.deep.equal(['group', 'single']);
  });
});
