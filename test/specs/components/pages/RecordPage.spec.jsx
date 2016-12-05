import React from 'react';
import { render } from 'react-dom';
import { findRenderedComponentWithType } from 'react-addons-test-utils';
import configureMockStore from 'redux-mock-store';
import { Provider as StoreProvider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';

import createTestContainer from '../../../helpers/createTestContainer';

import RecordTypesProvider from '../../../../src/components/record/RecordTypesProvider';
import RecordButtonBarContainer from '../../../../src/containers/record/RecordButtonBarContainer';
import RecordEditorContainer from '../../../../src/containers/record/RecordEditorContainer';
import RecordTitleBarContainer from '../../../../src/containers/record/RecordTitleBarContainer';
import RecordPage from '../../../../src/components/pages/RecordPage';

chai.should();

const mockStore = configureMockStore([]);
const expectedClassName = 'cspace-ui-RecordPage--common';
const csid = '1234';
const recordType = 'object';
const serviceConfig = {};

const params = {
  csid,
  recordType,
};

const recordTypes = {
  [recordType]: {
    serviceConfig,
    forms: {
      default: <div />,
    },
    messageDescriptors: {
      recordNameTitle: {
        id: 'recordNameTitle',
        defaultMessage: recordType,
      },
    },
    title: () => '',
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
});

describe('RecordPage', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordTypesProvider recordTypes={recordTypes}>
            <RecordPage params={params} />
          </RecordTypesProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render with correct class', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordTypesProvider recordTypes={recordTypes}>
            <RecordPage params={params} />
          </RecordTypesProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.className.should.equal(expectedClassName);
  });

  it('should render a RecordTitleBarContainer with correct csid and recordType', function test() {
    const resultTree = render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordTypesProvider recordTypes={recordTypes}>
            <RecordPage params={params} />
          </RecordTypesProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    const component = findRenderedComponentWithType(resultTree, RecordTitleBarContainer);

    component.props.should.include({
      csid,
      recordType,
    });
  });

  it('should render a RecordButtonBarContainer with correct csid, recordType, and serviceConfig', function test() {
    const resultTree = render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordTypesProvider recordTypes={recordTypes}>
            <RecordPage params={params} />
          </RecordTypesProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    const component = findRenderedComponentWithType(resultTree, RecordButtonBarContainer);

    component.props.should.include({
      csid,
      recordType,
      serviceConfig,
    });
  });

  it('should render a RecordEditorContainer with correct csid and recordType', function test() {
    const resultTree = render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordTypesProvider recordTypes={recordTypes}>
            <RecordPage params={params} />
          </RecordTypesProvider>
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
    });

    const resultTree = render(
      <IntlProvider locale="en">
        <StoreProvider store={noCsidStore}>
          <RecordTypesProvider recordTypes={recordTypes}>
            <RecordPage params={noCsidParams} />
          </RecordTypesProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    const component = findRenderedComponentWithType(resultTree, RecordEditorContainer);

    component.props.should.include({
      csid: '',
    });
  });
});
