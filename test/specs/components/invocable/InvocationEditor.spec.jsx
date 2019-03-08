import React from 'react';
import { render } from 'react-dom';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import Immutable from 'immutable';
import { FormattedMessage, IntlProvider } from 'react-intl';
import configureMockStore from 'redux-mock-store';
import { Provider as StoreProvider } from 'react-redux';
import InvocationEditor from '../../../../src/components/invocable/InvocationEditor';
import RecordFormContainer from '../../../../src/containers/record/RecordFormContainer';
import createTestContainer from '../../../helpers/createTestContainer';

const expect = chai.expect;

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
          testReport: reportRecordTypeConfig,
        },
      },
    };

    const invocationItem = Immutable.Map({
      filename: `${reportName}.jrxml`,
    });

    const data = Immutable.Map();

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <InvocationEditor
        config={config}
        data={data}
        invocationItem={invocationItem}
        type="report"
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const recordFormContainer = findWithType(result, RecordFormContainer);

    recordFormContainer.should.not.equal(null);

    recordFormContainer.props.config.should.equal(config);
    recordFormContainer.props.csid.should.equal('');
    recordFormContainer.props.data.should.equal(data);
    recordFormContainer.props.recordTypeConfig.should.equal(reportRecordTypeConfig);
    recordFormContainer.props.recordType.should.equal('invocable');
  });

  it('should render a message if the invocable does not have a record type config', function test() {
    const reportName = 'testReport';

    const config = {
      invocables: {},
    };

    const invocationItem = Immutable.Map({
      filename: `${reportName}.jrxml`,
    });

    const messageId = 'message.id';

    const message = {
      id: messageId,
      defaultMessage: 'Hello',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <InvocationEditor
        config={config}
        invocationItem={invocationItem}
        promptMessage={message}
        type="report"
      />
    );

    const result = shallowRenderer.getRenderOutput();

    expect(() => { findWithType(result, RecordFormContainer); }).to.throw();

    const formattedMessage = findWithType(result, FormattedMessage);

    formattedMessage.should.not.equal(null);
    formattedMessage.props.id.should.equal(messageId);
  });

  it('should call createNewRecord when mounted', function test() {
    const reportName = 'testReport';

    const config = {
      invocables: {},
    };

    const invocationItem = Immutable.Map({
      filename: `${reportName}.jrxml`,
    });

    const message = {
      id: 'message.id',
      defaultMessage: 'Hello',
    };

    let createNewRecordCalled = false;

    const createNewRecord = () => {
      createNewRecordCalled = true;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <InvocationEditor
            config={config}
            invocationItem={invocationItem}
            promptMessage={message}
            type="report"
            createNewRecord={createNewRecord}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    createNewRecordCalled.should.equal(true);
  });
});
