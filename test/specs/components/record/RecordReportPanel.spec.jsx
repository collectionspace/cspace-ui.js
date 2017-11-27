/* global window */

import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import SearchPanelContainer from '../../../../src/containers/search/SearchPanelContainer';
import RecordReportPanel from '../../../../src/components/record/RecordReportPanel';
import ReportModal from '../../../../src/components/record/ReportModal';

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

describe('RecordReportPanel', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a div containing a search panel and a report modal', function test() {
    const csid = '1234';
    const recordType = 'group';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordReportPanel
        config={config}
        csid={csid}
        recordData={recordData}
        recordType={recordType}
      />);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal('div');

    const searchPanel = findWithType(result, SearchPanelContainer);

    searchPanel.props.config.should.equal(config);
    searchPanel.props.recordType.should.equal(recordType);

    searchPanel.props.searchDescriptor.should.equal(Immutable.fromJS({
      recordType: 'report',
      searchQuery: {
        doctype: 'Group',
        p: 0,
        size: 5,
      },
    }));

    const modal = findWithType(result, ReportModal);

    modal.should.not.equal(null);
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
      <RecordReportPanel
        config={config}
        csid={csid}
        recordData={unsavedRecordData}
        recordType={recordType}
      />);

    const result = shallowRenderer.getRenderOutput();

    expect(result).to.equal(null);
  });

  it('should update the search panel\'s search descriptor when the record type changes', function test() {
    const csid = '1234';
    const recordType = 'group';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordReportPanel
        config={config}
        csid={csid}
        recordData={recordData}
        recordType={recordType}
      />);

    let result;
    let searchPanel;

    result = shallowRenderer.getRenderOutput();
    searchPanel = findWithType(result, SearchPanelContainer);

    searchPanel.props.searchDescriptor.should.equal(Immutable.fromJS({
      recordType: 'report',
      searchQuery: {
        doctype: 'Group',
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
      />);

    result = shallowRenderer.getRenderOutput();
    searchPanel = findWithType(result, SearchPanelContainer);

    searchPanel.props.searchDescriptor.should.equal(Immutable.fromJS({
      recordType: 'report',
      searchQuery: {
        doctype: 'CollectionObject',
        p: 0,
        size: 5,
      },
    }));
  });

  it('should close the report modal when the cancel button is clicked', function test() {
    const csid = '1234';
    const recordType = 'group';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordReportPanel
        config={config}
        csid={csid}
        recordData={recordData}
        recordType={recordType}
      />);

    let result;
    let modal;

    result = shallowRenderer.getRenderOutput();

    const searchPanel = findWithType(result, SearchPanelContainer);
    const selectedReportCsid = 'abcd';

    searchPanel.props.onItemClick(Immutable.Map({
      csid: selectedReportCsid,
    }));

    result = shallowRenderer.getRenderOutput();
    modal = findWithType(result, ReportModal);

    modal.props.isOpen.should.equal(true);

    modal.props.onCancelButtonClick();

    result = shallowRenderer.getRenderOutput();
    modal = findWithType(result, ReportModal);

    modal.props.isOpen.should.equal(false);
  });

  it('should close the report modal when the close button is clicked', function test() {
    const csid = '1234';
    const recordType = 'group';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordReportPanel
        config={config}
        csid={csid}
        recordData={recordData}
        recordType={recordType}
      />);

    let result;
    let modal;

    result = shallowRenderer.getRenderOutput();

    const searchPanel = findWithType(result, SearchPanelContainer);
    const selectedReportCsid = 'abcd';

    searchPanel.props.onItemClick(Immutable.Map({
      csid: selectedReportCsid,
    }));

    result = shallowRenderer.getRenderOutput();
    modal = findWithType(result, ReportModal);

    modal.props.isOpen.should.equal(true);

    modal.props.onCloseButtonClick();

    result = shallowRenderer.getRenderOutput();
    modal = findWithType(result, ReportModal);

    modal.props.isOpen.should.equal(false);
  });

  it('should open a report viewer window when the run button is clicked in the report modal', function test() {
    const csid = '1234';
    const recordType = 'group';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordReportPanel
        config={config}
        csid={csid}
        recordData={recordData}
        recordType={recordType}
      />);

    const result = shallowRenderer.getRenderOutput();
    const searchPanel = findWithType(result, SearchPanelContainer);
    const modal = findWithType(result, ReportModal);

    const selectedReportCsid = 'abcd';

    searchPanel.props.onItemClick(Immutable.Map({
      csid: selectedReportCsid,
    }));

    const savedOpenFunc = window.open;

    let openedUrl = null;

    window.open = (urlParam) => {
      openedUrl = urlParam;
    };

    modal.props.onRunButtonClick();

    openedUrl.should.equal(`/report/${selectedReportCsid}?csid=${csid}&recordType=${recordType}`);

    window.open = savedOpenFunc;
  });

  it('should update the search panel when it changes the search descriptor', function test() {
    const csid = '1234';
    const recordType = 'group';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordReportPanel
        config={config}
        csid={csid}
        recordData={recordData}
        recordType={recordType}
      />);

    let result;
    let searchPanel;

    result = shallowRenderer.getRenderOutput();
    searchPanel = findWithType(result, SearchPanelContainer);

    const searchDescriptor = searchPanel.props.searchDescriptor;

    searchDescriptor.should.equal(Immutable.fromJS({
      recordType: 'report',
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
