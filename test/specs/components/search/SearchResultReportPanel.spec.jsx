/* global window */

import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import InvocationModalContainer from '../../../../src/containers/invocable/InvocationModalContainer';
import SearchPanelContainer from '../../../../src/containers/search/SearchPanelContainer';
import SearchResultReportPanel from '../../../../src/components/search/SearchResultReportPanel';

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

const selectedItems = Immutable.fromJS({
  1234: {
    csid: '1234',
  },
});

describe('SearchResultReportPanel', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a div containing a search panel and an invocation modal', () => {
    const recordType = 'group';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SearchResultReportPanel
        config={config}
        recordData={recordData}
        recordType={recordType}
        selectedItems={selectedItems}
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
        doctype: 'Group',
        mode: 'list',
        p: 0,
        size: 5,
      },
    }));

    const modal = findWithType(result, InvocationModalContainer);

    modal.should.not.equal(null);
  });

  it('should render nothing if list permission on report does not exist', () => {
    const recordType = 'group';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SearchResultReportPanel
        config={config}
        recordData={recordData}
        recordType={recordType}
        selectedItems={selectedItems}
      />,
    );

    const result = shallowRenderer.getRenderOutput();

    expect(result).to.equal(null);
  });

  it('should update the search panel\'s search descriptor when the record type changes', () => {
    const recordType = 'group';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SearchResultReportPanel
        config={config}
        recordData={recordData}
        recordType={recordType}
        selectedItems={selectedItems}
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
        doctype: 'Group',
        mode: 'list',
        p: 0,
        size: 5,
      },
    }));

    const newRecordType = 'collectionobject';

    shallowRenderer.render(
      <SearchResultReportPanel
        config={config}
        recordData={recordData}
        recordType={newRecordType}
        selectedItems={selectedItems}
        perms={perms}
      />,
    );

    result = shallowRenderer.getRenderOutput();
    searchPanel = findWithType(result, SearchPanelContainer);

    searchPanel.props.searchDescriptor.should.equal(Immutable.fromJS({
      recordType: 'report',
      searchQuery: {
        doctype: 'CollectionObject',
        mode: 'list',
        p: 0,
        size: 5,
      },
    }));
  });

  it('should close the invocation modal when the cancel button is clicked', () => {
    const recordType = 'group';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SearchResultReportPanel
        config={config}
        recordData={recordData}
        recordType={recordType}
        selectedItems={selectedItems}
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
    const recordType = 'group';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SearchResultReportPanel
        config={config}
        recordData={recordData}
        recordType={recordType}
        selectedItems={selectedItems}
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
      <SearchResultReportPanel
        config={config}
        recordData={recordData}
        recordType={recordType}
        selectedItems={selectedItems}
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
      recordType,
      items: selectedItems,
      mode: 'list',
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
    const recordType = 'group';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SearchResultReportPanel
        config={config}
        recordData={recordData}
        recordType={recordType}
        selectedItems={selectedItems}
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
        doctype: 'Group',
        mode: 'list',
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

  it('should not be clickable if invocation write permissions are not set', () => {
    const recordType = 'group';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SearchResultReportPanel
        config={config}
        recordData={recordData}
        recordType={recordType}
        selectedItems={selectedItems}
        perms={Immutable.fromJS({
          report: {
            data: 'CRUDL',
          },
          reportinvocation: {
            data: 'L',
          },
        })}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const searchPanel = findWithType(result, SearchPanelContainer);

    expect(searchPanel.props.onItemClick).to.equal(undefined);
  });
});
