import React from 'react';
import { render } from 'react-dom';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import Immutable from 'immutable';
import { IntlProvider } from 'react-intl';
import configureMockStore from 'redux-mock-store';
import { Provider as StoreProvider } from 'react-redux';
import InvocationEditor from '../../../../src/components/invocable/InvocationEditor';
import RecordFormContainer from '../../../../src/containers/record/RecordFormContainer';
import createTestContainer from '../../../helpers/createTestContainer';

chai.should();

const mockStore = configureMockStore();

const store = mockStore({});

describe('InvocationEditor', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a RecordFormContainer if the invocable has a record type config', function test() {
    const reportName = 'testReport';

    const reportRecordTypeConfig = {
      [reportName]: {
        fields: {},
      },
    };

    const config = {
      invocables: {
        report: {
          [reportName]: reportRecordTypeConfig,
        },
      },
      recordTypes: {
        report: {
          invocableName: data =>
            data.getIn(['document', 'ns2:reports_common', 'filename']),
        },
      },
    };

    const reportMetadata = Immutable.fromJS({
      document: {
        'ns2:reports_common': {
          filename: reportName,
        },
      },
    });

    const paramData = Immutable.Map();

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <InvocationEditor
        config={config}
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
    const reportName = 'testReport';

    const config = {
      invocables: {},
    };

    const reportMetadata = Immutable.fromJS({
      document: {
        'ns2:reports_common': {
          filename: reportName,
        },
      },
    });

    let createNewRecordCalled = false;

    const createNewRecord = () => {
      createNewRecordCalled = true;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <InvocationEditor
            config={config}
            metadata={reportMetadata}
            recordType="report"
            createNewRecord={createNewRecord}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    createNewRecordCalled.should.equal(true);
  });

  it('should call createNewRecord when metadata changes', function test() {
    const reportName = 'testReport';

    const config = {
      invocables: {},
    };

    const reportMetadata = Immutable.fromJS({
      document: {
        'ns2:reports_common': {
          filename: reportName,
        },
      },
    });

    let createNewRecordCalled = false;

    const createNewRecord = () => {
      createNewRecordCalled = true;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <InvocationEditor
            config={config}
            metadata={reportMetadata}
            recordType="report"
            createNewRecord={createNewRecord}
          />
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
          <InvocationEditor
            config={config}
            metadata={newReportMetadata}
            recordType="report"
            createNewRecord={createNewRecord}
          />
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
