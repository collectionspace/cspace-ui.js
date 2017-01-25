import React from 'react';
import { render } from 'react-dom';
import { findRenderedComponentWithType } from 'react-addons-test-utils';
import configureMockStore from 'redux-mock-store';
import { Provider as StoreProvider } from 'react-redux';
import thunk from 'redux-thunk';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';

import createTestContainer from '../../../helpers/createTestContainer';

import ConfigProvider from '../../../../src/components/config/ConfigProvider';
import RecordButtonBarContainer from '../../../../src/containers/record/RecordButtonBarContainer';
import RecordEditorContainer from '../../../../src/containers/record/RecordEditorContainer';
import RecordTitleBarContainer from '../../../../src/containers/record/RecordTitleBarContainer';
import RecordPage from '../../../../src/components/pages/RecordPage';

chai.should();

const mockStore = configureMockStore([thunk]);
const expectedClassName = 'cspace-ui-RecordPage--common';
const csid = '1234';
const recordType = 'object';
const serviceConfig = {};

const params = {
  csid,
  recordType,
};

const config = {
  listTypes: {
    authRef: {},
  },
  recordTypes: {
    [recordType]: {
      serviceConfig,
      forms: {
        default: <div />,
      },
      messages: {
        record: {
          recordNameTitle: {
            id: `record.${recordType}.nameTitle`,
            defaultMessage: recordType,
          },
        },
      },
      title: () => '',
    },
  },
};

const store = mockStore({
  record: {
    data: {
      [csid]: Immutable.Map(),
    },
    readsPending: {
      [csid]: false,
    },
    savesPending: {
      [csid]: false,
    },
  },
  search: Immutable.Map(),
  prefs: Immutable.Map(),
});

describe('RecordPage', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <RecordPage params={params} />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render with correct class', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <RecordPage params={params} />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.className.should.equal(expectedClassName);
  });

  it('should render a RecordTitleBarContainer with correct csid and recordType', function test() {
    const resultTree = render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <RecordPage params={params} />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    const component = findRenderedComponentWithType(resultTree, RecordTitleBarContainer);

    component.props.should.include({
      csid,
      recordType,
    });
  });

  it('should render a RecordButtonBarContainer with correct csid and recordTypeConfig', function test() {
    const resultTree = render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <RecordPage params={params} />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    const component = findRenderedComponentWithType(resultTree, RecordButtonBarContainer);

    component.props.should.include({
      csid,
      recordTypeConfig: config.recordTypes[recordType],
    });
  });

  it('should render a RecordEditorContainer with correct csid and recordType', function test() {
    const resultTree = render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <RecordPage params={params} />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    const component = findRenderedComponentWithType(resultTree, RecordEditorContainer);

    component.props.should.include({
      csid,
      recordType,
    });
  });

  it('should use empty csid if csid is null', function test() {
    const noCsidParams = {
      recordType: 'object',
    };

    const noCsidStore = mockStore({
      prefs: Immutable.Map(),
      record: {
        data: {
          '': Immutable.Map(),
        },
        readsPending: {
          '': false,
        },
        savesPending: {
          '': false,
        },
      },
      search: Immutable.Map(),
    });

    const resultTree = render(
      <IntlProvider locale="en">
        <StoreProvider store={noCsidStore}>
          <ConfigProvider config={config}>
            <RecordPage params={noCsidParams} />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    const component = findRenderedComponentWithType(resultTree, RecordEditorContainer);

    component.props.should.include({
      csid: '',
    });
  });
});
