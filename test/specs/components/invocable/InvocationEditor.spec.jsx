import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import Immutable from 'immutable';
import { IntlProvider } from 'react-intl';
import configureMockStore from 'redux-mock-store';
import { Provider as StoreProvider } from 'react-redux';
import InvocationEditor from '../../../../src/components/invocable/InvocationEditor';
import InvocationDescriptorEditor from '../../../../src/components/invocable/InvocationDescriptorEditor';
import RecordFormContainer from '../../../../src/containers/record/RecordFormContainer';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import ConfigProvider from '../../../../src/components/config/ConfigProvider';

const { expect } = chai;

chai.should();

const mockStore = configureMockStore();

const store = mockStore({
  searchToSelect: Immutable.Map(),
  prefs: Immutable.Map(),
  search: Immutable.Map(),
  user: Immutable.Map(),
});

describe('InvocationEditor', () => {
  const reportName = 'testReport';

  const reportRecordTypeConfig = {
    fields: {},
    forms: {
      default: {
        template: <div />,
      },
    },
  };

  const config = {
    invocables: {
      report: {
        [reportName]: reportRecordTypeConfig,
      },
    },
    recordTypes: {
      collectionobject: {
        name: 'collectionobject',
        serviceConfig: {
          objectName: 'CollectionObject',
        },
      },
      group: {
        name: 'group',
        serviceConfig: {
          objectName: 'Group',
        },
      },
      report: {
        invocableName: (data) => data.getIn(['document', 'ns2:reports_common', 'filename']),
        messages: {
          record: {
            invokeUnsaved: {
              id: 'record.report.invokeUnsaved',
              defaultMessage: 'Record modified!',
            },
            singleTargetMissing: {
              id: 'report.singleTargetMissing',
              defaultMessage: 'Single target missing!',
            },
          },
        },
        serviceConfig: {
          objectName: 'Report',
        },
      },
    },
  };

  const reportMetadata = Immutable.fromJS({
    document: {
      'ns2:reports_common': {
        filename: reportName,
        forDocTypes: {
          forDocType: [
            'Group',
            'CollectionObject',
          ],
        },
        supportsNoContext: 'true',
        supportsDocList: 'true',
        supportsGroup: 'true',
        supportsSingleDoc: 'true',
      },
    },
  });

  const paramData = Immutable.Map();

  const invocationDescriptor = Immutable.fromJS({
    mode: 'single',
    items: {
      1234: {
        csid: '1234',
      },
    },
  });

  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render an InvocationDescriptorEditor with the supported modes and record types', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <InvocationEditor
        config={config}
        invocationDescriptor={invocationDescriptor}
        metadata={reportMetadata}
        recordType="report"
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const invocationDescriptorEditor = findWithType(result, InvocationDescriptorEditor);

    invocationDescriptorEditor.should.not.equal(null);

    invocationDescriptorEditor.props.config.should.equal(config);
    invocationDescriptorEditor.props.recordTypes.should.deep.equal(['group', 'collectionobject']);
    invocationDescriptorEditor.props.modes.should.deep.equal(['nocontext', 'list', 'group', 'single']);
  });

  it('should filter out supported modes that are not allowed, if allowedModes is supplied', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <InvocationEditor
        config={config}
        invocationDescriptor={invocationDescriptor}
        metadata={reportMetadata}
        recordType="report"
        allowedModes={['group', 'single']}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const invocationDescriptorEditor = findWithType(result, InvocationDescriptorEditor);

    invocationDescriptorEditor.props.modes.should.deep.equal(['group', 'single']);
  });

  it('should support an invocable with a single (non-list) forDocTypes', () => {
    const singleForDocTypeReportMetadata = Immutable.fromJS({
      document: {
        'ns2:reports_common': {
          filename: reportName,
          forDocTypes: {
            forDocType: 'CollectionObject',
          },
        },
      },
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <InvocationEditor
        config={config}
        invocationDescriptor={invocationDescriptor}
        metadata={singleForDocTypeReportMetadata}
        recordType="report"
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const invocationDescriptorEditor = findWithType(result, InvocationDescriptorEditor);

    invocationDescriptorEditor.props.recordTypes.should.deep.equal(['collectionobject']);
  });

  it('should render a RecordFormContainer if the invocable has a record type config', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <InvocationEditor
        config={config}
        invocationDescriptor={invocationDescriptor}
        metadata={reportMetadata}
        paramData={paramData}
        recordType="report"
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const recordFormContainer = findWithType(result, RecordFormContainer);

    recordFormContainer.should.not.equal(null);

    recordFormContainer.props.config.should.equal(config);
    recordFormContainer.props.csid.should.equal('');
    recordFormContainer.props.data.should.equal(paramData);
    recordFormContainer.props.recordTypeConfig.should.equal(reportRecordTypeConfig);
    recordFormContainer.props.recordType.should.equal('invocable');
  });

  it('should call createNewRecord when mounted', function test() {
    let createNewRecordCalled = false;

    const createNewRecord = () => {
      createNewRecordCalled = true;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <InvocationEditor
              config={config}
              invocationDescriptor={invocationDescriptor}
              metadata={reportMetadata}
              recordType="report"
              createNewRecord={createNewRecord}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    createNewRecordCalled.should.equal(true);
  });

  it('should call createNewRecord when metadata changes', function test() {
    let createNewRecordCalled = false;

    const createNewRecord = () => {
      createNewRecordCalled = true;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <InvocationEditor
              config={config}
              invocationDescriptor={invocationDescriptor}
              metadata={reportMetadata}
              recordType="report"
              createNewRecord={createNewRecord}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const newReportMetadata = Immutable.fromJS({
      document: {
        'ns2:reports_common': {
          filename: `${reportName}2`,
        },
      },
    });

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <InvocationEditor
              config={config}
              invocationDescriptor={invocationDescriptor}
              metadata={newReportMetadata}
              recordType="report"
              createNewRecord={createNewRecord}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    createNewRecordCalled.should.equal(true);
  });

  it('should render a loading message if no metadata is supplied', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <InvocationEditor
            createNewRecord={() => undefined}
          />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.textContent.should.contain('Loading');
  });

  it('should render an unsaved warning message if isInvocationTargetModified is true', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <InvocationEditor
              config={config}
              invocationDescriptor={invocationDescriptor}
              isInvocationTargetModified
              metadata={reportMetadata}
              recordType="report"
              createNewRecord={() => undefined}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('.cspace-ui-FormStatusMessage--warning').textContent
      .should.equal('Record modified!');
  });

  it('should render an error message if the mode is not nocontext, and the invocation descriptor has no items', function test() {
    const noItemsInvocationDescriptor = invocationDescriptor.delete('items');

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <InvocationEditor
              config={config}
              invocationDescriptor={noItemsInvocationDescriptor}
              isInvocationTargetModified
              metadata={reportMetadata}
              recordType="report"
              createNewRecord={() => undefined}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('.cspace-ui-FormStatusMessage--error').textContent
      .should.equal('Single target missing!');

    this.container.querySelector('.cspace-ui-InvocationDescriptorEditor--common').should.not.equal(null);
  });

  it('should not render an InvocationDescriptorEditor if the mode is not nocontext, and the invocation descriptor has no items, and the mode and target are read-only', function test() {
    const noItemsInvocationDescriptor = invocationDescriptor.delete('items');

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <InvocationEditor
              config={config}
              invocationDescriptor={noItemsInvocationDescriptor}
              isInvocationTargetModified
              metadata={reportMetadata}
              recordType="report"
              createNewRecord={() => undefined}
              modeReadOnly
              invocationTargetReadOnly
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('.cspace-ui-FormStatusMessage--error').textContent
      .should.equal('Single target missing!');

    expect(this.container.querySelector('.cspace-ui-InvocationDescriptorEditor--common')).to.equal(null);
  });
});
