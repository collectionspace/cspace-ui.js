import React from 'react';
import { render } from 'react-dom';
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
import ConfigProvider from '../../../../src/components/config/ConfigProvider';

chai.should();

const mockStore = configureMockStore();

const store = mockStore({
  searchToSelect: Immutable.Map(),
  prefs: Immutable.Map(),
  search: Immutable.Map(),
  user: Immutable.Map(),
});

describe('InvocationEditor', function suite() {
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
        invocableName: data =>
          data.getIn(['document', 'ns2:reports_common', 'filename']),
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

  const invocationDescriptor = Immutable.Map({
    mode: 'single',
  });

  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render an InvocationDescriptorEditor with the supported modes and record types', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <InvocationEditor
        config={config}
        invocationDescriptor={invocationDescriptor}
        metadata={reportMetadata}
        recordType="report"
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const invocationDescriptorEditor = findWithType(result, InvocationDescriptorEditor);

    invocationDescriptorEditor.should.not.equal(null);

    invocationDescriptorEditor.props.config.should.equal(config);
    invocationDescriptorEditor.props.recordTypes.should.deep.equal(['group', 'collectionobject']);
    invocationDescriptorEditor.props.modes.should.deep.equal(['nocontext', 'list', 'group', 'single']);
  });

  it('should filter out supported modes that are not allowed, if allowedModes is supplied', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <InvocationEditor
        config={config}
        invocationDescriptor={invocationDescriptor}
        metadata={reportMetadata}
        recordType="report"
        allowedModes={['group', 'single']}
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const invocationDescriptorEditor = findWithType(result, InvocationDescriptorEditor);

    invocationDescriptorEditor.props.modes.should.deep.equal(['group', 'single']);
  });

  it('should support an invocable with a single (non-list) forDocTypes', function test() {
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
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const invocationDescriptorEditor = findWithType(result, InvocationDescriptorEditor);

    invocationDescriptorEditor.props.recordTypes.should.deep.equal(['collectionobject']);
  });

  it('should render a RecordFormContainer if the invocable has a record type config', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <InvocationEditor
        config={config}
        invocationDescriptor={invocationDescriptor}
        metadata={reportMetadata}
        paramData={paramData}
        recordType="report"
      />
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
      </IntlProvider>, this.container);

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
      </IntlProvider>, this.container);

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
      </IntlProvider>, this.container);

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
      </IntlProvider>, this.container);

    this.container.textContent.should.contain('Loading');
  });
});
